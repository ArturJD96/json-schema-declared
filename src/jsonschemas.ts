import type { Keywords } from "./keywords";
import type { MetaschemaId, MetaschemaIdentifier, MetaschemaVersion, Version2Id } from "./metaschemas";

export type JsonSchema<
  I extends MetaschemaIdentifier,
  ID extends MetaschemaId = I extends MetaschemaVersion ? Version2Id<I> : I extends MetaschemaId ? I : never
  > = {
    [K in Keywords<ID>]?: any; // Elaborate at some point.
  } & {
    $schema: ID
  }
