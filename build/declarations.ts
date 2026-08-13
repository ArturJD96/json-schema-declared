import { appendFileSync, readdirSync, readFileSync, statSync } from "fs"
import { DECLARATIONS_FILE, SCHEMAS_DIR } from "./utils"
import { join } from "path"

const schemaDirs = readdirSync(SCHEMAS_DIR) as MetaschemaVersion[]

function forEachSchemaFileAt(dir: string, cb: (schema:string) => void) {

  const stat = statSync(dir)

  if (stat.isFile()) {
    const text = readFileSync(dir, 'utf-8')
    return cb(text)
  }

  if (stat.isDirectory())  {
    for (const sub of readdirSync(dir)) {
      const subdir = join(dir, sub)
      forEachSchemaFileAt(subdir, cb);
    }
  }

}

function schema2var(schema: string): string {

  const id = schema.match(/"\$?id":\s*"([^"]+)\#?"/)?.[1]

  if (!id) throw Error(`Found no schema of id:\n\t${id}`)

  /**
   * An official Regexp for URI analysis.
   * See: https://www.rfc-editor.org/info/rfc3986/#appendix-B
   *
   * The URI segments of interest are:
   * * scheme    = $2
   * * authority = $4
   * * path      = $5
   * * query     = $7
   * * fragment  = $9
   *
   * _Note: copy-pasted from RFC 3986 docs._
   */
  const uriRegexp = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
  const path = id.match(uriRegexp)?.[5]

  if (!path) throw Error(`Bad URI path:\n\t${id}`)

  return `METASCHEMA${path.toUpperCase().replaceAll(/[^A-Z0-9$]+/g, '_')}`

}

function MAIN() {

  const lessQuotes = (str: string) => str.replaceAll(/\"(\w+)\":/g, "$1:")

  for (const schemaName of schemaDirs) {

    const dir = join(SCHEMAS_DIR, schemaName)
    forEachSchemaFileAt(dir, (schema: string) => {
      const varName = schema2var(schema)
      const decl = `export const ${varName} = ${lessQuotes(schema)} as const satisfies Json;\n\n`
      appendFileSync(DECLARATIONS_FILE, decl, "utf-8")
    })

  }

  console.log("📝 Created schema files dependencies.\n")


}

MAIN()
