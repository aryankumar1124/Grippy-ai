# Retail price evidence

Checked 2026-10-29. USD listings before tax and delivery; no purchase or checkout quote. These are representative examples, not market averages or equivalent validated replacements. Recheck before presenting or purchasing.

| JSON key | Product and source | Listed purchase price | Value used in JSON |
|---|---|---:|---:|
| key_turner | [ElderDepot single key turner WP697](https://www.elderdepot.com/key_turner_single.php?cat=408&page=1) | $8.74 each | $8.74 each |
| pen_grip | [eSpecial Needs Original Pencil Grip](https://especialneeds.com/collections/writing-tools/products/the-pencil-grip-original-ergonomic-writing-grip-aid) | $4.95 each | $4.95 each |
| utensil_handle | [ElderDepot foam tubing WP2427](https://www.elderdepot.com/closed_cell_foam_tubing_hand_grips_6_package.php?cat=408&page=1) | $19.95 for six 12-inch tubes | $3.33 per full tube, rounded from $19.95 / 6 |

**The utensil entry is a derived unit price, not a separately purchasable $3.33 handle.** Minimum listed package spend is $19.95. Each tube can supply multiple short sleeves; three 90 mm sections fit within 304.8 mm before cutting loss, giving approximately $1.11 per section if all 18 sections are usable. Actual fit and waste vary. The frontend must disclose the unit and package basis; a savings badge without that context could mislead.

## Construction and fit

The key turner secures one key with a binding post and provides two finger holes. The listing does not specify a polymer or dimensions; do not infer them.

The pen listing verifies a single ergonomic grip and price. Exact material composition and dimensions were not verified. No vendor dimensions are being substituted for the team's catalog parameters. As another price example, [the manufacturer's six-pack](https://www.tpgcreations.com/products/the-pencil-grip-original) lists $14.99 ($2.50 per grip rounded), with a backorder notice. It is not the selected single-unit comparison.

The utensil comparator is closed-cell cushioning foam with a slip-resistant skin, not a rigid PLA print. The source describes 12-inch tubes: tan approximately 25 mm outside / 6 mm inside, red 29 mm / 9.5 mm, and blue 29 mm / 18–20 mm. Options and compliance differ; check the chosen tool's retention. Manufacturer cleaning claims for foam do not establish cleaning or food-contact suitability for our prints.

## Integration

`data/prices.json` retains exactly the three aid keys and `retailUSD` / `source_url` fields. Price-unit metadata stays here to preserve the shared contract. Role C should link this evidence and show the utensil unit assumption. Do not describe these examples as a universal retail range or compare a multi-item purchase total with one printed sleeve.
