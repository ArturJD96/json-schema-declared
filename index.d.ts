/**
 * This file serves as an entry point to the library
 * of JSON Schema metaschema-derived types.
 *
 * We do not import declarations directly, but rather
 * interface with them using our custom types.
 */

import type { MetaschemaVersion, MetaschemaByID, MetaschemaByVersion } from "./src/metaschemas";
import type { SimpleTypes } from "./src/simple-types";
import type { Keywords } from "./src/keywords";
