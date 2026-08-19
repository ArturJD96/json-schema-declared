/**
 * This file serves as an entry point to the library
 * of JSON Schema metaschema-derived types.
 *
 * We do not import declarations directly, but rather
 * interface with them using our custom types.
 */

export type { Metaschema, MetaschemaVersion, MetaschemaId, MetaschemaByVersion, MetaschemaByID } from "./src/metaschemas";
export type { SimpleTypes } from "./src/simple-types";
export type { Keywords } from "./src/keywords";
export type { KeysOfUnion } from "./src/utilities"
