import type { Keywords } from "./keywords";
import type { MetaschemaId, MetaschemaVersion, Version2Id } from "./metaschemas";

export type JsonSchema<
  VorID extends MetaschemaVersion | MetaschemaId,
  ID extends MetaschemaId = VorID extends MetaschemaVersion ? Version2Id<VorID> : VorID extends MetaschemaId ? VorID : never
  > = {
    [K in Keywords<ID>]?: any; // Elaborate at some point.
  } & {
    $schema: ID
  }
