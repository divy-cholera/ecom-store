# Demo Stories for Testing the Devin AI Integration

These are sample stories you can create in ServiceNow to test the integration.
Each one describes a feature change to the **ecom-store frontend** (`frontend/`).
When you move a story to **Work in Progress**, the Business Rule fires,
sends the story details to Devin, and Devin implements the change in this repo.

> **Repo URL to give Devin:** `https://github.com/<your-org>/ecom-store`
> (Push this repo to GitHub first so Devin can access it.)

---

## Demo Story 1: Apply ServiceNow Theme to Entire App

**Short Description:** Retheme the entire e-commerce app to ServiceNow's design system  
**Priority:** 2 - High  
**Story Points:** 3  

**Description:**
Replace the current indigo/gray theme across the entire app with ServiceNow's official design tokens. A theming reference document will be attached to this story (or linked in the work notes) with the exact color values, typography, spacing, and component styles to use.

Apply the ServiceNow theme to **all** sections of the app:
- **Sidebar** — background, nav items, active state, brand area, user profile
- **Top bar / Header** — background, search input, icons, staff avatars ring colors
- **Stat cards** — border, accent icon colors, text styles
- **Category tabs** — active/inactive pill colors
- **Product cards** — border, category badge, "Add" button
- **Cart sidebar** — header, item rows, checkout button
- **Sort dropdown & search** — focus rings, border colors

The theming should be applied through Tailwind utility classes (no CSS variables needed). Replace all `indigo-*`, `gray-*` accent colors with the ServiceNow equivalents from the reference doc.

**Acceptance Criteria:**
- Every UI element uses ServiceNow theme colors from the provided reference
- Sidebar active state, buttons, and badges use the primary ServiceNow color
- Product card "Add" buttons and cart "Checkout" button match ServiceNow's primary action color
- Category tab active state uses ServiceNow primary instead of indigo
- Focus rings on inputs and selects use ServiceNow primary
- The notification bell badge, cart count badge all use ServiceNow accent colors
- Overall app feels cohesive under the new theme — no stray indigo or mismatched colors remain
- Typography weight and size hierarchy is preserved (only colors change)

---

## Demo Story 2: Restore Original Theme for Product Grid Section

**Short Description:** Keep the product grid and product cards in the original indigo theme  
**Priority:** 3 - Medium  
**Story Points:** 2  

**Description:**
After Story 1 applies the ServiceNow theme globally, this follow-up story restores the **original indigo/gray theme** for the product-related section only:
- **Product cards** (`ProductCard.jsx`) — "Add" button goes back to `indigo-600`/`indigo-700`, category badge back to `white/90` with `text-gray-600`
- **Category tabs** — active pill goes back to `bg-indigo-600 text-white`, inactive back to `bg-white text-gray-600 border-gray-200`
- **Sort dropdown** — focus ring back to `ring-indigo-500`
- **Product count text** — back to `text-gray-400`

Everything **outside** the product grid (sidebar, header, stat cards, cart sidebar) should remain in the ServiceNow theme from Story 1.

**Acceptance Criteria:**
- Product cards use `bg-indigo-600` / `hover:bg-indigo-700` for the Add button
- Category filter pills use indigo for active state
- Sort dropdown focus ring is indigo
- Sidebar, header, stat cards, and cart sidebar remain fully in ServiceNow theme
- There is a clear visual distinction between the ServiceNow-themed shell and the indigo product area
- No regressions — all existing functionality (search, filter, sort, cart) still works

---

## Demo Story 3: Add Dark Mode Toggle

**Short Description:** Add a dark/light mode toggle in the sidebar  
**Priority:** 4 - Low  
**Story Points:** 3  

**Description:**
Add a toggle switch at the bottom of the sidebar (above the user profile) that switches between light and dark mode. In dark mode:
- Sidebar background becomes dark (`gray-900`), text becomes light
- Main content area background becomes `gray-950`, cards become `gray-900` with `gray-700` borders
- Header background becomes `gray-900`
- All text inverts appropriately
- The ServiceNow-themed accent colors (from Story 1) remain the same in both modes

Use a `dark` class on the root `<div>` and Tailwind's `dark:` variant. Persist the preference in `localStorage`.

**Acceptance Criteria:**
- A toggle (sun/moon icon) appears in the sidebar
- Clicking it toggles dark mode across the entire app
- Dark mode colors are applied via Tailwind `dark:` classes
- User preference persists across page reloads via `localStorage`
- Accent/primary colors from the ServiceNow theme remain unchanged in dark mode
- All text remains readable in both modes

---

## Demo Story 4: Add Product Quick View Modal

**Short Description:** Show a quick-view modal when clicking a product card  
**Priority:** 3 - Medium  
**Story Points:** 2  

**Description:**
Clicking anywhere on a product card (except the "Add" button) should open a centered modal overlay with:
- Larger product image
- Full product name, description, category, and price
- An "Add to Cart" button inside the modal
- A close (✕) button in the top-right corner

Clicking outside the modal or pressing Escape should close it.

**Acceptance Criteria:**
- Clicking a product card opens a modal overlay
- The modal shows the product image (larger), name, description, category badge, and price
- The "Add to Cart" button in the modal adds the item and closes the modal
- Clicking outside the modal or pressing Escape closes it
- The "Add" button on the card itself still works without opening the modal
- The modal is responsive (max-width on large screens, full-width on mobile)

---

## Demo Story 5: Add Wishlist Functionality

**Short Description:** Add a heart icon to save products to a wishlist  
**Priority:** 4 - Low  
**Story Points:** 2  

**Description:**
Add a heart icon button on each product card (top-right corner of the image). Clicking it toggles the product in/out of a wishlist. The wishlist count in the sidebar badge should update dynamically. When the "Wishlist" nav item is active, only wishlisted products should be shown in the grid.

**Acceptance Criteria:**
- A heart icon appears on each product card image (top-right)
- Clicking it toggles wishlisted state (filled red heart vs outline)
- The sidebar "Wishlist" badge shows the live count
- Navigating to the Wishlist page shows only wishlisted products
- Wishlisted state persists during the session (no need for localStorage)

---

## How to Use These Stories

1. **Push this repo** to GitHub so Devin can access it
2. **Create a story** in ServiceNow using one of the descriptions above
3. **For Story 1** — attach or link the ServiceNow theming reference document to the story
4. **Set the repo URL** on the story (or configure it in `DevinAIIntegration._getRepoUrl`)
5. **Move the story to Work in Progress** — the Business Rule fires
6. **Watch Devin work** — check the work notes for session URL
7. **Review the PR** that Devin creates against this repo
8. **Merge & verify** the change in the running app

### Recommended Order
| Order | Story | Depends On |
|-------|-------|------------|
| 1st   | Story 1 — ServiceNow Theme | None |
| 2nd   | Story 2 — Restore Product Grid Theme | Story 1 |
| 3rd   | Story 3 — Dark Mode | Story 1 |
| 4th   | Story 4 — Quick View Modal | None |
| 5th   | Story 5 — Wishlist | None |
