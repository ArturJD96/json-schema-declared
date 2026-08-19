import { appendFileSync, readdirSync, readFileSync, statSync } from "fs"
import { DECLARATIONS_FILE, SCHEMAS_DIR } from "./utils"
import { join } from "path"
import type { MetaschemaVersion } from "../src/metaschemas"


/**
 * Traverse a directory and call callback on every file encountered.
 * @param dir directory to traverse.
 * @param cb callback function to find.
 */
function traverse(dir: string, cb: (schema:string) => void) {

  const stat = statSync(dir)

  if (stat.isFile()) {
    const text = readFileSync(dir, 'utf-8')
    return cb(text)
  }

  if (stat.isDirectory())  {
    for (const sub of readdirSync(dir)) {
      const subdir = join(dir, sub)
      traverse(subdir, cb);
    }
  }

}


/**
 * Express URI string as object.
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
class URI {

  /**
  * An official Regexp for URI analysis.
  * See: https://www.rfc-editor.org/info/rfc3986/#appendix-B
  */
  static regexp = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/

  public uri: string
  public scheme?: string
  public authority?: string
  public path?: string
  public query?: string
  public fragment?: string

  constructor(uri: string) {
    const match = uri.match(URI.regexp)
    this.uri = uri;
    this.scheme = match?.[2]
    this.authority = match?.[4]
    this.path = match?.[5]
    this.query = match?.[7]
    this.fragment = match?.[9]
  }

}


/**
 * Find 'id' field of a schema from it's string.
 * @param schema expressed as a string.
 * @returns
 */
function getID(schema: string): string {

  const id = schema.match(/\$?id:\s*"([^"]+)\#?"/)?.[1]
  if (!id) throw Error(`Found no schema of id:\n\t${id}`)
  return id

}

/**
 * Find '$schema' field of a schema from it's string.
 * @param schema expressed as a string.
 * @returns
 */
function getMetaschema(schema: string): string {

  const id = schema.match(/\$schema:\s*"([^"]+)\#?"/)?.[1]
  if (!id) throw Error(`Found no schema of id:\n\t${id}`)
  return id

}


/**
 * Turn schema's ID into a declaration definition
 * @param id
 * @returns
 * @example "http://json-schema.org/draft-00/schema#" => JSON_SCHEMA_ORG_DRAFT_00_SCHEMA
 */
function id2var(id: URI | string): string {
  const str = typeof id === 'string' ? id : `${id.authority}${id.path}`
  return str.toUpperCase().replaceAll(/[^A-Z0-9$]+/g, '_')
}


/**
 * Replace the path's head with the provided one.
 */
function changePath(path: string, headNew: string): string {
  return path?.split('/').slice(0, -1).concat([headNew]).join('/') ?? headNew
}

/**
 * Turn all references of a schema into Typescript references.
 * @param schema
 * @returns
 * @example {"$ref":"#"} => typeof JSON_SCHEMA_ORG_DRAFT_XXX
 */
function resolveRefs(schema: string): string {

  const id = new URI(getID(schema))

  /**
   * Turns an URI Json Pointer reference to a const type reference.
   */
  const uri2const = (_:string, jsonPointer:string) => {

    const uri = new URI(jsonPointer)
    const fragment = uri.fragment?.replaceAll(/\/([^\/]+)/g, "['$1']").replaceAll(/\['([^0-9]\$?\w+)'\]/g, ".$1") ?? ""
    const file = id2var(uri.scheme ? uri : uri.path ? `${id.authority}${changePath(id.path!, uri.path)}` : id)
    return `typeof ${file}${fragment}`

  }

  //  !!! WORKAROUND !!!
  //  TO DO: Resolve dynamic anchors BETTER.
  //  This is just a case-specific work-around.
  //  Source: https://www.learnjsonschema.com/2020-12/core/dynamicref/, see: 'meta'.
  const metaschema = getMetaschema(schema)
  console.log(id.uri, metaschema)
  if (id.uri !== metaschema) {
    schema = schema.replaceAll(/\$dynamicRef:\s*"#meta([^"]*)"/g, `$ref:"${metaschema}#$1"`)
  }

  return schema.replaceAll(/{\$ref:\s*"([^"]*)"}/g, uri2const).replaceAll(/{\$recursiveRef:\s*"([^"]*)"}/g, uri2const)//.replaceAll(/\$dynamicRef:\s*"([^"]*)"/g, uri2const)

}


/**
 * Append schema declaration to `declarations.ts` file.
 * @param schema
 */
function declareSchema(schema: string) {

  /* Remove quotes at key */
  schema = schema.replaceAll(/\"(\$?\w+)\":/g, "$1:")

  const id = new URI(getID(schema))
  const varName = id2var(id)
  const decl = `export declare const ${varName}: ${resolveRefs(schema)};\n\n`
  appendFileSync(DECLARATIONS_FILE, decl, "utf-8")

}


export function createDeclarationFiles() {

  const schemaDirs = readdirSync(SCHEMAS_DIR) as MetaschemaVersion[]

  for (const schemaName of schemaDirs) {

    const dir = join(SCHEMAS_DIR, schemaName)
    traverse(dir, declareSchema)

  }

  console.log("📝 Created schema files dependencies.\n")

}
