# Asset provenance

All website images are stored locally in `frontend/public/images`, optimized as WebP. Typography is self-hosted in `frontend/public/fonts` (Cormorant Garamond and Manrope from Google Fonts, distributed under their open font licences; see the upstream repositories).

## Original AI architectural visualisations

Built-in OpenAI Imagegen was used, not the CLI fallback.

| File            | Subject                                                        |
| --------------- | -------------------------------------------------------------- |
| `hero.webp`     | Timber cabana, pool and forest hills at golden hour            |
| `exterior.webp` | Believable clay-tile-roof Sri Lankan garden cabana in daylight |
| `interior.webp` | Timber bedroom, linen and private terrace                      |
| `dining.webp`   | Tropical breakfast on a forest veranda                         |

These are illustrative concepts, not real property photographs. Full prompts are recorded in `IMAGE-PROMPTS.json`. Original generated PNG files are in `assets/generated/`.

## Real Sri Lankan reference photographs

| Local file                 | Source                                                                                    | Rights/status                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `sri-lanka-pool.webp`      | https://www.bogalavillageecoresort.com/images/Infinity%20Pool%20at%20Bogala%20Village.jpg | Bogala Village Eco Resort; local design reference, rights retained by source   |
| `sri-lanka-treehouse.webp` | https://www.backofbeyond.lk/wp-content/uploads/2025/09/tree-house1.webp                   | Back of Beyond, Pidurangala; local design reference, rights retained by source |

Source pages: https://www.bogalavillageecoresort.com/ and https://www.backofbeyond.lk/locations/jungle-hideaway-pidurangala/

The user requested real Sri Lankan photo references. No third-party resort logos or testimonials were copied. Credits are visible in the gallery lightbox and on the photo credits page. These references are not represented as photographs of ELARA. Use owned/licensed photos for a public commercial launch.

`scripts/prepare-assets.mjs` can rebuild the optimized images from `assets/generated/` and reacquire the documented references and fonts. It is not needed to run or build the website. All final assets are already included in this project.
