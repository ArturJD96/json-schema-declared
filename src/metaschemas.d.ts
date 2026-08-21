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
 * All available JSON Schema metaschemas IDs (including their dependencies).
 */
export type AllMetaschemaId = (ExtractKey<Metaschemas, "id"> | ExtractKey<Metaschemas, "$id">) //& (`${string}/schema` | `${string}/schema#`)


/**
 * All available JSON Schema metaschemas IDs (without their dependencies).
 */
export type MetaschemaId = AllMetaschemaId & `${string}/schema${'#'|''}`


/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's ID.
 *
 * _Note:_ this type CAN access metaschema dependent schemas. To avoid it, use `Metaschema<Id2Version<ID>>`.
 * @example MetaschemaByID<"https://json-schema.org/draft/2020-12/schema">
 */
export type MetaschemaByID<
  ID extends AllMetaschemaId,
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
  T extends MetaschemaVersion | AllMetaschemaId,
  Raw extends boolean = false
> = T extends MetaschemaVersion ? MetaschemaByVersion<T, Raw> : MetaschemaByID<T, Raw>

/**
 * Convert JSON Schema metaschema `$id` value to version identifier.
 *
 * _Note_: this type returns `never` on metaschema's dependent schemas. To access those schemas, use `MetaschemaByID<Id>`.
 * @example Id2Version<"https://json-schema.org/draft/2020-12/schema"> -> "2020-12"
 * @example Id2Version<"http://json-schema.org/draft-04/schema#"> -> "draft-04"
 */
type Id2Version<
  Id extends MetaschemaId,
  I = Id extends `${string}.org/${infer D}/schema${'#' | ''}` ? D : never,
  V = I extends `draft/${infer V}` ? V : I
> = V extends MetaschemaVersion ? V : never
