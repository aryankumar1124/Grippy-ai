# Research notes

Researched 2026-10-29. Statistics retain their survey periods; they are not 2026 prevalence estimates. Sources were retrieved through web research. No clinical or physical validation was performed.

## Interpretation

`data/stats.json` contains five distinct observations. The historical CDC arthritis count (53.2 million, 2019–2021) remains valid but is not a current count. The newer [CDC FastStats](https://www.cdc.gov/nchs/fastats/arthritis.htm) prevalence is 21.1% in 2025. The [2023 NHIS activity-limitations study](https://stacks.cdc.gov/view/cdc/260898), published in 2026, estimates 24.8 million adults with arthritis-attributable activity limitations. These measures cover all arthritis and overlap; they are not hand-impairment counts or product demand. Do not add them or infer a trend from different periods and measures.

The dexterity observation comes from a 2025 conference abstract, not a full methods paper. Use it only with its age, sex, survey period, and preliminary-evidence qualification. No current, all-adult US hand-function count was verified. Do not extrapolate this older-adult estimate to all adults or interpret the abstract's before/after comparison as proof of causation.

The abstract's 15,222 adults aged 65+ span the 2001–2023 cycles, not the 2021–2023 subgroup alone. The latter subgroup denominators and uncertainty intervals are not supplied in the abstract. The [publisher PDF](https://academic.oup.com/innovateage/article-pdf/9/Supplement_2/igaf122.2414/66236268/igaf122.2414.pdf) corroborates the indexed PMC abstract when the PMC page presents a bot check.

The handoff's [28.7% disability figure](https://www.cdc.gov/disability-and-health/articles-documents/disability-and-health-data-now.html) is supported for 2022 BRFSS. It covers hearing, vision, mobility, cognition, self-care, or independent living, not hand dexterity. It is excluded from the small JSON dataset because it adds broad context rather than a hand-specific measure. The previously used [53.9% age-75+ arthritis estimate](https://www.cdc.gov/nchs/products/databriefs/db497.htm) remains supported for 2022, but the JSON now prioritizes newer arthritis evidence.

[NIH's carpal tunnel overview](https://health.nih.gov/health-topics-a-z/cts) describes how weakness can interfere with grasping small items such as buttons and zippers. This supports the practical relevance of hand function; it does not establish that our grips treat any condition. Turning keys, writing, and holding cutlery are prototype task examples, not measured patient outcomes.

[WHO](https://www.who.int/news-room/fact-sheets/detail/assistive-technology) identifies cost, awareness, physical access, product choice, workforce, and funding barriers. Its global figures span many technologies and cannot be used as a market-size estimate for three hand aids.

## Team handoff

Use the JSON schemas unchanged. Prices and unit assumptions are documented in [PRICING_SOURCES.md](PRICING_SOURCES.md); material estimates are in [PRINTING_COSTS.md](PRINTING_COSTS.md). Label the cost panel “estimated filament cost” and identify the retail comparison unit. Do not claim universal $20–80 retail pricing, validated tremor control, a fixed leverage multiplier, or a clinically validated custom fit.

The supplied master plan is the scope reference. Arjun's direct instructions override its video assignments and `d-impact` branch name: this work uses `arjun`, excludes video, and modifies only `data/` and `docs/`.
