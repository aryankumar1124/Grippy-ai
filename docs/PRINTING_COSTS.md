# Printing cost estimates

Research date: 2026-10-29. Estimates below cover filament only, not a finished device or printing-service quote.

## Material assumptions and source

Use **$20/kg as an explicit modeling assumption**, not a verified current Bambu quote or market average. The earlier indexed Bambu $19.99 example is superseded as evidence: the [dated price tracker](https://www.printerdrops.com/filament) now shows Bambu PLA Basic at $14.99/kg and ELEGOO PLA Basic at $13.49/kg. Trackers can be stale or select the cheapest variant. The [ELEGOO manufacturer page](https://us.elegoo.com/products/pla-basic-filament-1-75mm-colored-1kg) was retrieved and identifies a spool-free product, but repeated fetches timed out before price and variant could be independently confirmed. Therefore those tracker amounts are context only, not verified checkout quotes. Shipping, tax, color, spool availability, and bundle conditions can change delivered cost.

PLA is the initial prototype assumption. The team's $0.02/g coefficient matches $20/kg. Actual CAD mass and slicer consumption have not been measured. Jonty needs to provide the three final STLs and a slicer profile (material, layer height, walls, infill, orientation, supports), then report total consumed grams and estimated print time. The current mock STL is not suitable evidence of functional-part mass.

## Formula and estimates

Cost per gram = filament USD per kilogram / 1000.

At $20/kg: $20 / 1000 = $0.02/g. Filament cost = estimated grams × $0.02/g.

| Illustrative aid | Assumed mass, not measured | Filament cost | Representative retail unit |
|---|---:|---:|---:|
| Key turner | 25 g | $0.50 | $8.74 each |
| Pen grip | 15 g | $0.30 | $4.95 each |
| Utensil sleeve | 30 g | $0.60 | $6.78 per finished handle, bought as four for $27.10 |

Retail sources, unit normalization, and construction differences are in [PRICING_SOURCES.md](PRICING_SOURCES.md). Cheaper cut-to-length foam remains an alternative. These comparisons do not establish equivalent performance or total savings. The handoff's alternative 35 g utensil scenario would be $0.70; neither 30 g nor 35 g is a measured mass.

The current backend `estimateGrams` uses a bounding volume, density coefficient 1.24 g/cm³, and a 0.35 multiplier, then rounds with a 3 g minimum. These are unvalidated software assumptions, not slicer results; the “20% infill” comment does not equal the calculation's 35% effective-volume factor. At catalog defaults the code estimates 15 g for the key turner, 12 g for the pen grip, and 28 g for the utensil handle ($0.30, $0.24, and $0.56 at $0.02/g). These code-derived values differ intentionally from the illustrative table and require replacement or calibration against real sliced parts by A/B.

For sensitivity only, 25 g at an assumed $15–30/kg costs $0.375–0.75 before rounding. This is a hypothetical range, not a researched market range.

## Total cost and limitations

- **Filament:** slicer grams should include supports, brim, purge, and other waste. Replace assumed mass with the selected STL and print-profile estimate; weigh a print for validation.
- **Electricity:** measured average kW × hours × local USD/kWh. No measurements or electricity tariff were verified here.
- **Printer usage:** depreciation, maintenance, machine time, service charges, and access fees are additional.
- **Labor:** setup, sizing, supervision, fitting, and iteration take time even when volunteered.
- **Failed prints:** consume additional material, energy, and labor. No project failure rate is known.
- **Post-processing:** support removal, edge smoothing, cleaning, and any fasteners or padding add cost.

Layer orientation, walls, infill, and material condition affect mass and strength. A cheap print is not evidence of safe fit or durability. PLA heat resistance, cleaning compatibility, skin comfort, retention, and suitability near food require evaluation for the actual printed part. Do not assume food-contact safety or dishwasher compatibility from a filament label.

Recommended display: “Estimated filament cost: $X; excludes printing, labor, waste, and finishing.” Avoid “nearly free,” guaranteed percentage savings, or a claim that a usable device costs only cents.
