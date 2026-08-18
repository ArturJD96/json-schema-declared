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
