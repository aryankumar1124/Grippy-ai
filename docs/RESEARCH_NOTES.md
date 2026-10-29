# Research notes

Researched 2026-10-29. Statistics retain their survey periods; they are not 2026 prevalence estimates. Sources were retrieved through web research. No clinical or physical validation was performed.

## Interpretation

`data/stats.json` contains four distinct observations. The CDC arthritis total covers all diagnosed arthritis, not hand arthritis, impaired dexterity, or demand for this product. The age-specific CDC figure uses a different survey period. Do not add these populations together.

The dexterity observation comes from a 2025 conference abstract, not a full methods paper. Use it only with its age, sex, survey period, and preliminary-evidence qualification. No current, all-adult US hand-function count was verified. Do not extrapolate this older-adult estimate to all adults or interpret the abstract's before/after comparison as proof of causation.

[NIH's carpal tunnel overview](https://health.nih.gov/health-topics-a-z/cts) describes how weakness can interfere with grasping small items such as buttons and zippers. This supports the practical relevance of hand function; it does not establish that our grips treat any condition. Turning keys, writing, and holding cutlery are prototype task examples, not measured patient outcomes.

[WHO](https://www.who.int/news-room/fact-sheets/detail/assistive-technology) identifies cost, awareness, physical access, product choice, workforce, and funding barriers. Its global figures span many technologies and cannot be used as a market-size estimate for three hand aids.

## Team handoff

Use the JSON schemas unchanged. Prices and unit assumptions are documented in [PRICING_SOURCES.md](PRICING_SOURCES.md); material estimates are in [PRINTING_COSTS.md](PRINTING_COSTS.md). Label the cost panel “estimated filament cost” and identify the retail comparison unit. Do not claim universal $20–80 retail pricing, validated tremor control, a fixed leverage multiplier, or a clinically validated custom fit.

The supplied master plan is the scope reference. Arjun's direct instructions override its video assignments and `d-impact` branch name: this work uses `arjun`, excludes video, and modifies only `data/` and `docs/`.
