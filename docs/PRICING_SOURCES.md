# Retail price evidence

Checked 2026-10-29. USD listings before tax and delivery; no purchase or checkout quote. These are representative examples, not market averages or equivalent validated replacements. Recheck before presenting or purchasing.

| JSON key | Product and source | Listed purchase price | Value used in JSON |
|---|---|---:|---:|
| key_turner | [ElderDepot single key turner WP697](https://www.elderdepot.com/key_turner_single.php?cat=408&page=1) | $8.74 each | $8.74 each |
| pen_grip | [eSpecial Needs Original Pencil Grip](https://especialneeds.com/collections/writing-tools/products/the-pencil-grip-original-ergonomic-writing-grip-aid) | $4.95 each | $4.95 each |
| utensil_handle | [eSpecial Needs Universal Built-Up Handle E14864 / 746300000](https://especialneeds.com/collections/utensils/products/universal-built-up-handle?_fid=8563e0876&_pos=15&_ss=c) | $27.10 for four handles | $6.78 per handle, decimal half-up rounding of $27.10 / 4 |

**The utensil entry is a derived unit price, not a separately purchasable $6.78 handle.** Minimum listed package spend is $27.10. The page's generic “each” label refers to the sales item; its description and specifications explicitly say package of four. This replaces the previous full 12-inch foam-tube comparator with a finished handle of roughly the prototype's intended length. The frontend must disclose the four-pack basis. All three selected prices were rechecked on their original retailer pages; none is a market average. The pen and utensil pages show in-stock status. The key page permits ordering but does not explicitly confirm stock.

## Construction and fit

The key turner secures one key with a binding post and provides two finger holes. The listing does not specify a polymer or dimensions; do not infer them.

The pen listing verifies a single ergonomic grip and price. Exact dimensions were not verified. The [manufacturer](https://www.tpgcreations.com/products/the-pencil-grip-original) describes soft, flexible, latex-free material and lists its six-pack at $14.99 ($2.50 per grip rounded), with a backorder notice. It is not the selected single-unit comparison. A rigid PLA sleeve is materially different from this soft grip.

The selected utensil comparator is a soft, ribbed multipurpose handle, about 92.2 mm long and 44 mm in diameter, accommodating tool widths of approximately 6.4–25.4 mm. Polymer composition is not specified. Cutlery is excluded. Seller cleaning claims do not establish cleaning or food-contact suitability for our prints.

The previous [ElderDepot foam option](https://www.elderdepot.com/closed_cell_foam_tubing_hand_grips_6_package.php?cat=408&page=1) remains $19.95 for six 12-inch tubes. It is a lower-cost alternative that can be cut into several sleeves and must not be omitted when discussing affordability broadly. It is no longer the JSON comparison because a full tube is not one finished utensil handle.

## Additional handoff listings checked

- [HealthyKin Ableware key turner](https://www.healthykin.com/p-5025-ableware-key-turner-aid-for-arthritis.aspx): $11.95, two-to-four-week lead time. The existing $8.74 single-key comparator remains supported, so it is retained.
- [Rehabmart extra-leverage key turner](https://www.rehabmart.com/product/key-turner-140.html): $27.69 sale price; heavy-duty plastic, three-key design, about 120 × 22 mm. Ordering is offered; stock is not explicitly confirmed. Not interchangeable with a single-key product.
- [BipGrip](https://www.arthritissupplies.com/bipgrip-pen-grip.html): $10.95 selling price versus $12.95 list price; plastic, latex-free, approximately 114.3 mm long × 25.4 mm diameter. The page reports in stock, with an out-of-stock waiting-list modal also present in extracted text. It is a longer screw-cap holder, not the selected short grip.
- [Performance Health deluxe foam utensil](https://www.performancehealth.com/deluxe-built-up-foam-utensil): access denied (403); handoff's $15.07 is unverified and excluded. A complete utensil also differs from a handle accessory.

## Integration

`data/prices.json` retains exactly the three aid keys and `retailUSD` / `source_url` fields. Price-unit metadata stays here to preserve the shared contract. Role C should show “$6.78 per handle; $27.10 pack of 4” for utensils and link the source. Do not add `plaUSDPerGram` to this file even though the UI branch offers that optional override: it is outside the agreed schema. The documented $0.02/g remains an assumption.
