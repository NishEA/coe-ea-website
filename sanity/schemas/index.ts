/**
 * Sanity schema types — design-doc §9 + the `impactMetrics` singleton (§17).
 *
 * Singleton enforcement (only one `impactMetrics` document) is layered on
 * later in the Studio structure config. For the scaffold, defining the type
 * is sufficient — editors will see it as a single entry in the structure.
 */
import { startup } from "./startup";
import { partner } from "./partner";
import { pillar } from "./pillar";
import { event } from "./event";
import { news } from "./news";
import { team } from "./team";
import { page } from "./page";
import { impactMetrics } from "./impactMetrics";

export const schemaTypes = [
  startup,
  partner,
  pillar,
  event,
  news,
  team,
  page,
  impactMetrics,
];
