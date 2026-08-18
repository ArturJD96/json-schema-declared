/**
 * Names of all (covered) JSON Schema metaschemas.
 */
type MetaschemaVersion = keyof typeof import("../build/metaschemas.json").schemas

/**
 * All JSON Schema metaschemas exported declarations.
 */
type METASCHEMA_DECLARATIONS = typeof import("../lib/declarations")

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
 */
type MetaschemaByID<ID extends string> = Extract<Metaschemas, { "$id": ID } | { "id": ID }>

/**
 * Retrieve a JSON Schema metaschema from declarations using metaschema's identifier (name).
 */
type MetaschemaByVersion<V extends MetaschemaVersion> = MetaschemaByID<`${string}/${V}/schema#` | `${string}/draft/${V}/schema`>

/**
 * Retrieve schema's ID.
 */
type Id<S extends MinimalJsonSchema> = S extends {"$id": infer ID } ? ID : S extends {"id": infer ID} ? ID : never

/**
 * Utility type for distinguishing schemas vs. ordinary JSON objects.
 */
type MinimalJsonSchema = JsonObject & { "$schema": MetaschemaId }
