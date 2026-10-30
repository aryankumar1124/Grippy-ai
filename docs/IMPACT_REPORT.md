# AdaptiveMake impact report

Prepared 2026-10-29 for the Nittany AI Vibeathon. This is a prototype impact rationale, not a clinical evaluation.

## Problem

Limited hand strength, movement, or coordination can make manipulating small objects difficult. The prototype focuses on turning a key, holding a pen, and gripping a utensil. Needs can arise with arthritis, tremor, stroke-related difficulties, limb differences, or other limitations, but diagnosis alone does not determine which aid will help.

[CDC FastStats](https://www.cdc.gov/nchs/fastats/arthritis.htm) reports that 21.1% of US adults aged 18+ had diagnosed arthritis in 2025. A [2026 study of 2023 NHIS data](https://stacks.cdc.gov/view/cdc/260898) estimates 24.8 million adults with arthritis-attributable activity limitations. Neither measure is hand-specific or an addressable-market count. See [research notes](RESEARCH_NOTES.md) and [the statistics dataset](../data/stats.json) for populations, periods, and evidence limits.

## Existing solutions

Commercial key turners, ergonomic writing grips, and foam handle sleeves already offer ways to change a tool's grasping surface or leverage. They may be inexpensive and sufficient. Fixed sizes, material preferences, tool compatibility, and access to fitting advice can still limit suitability. [WHO](https://www.who.int/news-room/fact-sheets/detail/assistive-technology) identifies cost, access, awareness, product range, and service capacity as broader assistive-technology barriers; our project has not measured their prevalence among its users.

[Makers Making Change's device library](https://www.makersmakingchange.com/assistive-devices) already provides open-source designs and volunteer fabrication requests. Its [low-tech kit initiative](https://www.makersmakingchange.com/news/help-us-print-low-tech-at-kits-MC2LOKUSYDIZGEFPUMP3BGFGO25A) includes printed key turners and pen holders and describes occupational therapist involvement in trials and feedback. AdaptiveMake does not invent printed assistive devices; its proposed contribution is the plain-language selection and parameter-editing workflow. Organizational totals and individual testimonials are not evidence of our prototype's effectiveness.

## Our solution

AdaptiveMake's intended workflow translates a plain-language task difficulty into one of three parameterized aid designs. Users can inspect a 3D preview, request changes, and export an STL for printing. This may make design exploration more approachable for someone without CAD experience. Hand-size categories provide a starting point; they do not establish custom fit.

## Innovation

The proposed contribution is the combined workflow: natural-language input, AI-assisted tool selection and rationale, personalized parameter sizing, interactive 3D preview, natural-language modification, and STL export. It uses bounded templates rather than unrestricted invention of devices. It is inspired by text-to-cad; no claim of first invention or unique clinical capability is made. Implementation status is recorded separately in [PROTOTYPE_TESTING.md](PROTOTYPE_TESTING.md).

## Accessibility benefits

Potential benefits include explaining a task in familiar language, exploring a larger handle or different length, and iterating locally with a helper or maker. The benefit to daily activity must be established with users. A wider grip is not universally comfortable, and a pen sleeve is not established treatment for tremor. The AI provides design suggestions; it is not an occupational therapist or a substitute for professional assessment.

## Affordability

The selected retail examples are $8.74 for a key turner and $4.95 for one writing grip. The finished utensil-handle comparator costs $27.10 for four, or $6.78 per handle rounded. Cheaper cut-to-length foam remains an option. See [retail evidence](PRICING_SOURCES.md) for links, units, availability, and alternatives.

At an assumed $20/kg PLA, illustrative 15–30 g parts consume $0.30–0.60 of filament. Those masses are not sliced or weighed. The [filament estimates](PRINTING_COSTS.md) exclude electricity, machine access, labor, failures, and finishing; these remain unmeasured additional costs. Affordable customization is a hypothesis to evaluate, not a demonstrated cost advantage over every commercial option.

## Limitations

- Physical fit: confirm hand comfort, key/pen/utensil dimensions, retention, and clearance before use.
- Print strength: test twisting, slipping, cracking, and repeated use under a documented print profile; do not promise a fixed leverage multiplier.
- Material durability: evaluate heat, moisture, cleaning, surface finish, and skin compatibility. Do not infer food-contact or dishwasher suitability.
- Design validation: a plausible preview or successful STL export does not establish a safe functional part.
- Accessibility testing: keyboard access, focus, contrast, screen-reader feedback, mobile layout, and ease of physical use require testing with intended users.
- Occupational therapist review: seek review of task selection, fitting guidance, and safety language before presenting therapeutic benefit. No clinical or user validation has been completed here.

## Future potential

Partner with occupational therapists and disabled users to define useful tasks and acceptable fit. Campus makerspaces and libraries with suitable printers could support supervised iteration, subject to local capacity and costs. A community design library could record compatible tools, print profiles, test results, and revisions. Expand beyond the three aids only after validating existing templates. Measure task completion, comfort, assistance required, print failures, and total cost against users' existing solutions, with consent and clear stopping rules for discomfort.
