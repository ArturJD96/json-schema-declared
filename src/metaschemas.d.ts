import type * as declarations from "./declarations"
import type * as declarationsRaw from "./declarations-raw"
import type metaschemas from "../build/metaschemas.json"

/**
 * Extract from union. Given the key `K` exists in object `O`, extract it's type.
 */
type ExtractKey<O extends object, K extends string> = Extract<O, { [key in K]: string }>[K]

/**
 * Names of all (covered) JSON Schema metaschemas.
 */
export type MetaschemaVersion = keyof typeof metaschemas.schemas

/**
 * All JSON Schema metaschemas exported declarations.
 */
type METASCHEMA_DECLARATIONS = typeof declarations

/**
 * All JSON Schema raw metaschemas exported declarations.
 */
type METASCHEMA_DECLARATIONS_RAW = typeof declarationsRaw

/**
 * All available JSON Schema metaschemas.
 */
type Metaschemas = METASCHEMA_DECLARATIONS[keyof METASCHEMA_DECLARATIONS]

/**
 * All available JSON Schema raw metaschemas.
 */
type MetaschemasRaw = METASCHEMA_DECLARATIONS_RAW[keyof METASCHEMA_DECLARATIONS_RAW]


/**
 * All available JSON Schema metaschemas IDs.
 */
export type MetaschemaId = (ExtractKey<Metaschemas, "id"> | ExtractKey<Metaschemas, "$id">) //& (`${string}/schema` | `${string}/schema#`)

/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's ID.
 * @example MetaschemaByID<"https://json-schema.org/draft/2020-12/schema">
 */
export type MetaschemaByID<
  ID extends MetaschemaId,
  Raw extends boolean = false
> = Extract<Raw extends true ? MetaschemasRaw : Metaschemas, { "$id": ID } | { "id": ID }>

/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's identifier (name).
 * @example MetaschemaByVersion<"draft-00">
 * @example MetaschemaByVersion<"2020-12">
 */
export type MetaschemaByVersion<
  V extends MetaschemaVersion,
  Raw extends boolean = false
> = MetaschemaByID<`${string}/${V}/schema#` | `${string}/draft/${V}/schema`, Raw>

/**
 * Retrieve a JSON Schema by it's version or ID.
 * You can set the additional `Raw` parameter to `true` to retrieve a raw (i.e. not dereferenced) metaschema.
 * @example Metaschema<"2020-12">
 * @example Metaschema<"https://json-schema.org/draft/2020-12/schema">
 * @example Metaschema<"2020-12", true>['allOf'][0]["$ref"] -> "meta/core"
 */
export type Metaschema<
  T extends MetaschemaVersion | MetaschemaId,
  Raw extends boolean = false
> = T extends MetaschemaVersion ? MetaschemaByVersion<T, Raw> : MetaschemaByID<T, Raw>
