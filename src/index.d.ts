/**
 * Retrieve JSON Schema metaschema by version or ID.
 */
export type Metaschema<VersionOrId extends MetaschemaVersion | MetaschemaId> = VersionOrId extends MetaschemaVersion ? MetaschemaByVersion<VersionOrId> : MetaschemaByID<VersionOrId>

/**
 * Retrieves all metaschema's simple types.
 */
export type SimpleTypes<V extends MetaschemaVersion> = SimpleTypesPerMetaschema[V]

/**
 * Lists all the JSON schema keywords for a given version.
 */
/*
  NOTE:
  The implementation defers execusion of type checking,
  so that TS does not unfolds all dereferenced types at once
  (and throw ts2589 error).
*/
export type Keywords<Version extends MetaschemaVersion, M extends MinimalJsonSchema = MetaschemaByVersion<Version>> = M extends unknown ? Deref<M> extends infer D extends JsonObject ? keyof AllOf<D>['properties'] : never : never

// export declare const x: Keywords<"draft-00">
// export declare const y: SimpleTypes<"draft-00">
