import type * as declarations from "./declarations.d.ts"
import type { MetaschemaVersion } from "./metaschemas"

/**
 * Forces object `O` to list all values of K as keys with value V.
 */
type ForEach<K extends string|number|symbol, V, O extends Record<K, V> = Record<K, V>> = O

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

/**
 * Simple types per schema.
 */
type SimpleTypesPerMetaschema = ForEach<MetaschemaVersion, string, {

  "2020-12": typeof declarations.JSON_SCHEMA_ORG_DRAFT_2020_12_META_VALIDATION.$defs.simpleTypes.enum[number]
  "2019-09": typeof declarations.JSON_SCHEMA_ORG_DRAFT_2019_09_META_VALIDATION.$defs.simpleTypes.enum[number]
  "draft-07": typeof declarations.JSON_SCHEMA_ORG_DRAFT_07_SCHEMA.definitions.simpleTypes.enum[number]
  "draft-06": typeof declarations.JSON_SCHEMA_ORG_DRAFT_06_SCHEMA.definitions.simpleTypes.enum[number]
  "draft-04": typeof declarations.JSON_SCHEMA_ORG_DRAFT_04_SCHEMA.definitions.simpleTypes.enum[number]
  "draft-03": SimpleTypesLegacy,
  "draft-02": SimpleTypesLegacy,
  "draft-01": SimpleTypesLegacy,
  "draft-00": SimpleTypesLegacy,

}>

/**
 * Retrieves all metaschema's simple types.
 */
export type SimpleTypes<V extends MetaschemaVersion> = SimpleTypesPerMetaschema[V]
