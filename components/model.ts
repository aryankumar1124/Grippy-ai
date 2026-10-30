import type { AidSpec, MeshData } from "@/lib/types";
import { USE_MOCK, DEFAULT_PLA_USD_PER_GRAM, DEFAULT_RETAIL_USD } from "./config";
import { mockBuildModel } from "./mocks";

type BuildResult = { mesh: MeshData; stl: Blob };
type BuildFn = (spec: AidSpec) => BuildResult | Promise<BuildResult>;

/**
 * Picks up teammates' files automatically when they land, without breaking the build before they do.
 * lib/cad and data already exist (they hold .gitkeep), so these contexts are just empty until B and D push.
 */
type Ctx = { keys(): string[]; (id: string): Record<string, unknown> };
// Webpack only rewrites the literal `require.context(...)` call, so it can't be aliased.
const cadCtx: Ctx = (require as unknown as { context: (d: string, s: boolean, r: RegExp) => Ctx }).context(
  "../lib/cad", false, /^\.\/index\.(ts|tsx|js)$/);
const dataCtx: Ctx = (require as unknown as { context: (d: string, s: boolean, r: RegExp) => Ctx }).context(
  "../data", false, /^\.\/prices\.json$/);

const realBuild: BuildFn | null = (() => {
  const key = cadCtx.keys()[0];
  if (!key) return null;
  const mod = cadCtx(key);
  return typeof mod.buildModel === "function" ? (mod.buildModel as BuildFn) : null;
})();

export const usingMockModel = USE_MOCK || !realBuild;

export async function buildModel(spec: AidSpec): Promise<BuildResult> {
  if (!usingMockModel && realBuild) {
    try {
      return await realBuild(spec);
    } catch (err) {
      console.error("[ui] lib/cad buildModel failed, showing mock:", err);
    }
  }
  return mockBuildModel(spec);
}

type PriceEntry = { retailUSD: number; source_url?: string };
const prices: Record<string, PriceEntry | number> = (() => {
  const key = dataCtx.keys()[0];
  if (!key) return {};
  const mod = dataCtx(key);
  return (mod.default ?? mod) as Record<string, PriceEntry | number>;
})();

export function getRetail(aidType: string): { usd: number; sourceUrl?: string } {
  const entry = prices[aidType];
  if (entry && typeof entry === "object" && Number.isFinite(entry.retailUSD)) {
    return { usd: entry.retailUSD, sourceUrl: entry.source_url || undefined };
  }
  return { usd: DEFAULT_RETAIL_USD };
}

export function getPlaUsdPerGram(): number {
  const v = prices.plaUSDPerGram;
  return typeof v === "number" && v > 0 ? v : DEFAULT_PLA_USD_PER_GRAM;
}
