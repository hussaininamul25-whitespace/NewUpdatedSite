# Website Asset Guidelines & Naming Convention

To make updating your portfolio seamless, use the following standardized image sizes, formats, and naming conventions. All images should be optimized for the web (consider using tools like TinyPNG or saving as WebP/optimized JPG) to keep load times fast.

## 1. Global Assets
These are persistent assets used across the entire site (navigation, footers, etc.).

| Placeholder Name | Recommended Size | Format | Description | Naming Suggestion |
| :--- | :--- | :--- | :--- | :--- |
| `logo.png` | Max Height: 120px | SVG or PNG | Main site logo in the top left. Needs transparent background. | `logo_main.svg` or `logo_main.png` |
| `footer_logo.png` | Match logo size | SVG or PNG | Logo used in the footer area. | `logo_footer.svg` |
| `green_logo.png` | 100x100px | SVG or PNG | Small monogram or icon used in floating bottom nav. | `icon_monogram.png` |

## 2. Hero Section
The first impression of your website.

| Placeholder Name | Recommended Size | Format | Description | Naming Suggestion |
| :--- | :--- | :--- | :--- | :--- |
| `profile.png` | 1000x1500px | PNG | Your portrait cutout. **Must have a transparent background**. The bottom should ideally fade cleanly or be a flat cut. | `hero_portrait.png` |
| `hero_photo_X.png` | 1280x720px | JPG/WebP | The parallax grid images behind your portrait. **Ratio must be 16:9 landscape**. | `hero_grid_01.jpg`, `hero_grid_02.jpg`... |

## 3. Work Section (Thumbnails)
The scrolling list of project thumbnails on the homepage.

| Placeholder Name | Recommended Size | Format | Description | Naming Suggestion |
| :--- | :--- | :--- | :--- | :--- |
| `project-img` | 1200x800px | JPG/WebP | Background image for the project cards. CSS uses `background-size: cover`, so standard 3:2 or 16:9 landscape works perfectly. | `work_thumb_01.jpg`, `work_thumb_02.jpg` |

## 4. Work Section (Cursor Hover Thumbnails)
The tiny trailing images attached to your custom cursor.

| Placeholder Name | Recommended Size | Format | Description | Naming Suggestion |
| :--- | :--- | :--- | :--- | :--- |
| `thumbX` | 300x200px | JPG | Very small proxy images for cursor hover. These are forced into a **3:2 horizontal aspect ratio** (120x80 CSS). | `cursor_thumb_01.jpg`, `cursor_thumb_02.jpg` |

## 5. Other Homepage Sections (Vision & Services)
| Placeholder Name | Recommended Size | Format | Description | Naming Suggestion |
| :--- | :--- | :--- | :--- | :--- |
| `lady_red_theme.png` | 800x1000px | JPG/WebP | The expanding image in the "Built Different" Vision section. Portrait orientation works best. | `vision_image.jpg` |
| Service Images | 800x600px | JPG/WebP | The changing image displayed when hovering over different service items. | `service_web.jpg`, `service_branding.jpg` |
| Testimonial Avatars| 100x100px | JPG/PNG | The small round profile pictures for the clients. | `client_avatar_01.jpg` |

## 6. Project Details Page — `project1.html` (Taswara)
Images live inside `public/taswara/`. Each layout block below maps to a specific section on the page.

### Hero (Video/Image Banner)
| Placeholder Name | Recommended Size | Format | Description |
| :--- | :--- | :--- | :--- |
| Vimeo embed | 1920×1080px source | MP4/Vimeo | Full-width video banner. Container is `100% wide × 90vh tall` (16:9). Replace the Vimeo ID in the `<iframe>` src. |

### Right Column — Scroll-Stacked Detail Cards
Three images that stack on top of each other as the user scrolls. Container is `~60% page width × 50vh tall`.

| File Name | Recommended Size | Format | Description |
| :--- | :--- | :--- | :--- |
| `taswara_detail_01.jpg` | 1200×800px | JPG/WebP | First card visible on load |
| `taswara_detail_02.jpg` | 1200×800px | JPG/WebP | Second card, reveals on scroll |
| `taswara_detail_03.jpg` | 1200×800px | JPG/WebP | Third card, reveals on scroll |

### Full-Width Dual Gallery
Two images displayed side by side in a 2-column grid. Each cell is `50% page width × 90vh tall` — use portrait/tall crops for best results.

| File Name | Recommended Size | Format | Description |
| :--- | :--- | :--- | :--- |
| `taswara_gallery-01.jpg` | 900×1400px | JPG/WebP | Left gallery image |
| `taswara_gallery-02.jpg` | 900×1400px | JPG/WebP | Right gallery image |

### Interactive Hover Stack (3-Card Fan)
Three cards stacked in a **perfect square** container (`clamp(320px–550px) × 1:1`). On hover, the top card lifts and the two behind slide left/right. Use square crops.

| File Name | Recommended Size | Format | Description |
| :--- | :--- | :--- | :--- |
| `taswara_card_01.jpg` | 1000×1000px | JPG/PNG | **Top card** — shown prominently on hover |
| `taswara_card_02.jpg` | 1000×1000px | JPG/PNG | Left card — slides out on hover |
| `taswara_card_03.jpg` | 1000×1000px | JPG/PNG | Right card — slides out on hover |

### Vertical Full-Width Images
Two stacked full-width landscape images at the bottom of content. Each is `100% content width × 16:9 aspect ratio`.

| File Name | Recommended Size | Format | Description |
| :--- | :--- | :--- | :--- |
| `taswara_vert_01.jpg` | 1920×1080px | JPG/WebP | First full-width landscape showcase |
| `taswara_vert_02.jpg` | 1920×1080px | JPG/WebP | Second full-width landscape showcase |

---

## ⚡ Pro Tips for Flow:
1. **Prepare Your Assets First:** Name them using the suggestions above and place them all inside the `public/` directory (for Vite).
2. **Find & Replace:** Open `index.html` inside VS Code, press `Ctrl+F` (or `Cmd+F`), insert the placeholder name (e.g., `https://images.unsplash.com...`), and replace it with `"/work_thumb_01.jpg"`.
3. **Format Setup:** Using `WebP` for all large photographs is highly recommended, it can easily save ~50% load time while retaining quality. Use `PNG` ONLY for your main portrait (`profile.png`).
