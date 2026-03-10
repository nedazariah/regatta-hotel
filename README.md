# Regatta Suites Kuching — Hotel Website

A production-ready React hotel booking website for Regatta Suites Kuching.

## Quick Start

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, facilities, Tabas Lounge, dining, experiences, newsletter |
| `/rooms` | All rooms listed vertically with large photos |
| `/booking` | Room selection with inline calendar + expandable room detail |

---

## Project Structure

```
src/
├── styles/
│   ├── theme.js          ← Design tokens (colors, fonts, spacing) — edit here to restyle globally
│   └── global.css        ← CSS resets, font setup, react-day-picker overrides
├── data/
│   ├── hotel.js          ← Hotel info, nav links, footer links
│   ├── rooms.js          ← Room catalogue (prices, images, amenities)
│   ├── facilities.js     ← Facility cards
│   └── dining.js         ← Dining / F&B outlets
├── utils/
│   └── dateUtils.js      ← Date formatting helpers
├── context/
│   └── BookingContext.jsx ← Shared booking state (dates, guests, selected room)
├── hooks/
│   └── useWindowSize.js  ← Responsive breakpoint hook
├── components/
│   ├── layout/
│   │   ├── Header.jsx    ← Two-row sticky nav header
│   │   └── Footer.jsx    ← 4-column footer
│   ├── ui/
│   │   ├── Button.jsx         ← Reusable button (primary/outline/ghost/gold variants)
│   │   ├── SearchBar.jsx      ← Date + room + guest search bar with inline calendar
│   │   ├── CalendarPicker.jsx ← react-day-picker range picker dropdown
│   │   ├── FilterTabs.jsx     ← Room category filter tabs
│   │   └── NewsletterStrip.jsx← Email signup section
│   └── sections/
│       ├── FacilitiesSection.jsx ← Homepage facilities horizontal scroll
│       ├── DiningSection.jsx     ← Homepage dining 3-card layout
│       ├── ExperiencesSection.jsx← Homepage split layout / Hornbill section
│       ├── RoomCard.jsx          ← Room card (list variant + grid variant)
│       └── RoomDetail.jsx        ← Inline room detail hero + booking panel
└── pages/
    ├── HomePage.jsx    ← Assembles homepage sections
    ├── RoomsPage.jsx   ← Room list page
    └── BookingPage.jsx ← Booking page with filter + room detail state
```

---

## API Integration Notes

All data files contain `TODO (API)` comments marking the exact lines to replace with API calls.

| File | Replace with |
|---|---|
| `src/data/rooms.js` | `GET /api/rooms` or `GET /api/availability?checkIn=&checkOut=` |
| `src/data/facilities.js` | `GET /api/facilities` |
| `src/data/dining.js` | `GET /api/dining` |
| `src/data/hotel.js` | `GET /api/hotel/info` |
| `src/context/BookingContext.jsx` | `POST /api/reservations` for reservation creation |
| `src/components/ui/NewsletterStrip.jsx` | `POST /api/newsletter` for email signup |

### Recommended pattern (fetch on mount):
```jsx
// In a page or context:
useEffect(() => {
  fetch('/api/rooms')
    .then(r => r.json())
    .then(setRooms);
}, []);
```

---

## Design System

- **Fonts**: Cormorant Garamond (display/headings) + DM Sans (body)
- **Colors**: Cream `#F5EFE6` · Navy `#0B1829` · Gold `#C9A84C`
- **Edit design tokens**: `src/styles/theme.js`

---

## Image Notes

Room images load directly from `regattasuites.com.my`. Non-room images (facilities, dining,
hero, lounge) are placeholders — look for `// TODO: Replace with actual ...` comments in the
data files and section components to swap them with real photography.

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | DOM rendering |
| react-router-dom | ^6.27.0 | Client-side routing + browser history |
| react-day-picker | ^9.4.4 | Date range calendar picker |
| react-scripts | 5.0.1 | Build tooling |
