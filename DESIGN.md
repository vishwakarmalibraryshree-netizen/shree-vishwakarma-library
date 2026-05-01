# Design Brief: Shree Vishwakarma Library

**Premium Indian institutional library management app with warm, professional educational aesthetic centered on sacred knowledge.**

## Direction & Tone

Refined, trustworthy, ceremonial. Warm cream backgrounds with deep maroon primary and saffron accents. Saraswati logo ensures authentic Indian identity.

## Color Palette

| Token      | OKLCH           | Usage                                          |
| ---------- | --------------- | ---------------------------------------------- |
| primary    | 0.35 0.15 15    | Nav, buttons, active states                    |
| accent     | 0.65 0.22 40    | Saffron highlights, hover, icons               |
| destructive| 0.55 0.22 25    | Danger actions, destructive states             |
| success    | N/A (use accent)| Occupied seats (override to green via component)|
| warning    | N/A (use accent)| Available seats (override to warning via component)|
| background | 0.97 0.025 65   | Main surface, cream institutional              |
| card       | 0.98 0.01 60    | Card surfaces, elevated layers                 |
| muted      | 0.88 0.02 50    | Subtle dividers, secondary backgrounds         |

## Typography

- Display: **Fraunces** — elegant serif headings, ceremonial authority
- Body: **DM Sans** — clean sans labels & form text, modern accessibility
- Mono: **GeistMono** — code blocks, seat IDs, transaction details

## Zones

| Zone    | Background | Border | Treatment                      |
| ------- | ---------- | ------ | ------------------------------ |
| Header  | primary    | none   | Cream text, saffron accent     |
| Content | background | border | Card-based alternating surfaces|
| Sidebar | primary    | accent | Cream foreground, pill badges  |
| Footer  | muted      | border | Centered secondary text        |

## Component Patterns

- **Seats**: green=Available, red=Occupied (override color in component layer)
- **Buttons**: maroon bg, cream text, warm shadow hover
- **Cards**: cream bg, warm shadow, 6px radius, optional top border accent
- **Forms**: cream inputs, maroon focus ring
- **Badges**: saffron bg, maroon text, 24px radius

## Motion & Interaction

Fade-in entrance (0.3s), slide-down modals, shadow emphasis on hover. Smooth transitions all 0.3s cubic-bezier. No decorative gradients on body; solid color layers only.

## Constraints

No gradient backgrounds on body, warm shadows only (never cool), saffron sparingly (highlights/active states), maroon focus rings on inputs, no text gradients.

## Signature

Warm maroon-to-saffron header with Saraswati logo positions app as institutional knowledge guardian. Sacred institutional aesthetic without ornament.
