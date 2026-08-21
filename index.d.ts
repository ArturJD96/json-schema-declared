/**
 * This file serves as an entry point to the library
 * of JSON Schema metaschema-derived types.
 *
 * We do not import declarations directly, but rather
 * interface with them using our custom types.
 */

export type {

  /* Metaschema query */
  Metaschema,
  MetaschemaRaw,
  MetaschemaByVersion,
  MetaschemaByID,

  /* Metaschema identifiers */
  MetaschemaVersion,
  MetaschemaId,
  AllMetaschemaId,
  MetaschemaIdentifier,

  /* Identifier conversions. */
  Id2Version,
  Version2Id

} from "./src/metaschemas";

export type { SimpleTypes } from "./src/simple-types";
export type { Keywords } from "./src/keywords";
export type { KeysOfUnion } from "./src/utilities"
export type { JsonSchema } from "./src/jsonschemas"
