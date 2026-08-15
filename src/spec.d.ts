/**
 * Simple types as defined in JSON schema specification docs of draft-03 and below.
 * (Since draft-04 they are part of the metaschema).
 *
 * Sources:
 * * draft-03: https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf, section 5.1, under "Simple Types"
 * * draft-02: https://json-schema.org/draft-02/draft-zyp-json-schema-02.txt, section 5.1, under "Simple type definition"
 * * draft-01: https://json-schema.org/draft-01/draft-zyp-json-schema-01, section 5.1, under "Simple type definition"
 * * draft-00: https://json-schema.org/draft-00/draft-zyp-json-schema-00.txt, section 5.1, under "Simple type definition"
 */
type SimpleTypesLegacy =  "string" | "number" | "integer" | "boolean" | "object" | "array" | "null" | "any"

type SimpleTypeRec<V extends MetaschemaVersion, URI extends string, ST = Refer<MetaschemaByVersion<V>, URI >> = { [K in V]: ST extends unknown[] ? ST[number] : never}

type SimpleTypesPerMetaschema = ForEach<MetaschemaVersion, string | null,
  & SimpleTypeRec<"2019-09"|"2020-12", "meta/validation#/$defs/simpleTypes/enum">
  & SimpleTypeRec<`draft-0${4|6|7}`, "#/definitions/simpleTypes/enum">
  & { [K in `draft-0${0|1|2|3}`]: SimpleTypesLegacy }
>

/**
 * Retrieves all metaschema's simple types.
 */
type SimpleTypes<V extends MetaschemaVersion> = SimpleTypesPerMetaschema[V]

/**
 * Lists all the JSON schema keywords for a given version.
 */
/*
  NOTE:
  The implementation defers execusion of type checking,
  so that TS does not unfolds all dereferenced types at once
  (and throw ts2589 error).
*/
type Keywords<Version extends MetaschemaVersion, M extends MinimalJsonSchema = MetaschemaByVersion<Version>> = M extends unknown ? Deref<M> extends infer D extends JsonObject ? keyof AllOf<D>['properties'] : never : never
