import type * as declarations from "./declarations"
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
 * All available JSON Schema metaschemas.
 */
type Metaschemas = METASCHEMA_DECLARATIONS[keyof METASCHEMA_DECLARATIONS]

/**
 * All available JSON Schema metaschemas IDs.
 */
type MetaschemaId = (ExtractKey<Metaschemas, "id"> | ExtractKey<Metaschemas, "$id">) //& (`${string}/schema` | `${string}/schema#`)

/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's ID.
 * @example MetaschemaByID<"https://json-schema.org/draft/2020-12/schema">
 */
export type MetaschemaByID<ID extends MetaschemaId> = Extract<Metaschemas, { "$id": ID } | { "id": ID }>

/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's identifier (name).
 * @example MetaschemaByVersion<"draft-00">
 * @example MetaschemaByVersion<"2020-12">
 */
export type MetaschemaByVersion<V extends MetaschemaVersion> = MetaschemaByID<`${string}/${V}/schema#` | `${string}/draft/${V}/schema`>
