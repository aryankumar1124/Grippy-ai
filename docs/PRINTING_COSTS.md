# Printing cost estimates

Research date: 2026-10-29. Estimates below cover filament only, not a finished device or printing-service quote.

## Material assumptions and source

The [Bambu Lab US PLA Basic listing](https://bambulab-us.myshopify.com/products/pla-basic-filament) surfaced a $19.99 price and 1 kg size in the search index. The live canonical [US store](https://us.store.bambulab.com/products/pla-basic-filament) could not be fetched, so the exact refill/spool variant and live checkout price require rechecking. Treat $20/kg as a rounded scenario supported by that indexed listing, not a verified delivered quote or market average. Bulk discounts, spool choice, shipping, and tax can change the rate.

PLA is the initial prototype assumption. The team's $0.02/g coefficient matches $20/kg. Actual CAD mass and slicer consumption have not been measured.

## Formula and estimates

Cost per gram = filament USD per kilogram / 1000.

At $20/kg: $20 / 1000 = $0.02/g. Filament cost = estimated grams × $0.02/g.

| Illustrative aid | Assumed mass, not measured | Filament cost | Representative retail unit |
|---|---:|---:|---:|
| Key turner | 25 g | $0.50 | $8.74 each |
| Pen grip | 15 g | $0.30 | $4.95 each |
| Utensil sleeve | 30 g | $0.60 | $3.33 per 12-inch foam tube, bought as six for $19.95 |

Retail sources, unit normalization, and construction differences are in [PRICING_SOURCES.md](PRICING_SOURCES.md). The foam can be cut into multiple sleeves (approximately $1.11 per 90 mm section under the documented assumption), so the full-tube figure does not establish savings per sleeve. These comparisons do not establish equivalent performance or total savings.

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
