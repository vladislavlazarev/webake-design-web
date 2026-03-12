# We Bake — Web Client Specification
> Version: v5 · Last updated: 2026-03-12 · Stack: React + Vite (single file `src/App.jsx`)

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `bg` | `#FBF6EF` | Page background |
| `cream` | `#FFF8F0` | Section backgrounds |
| `accent` | `#C75B2B` | Primary CTA, highlights |
| `accentL` | `#E07040` | Gradient end, hover state |
| `txt` | `#2D1810` | Body text |
| `muted` | `#6B5740` | Labels, secondary text |
| `light` | `#7A6B5D` | Tertiary / placeholders |
| `ok` | `#3D8B5E` | Success / active status |
| `warn` | `#D4860A` | Paused status |
| `err` | `#C23B3B` | Error / cancel |

### Typography
- **Headings:** Fraunces (serif, Google Fonts)
- **Body:** Plus Jakarta Sans (sans-serif)

### Breakpoints
| Name | Width |
|---|---|
| `mob` | < 768px |
| `tab` | 768–1023px |
| Desktop | ≥ 1024px |

### Animations
`fadeUp`, `scaleIn`, `pulse`, `float1/2`, `slideDown`, `blobMove`, `modalIn`, `bannerSlide`

---

## Global Layout

### Banner (top announcement)
- Fixed, appears above header when active district is selected
- Shows: "Browsing {district} — your neighborhood?"
- Actions: **Yes** (dismiss) · **Change** (opens district picker) · **✕** (close)
- Slides down with `bannerSlide` animation

### Header
- Fixed, blurred glass (`rgba(251,246,239,0.92)` + `backdrop-filter: blur(16px)`)
- **Left:** Logo (🍞 + "We Bake") → navigates Home · **Catalog** nav button (desktop only)
- **Right:** District pill (pulsing dot + name) · Sign In button OR profile avatar
- Profile dropdown (logged in): My Subscription · Delivery History · Billing · Sign Out

### District Picker Modal
- Triggered from district pill in header or banner "Change"
- Search input (address lookup UI only)
- 4 neighborhoods listed with Active/Waitlist badge:
  - Georgetown, DC — **Active**
  - Dupont Circle, DC — Waitlist
  - Capitol Hill, DC — Waitlist
  - Adams Morgan, DC — Waitlist
- Selecting an inactive district redirects to **Waitlist Page**

---

## Pages

### 1. Home Page

#### Hero Section
- **Left column:** Badge "Now delivering in {district}" · H1 "Fresh bread, hot from the oven." · Subtext · Two CTAs: **Build Your Schedule →** (primary) + **View Catalog** (outline) · Trust badges: Cancel anytime · 50% off first week · Stripe secure
- **Right column:** YouTube video embed (autoplay, muted, loop, no controls) — Video ID: `CE68eR7MAw8` · Floating cards (desktop): "Tomorrow, 6:30 AM" + bread photo with "Best bread ever!" review
- Decorative background blobs (desktop only)

#### City Request Section
Background: `cream`. Layout: two-column grid (stacked on mobile).

**Left card — Active City:**
- Green pulsing dot + "Now Active" label
- Title: "Georgetown, Washington DC"
- Description of service
- 3 bullet points: delivery by 9 AM · Georgetown coverage · 10+ varieties

**Right card — Request Form ("Not in Georgetown?"):**
- Label: "Not in Georgetown?" (uppercase, accent color)
- H3: "Request your city"
- Subtext: "Tell us where you are — we're planning our next cities based on demand."
- Form fields (all required for submit):
  1. **City** — text, placeholder "New York"
  2. **Street** — text, placeholder "123 Main St"
  3. **ZIP** — text, placeholder "10001"
  4. **Email** — email, placeholder "jane@example.com"
- Submit button: "Notify me when you arrive"
- Success state: 🎉 "You're on the list!" + confirmation copy mentioning the submitted city

#### How It Works Section
4-step grid (4-col desktop / 2-col tablet / 1-col mobile):
1. **Choose Your Bread** — browse 10+ varieties
2. **Set Your Schedule** — pick days & quantities, flexible
3. **We Bake & Deliver** — fresh, before 9 AM
4. **Pay Weekly** — charged for delivered items only

Each card: icon, step number (01–04), title, description. Hover: lift + shadow.

#### Catalog Preview Section
- 4 product cards (grid: 2-col mobile, 4-col desktop)
- "View Full Catalog →" button links to Catalog page

---

### 2. Catalog Page
- Full grid of all 10 products
- 2-col mobile · 3-col tablet+desktop
- Each card links to Schedule Builder (pre-selects that product)

**Product data (10 items):**
| Name | Price | Allergens |
|---|---|---|
| Classic Baguette | $3.50 | Wheat, Gluten |
| Sourdough Loaf | $5.00 | Wheat, Gluten |
| Uzbek Flatbread | $4.00 | Wheat, Gluten, Sesame |
| Ciabatta | $4.50 | Wheat, Gluten |
| Whole Wheat | $4.50 | Wheat, Gluten |
| Rye Bread | $5.50 | Wheat, Rye, Gluten |
| Focaccia | $5.00 | Wheat, Gluten |
| Croissant | $3.00 | Wheat, Gluten, Milk, Eggs |
| Multigrain Roll | $2.50 | Wheat, Gluten, Sesame, Nuts |
| Challah | $6.00 | Wheat, Gluten, Eggs |

**Product card:** Photo (4:3) · Name · Price · Star rating + review count · Description + allergens (desktop) · "Add to schedule →"

---

### 3. Schedule Builder Page
Two-column layout (1-col mobile with sticky bottom bar).

**Left — Schedule area:**
- "Add Bread to Schedule" button → expands product picker
- **Product picker:** 5-col desktop / 3-col mobile thumbnail grid. Selecting a product expands inline builder after that card's grid row.
- **Inline builder:** Product photo + name + price · Qty stepper · Day toggles (Mon–Sun) · **Add ✓** button (disabled until ≥1 day selected)
- Added items displayed as:
  - Desktop: table with day checkmarks
  - Mobile: card list

**Right / Bottom — Summary sidebar:**
- Delivery time slot selector (6 options, 6:00–9:00 AM in 30-min intervals)
- Line items: product × qty × days
- Delivery fee: $2/day × unique delivery days
- Weekly total
- 🎉 "50% off your first week!" badge
- **Continue to Checkout** button (requires login if not authenticated → opens Auth modal)

---

### 4. Checkout Page
3-step linear flow. Max width 680px.

**Step 1 — Delivery:**
- Address, Phone Number, Instructions (textarea)
- "Continue to Payment" →

**Step 2 — Payment (Stripe UI mock):**
- Card Number, Expiry, CVC
- "Secure via Stripe" badge + lock icon
- Billing note: weekly charge, cancel anytime, 50% off first week
- Back / Confirm buttons

**Step 3 — Done:**
- 🎉 "Subscription Active!" + first delivery time
- "Go to Subscription" → redirects to Subscription page

---

### 5. Subscription Page
- Status banner: Active (green) · Paused (amber) · None (grey) with Pause/Resume button
- **Weekly Schedule** card: table with day checkmarks, Edit button
- **Address** + **Delivery Time** cards (2-col grid)
- **Billing** card: payment status, link to Billing History

**Pause flow:** Opens PauseModal → options: Pause (resume anytime) or Cancel entirely

---

### 6. Delivery History Page
- List of past deliveries: date · items description · total · star rating
- Rated deliveries show star display
- Unrated deliveries show **Rate** button → opens RatingModal

**Rating Modal (multi-step):**
- Step 0: Rate the courier
- Steps 1–N: Rate each product individually
- Progress through steps, final step → "Done" confirmation

---

### 7. Billing Page
- Expandable weekly billing rows
- Each row: period · total · Paid badge
- Expanded: line items (product × days, delivery fee, first-week 50% discount if applicable)

---

### 8. Waitlist Page
Shown instead of Home when user selects a non-active district.
- "Not in {district} yet" heading
- Email + Address fields
- "Notify Me" button → success state

---

## Modals

### Auth Modal
- Magic link flow: Email → "Check Email" confirmation state
- Social: Apple · Google (Google triggers demo login)
- No password needed

### Pause Modal
- Two options: **Pause** (resume anytime) · **Cancel** (end subscription)
- Dismiss: "Keep active"

### Rating Modal
- Multi-step: courier first, then each product
- Star row (1–5), step counter, Next / Submit

---

## Pricing Logic
```
weeklyTotal = Σ (price × qty × days_count) per item
deliveryFees = unique_delivery_days × $2
grandTotal = weeklyTotal + deliveryFees
firstWeek = grandTotal × 0.5
```

---

## State (App root)
| State | Type | Purpose |
|---|---|---|
| `pg` | string | Current page |
| `logged` | bool | Auth state |
| `dist` | object | Selected district |
| `items` | array | Schedule items |
| `slot` | string | Delivery time slot |
| `coStep` | 1–3 | Checkout step |
| `subSt` | string | Subscription status (active/paused/none) |
| `banner` | bool | Show/hide location banner |
| `showAuth` | bool | Auth modal visibility |
| `showPause` | bool | Pause modal visibility |
| `showRate` | object\|null | Delivery being rated |
