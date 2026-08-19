/*
  This script downloads the JSON Schema metaschemas and their dependencies.
*/

import { mkdirSync, writeFileSync } from "fs"
import { join } from "path"

import { METASCHEMAS_DATABASE, SCHEMAS_DIR, abort } from "./utils"

const metaschemas = METASCHEMAS_DATABASE.schemas
const schemas = Object.keys(metaschemas) as (keyof typeof metaschemas)[]

const SCHEMA_IDS: string[] = []

async function downloadSchema(name: typeof schemas[number], dir = join(SCHEMAS_DIR, name), link: string = metaschemas[name], fn?: string): Promise<string> {

  const schema = await fetch(link)
  /*
    We verify first if the link contains a valid json
    (because, on invalid url, json-schema.org posts anyway some html garbage).
  */
  try {

    const indent = undefined
    const json = await schema.json()
    const text = JSON.stringify(json, null, indent)

    SCHEMA_IDS.push(json.$id ?? json.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(fn ?? `${dir}/schema.json`, text)
    /*
      We need to find other files referenced by the metaschema file.
      We first look for all the references that do not start with '#'.
      If '#' appears inside, we look if the ref string before '#/' already exits.

      // TO DO: align with RFC 3986 URI resolution rules.
      // TO DO: align with updated code from `./declarations.ts`.
    */
    const ref = /"\$ref":\s*"([^#][^"]+)"/g
    const externalRefs = [...text.matchAll(ref)].map(m => m[1])
    /*
      Also, we need to see if metaschema's $schema is itself.
      If not, download it.
    */
    if (json['$schema'] !== (json['$id'] ?? json['id'])) {
      externalRefs.push(json['$schema'])
    }

    const uniqueExternalDirs = new Set(externalRefs.filter((ref: string) => {
      const [beforeHash] = ref.split('#/')
      return ref === beforeHash || !externalRefs.includes(beforeHash)
    }))

    for (let ref of uniqueExternalDirs) {

      const link = ref.startsWith('http')

      const dirRef = join(SCHEMAS_DIR, name, link ? ref.split('/').at(-1)!.replace('#', '') : ref);
      const dirRFC = dirRef.split('/').slice(0, -1).join('/')

      const linkRef = metaschemas[name];
      const pathUriRFC = linkRef.split('/').slice(0, -1).join('/')
      const pathFileRFC = link ? ref : join(pathUriRFC, ref)

      if (SCHEMA_IDS.includes(pathFileRFC)) continue

      await downloadSchema(name, dirRFC, pathFileRFC, `${dirRef}.json`)

    }

    return text

  } catch (e) {
    throw new Error(`Cannot fetch metaschema '${name}' from:\n\t${link}\n\n${e}`)
  }
}


/**
 * Download all metaschemas mentioned in `metaschemas.json`.
 */
export async function downloadMetaschemas() {

  mkdirSync(SCHEMAS_DIR)

  console.log('📥 Downloading JSON schema metaschemas...\n')

  await Promise.all(schemas.map(name => downloadSchema(name)))
    .then(() => {
      console.log('📜 Successfully downloaded all JSON schema metaschemas\n   (as listed in ./metaschemas.json file).\n')
    })
    .catch(abort)

}
