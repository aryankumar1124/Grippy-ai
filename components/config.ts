/**
 * 3D model source.
 * false (default): use B's real buildModel from lib/cad as soon as lib/cad/index.ts exists,
 *                  and fall back to the mock until then. No manual switch needed at merge.
 * true:            always use the mock box model (handy if lib/cad breaks during the demo).
 */
export const USE_MOCK = false;

/** PLA cost per gram in USD (documented by D in docs/PRINTING_COSTS.md). */
export const DEFAULT_PLA_USD_PER_GRAM = 0.02;

/** Retail fallback when data/prices.json is not in yet. */
export const DEFAULT_RETAIL_USD = 25;
