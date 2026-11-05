# Frontend / Backend module guide

Open `D:\projects\cabana` in your editor. The two applications are now named explicitly:

```text
cabana/
├── frontend/                  # Next.js guest website and admin screens
│   └── src/
│       ├── app/               # Small URL entry points
│       ├── modules/
│       │   ├── booking/
│       │   │   ├── config/labels.ts
│       │   │   ├── components/reserve-button.tsx
│       │   │   ├── components/booking-form.tsx
│       │   │   ├── hooks/use-reserve-stay.ts
│       │   │   ├── hooks/use-booking-form.ts
│       │   │   ├── services/booking-api.ts
│       │   │   └── styles/booking.css
│       │   ├── navigation/    # Header, footer, navigation/menu actions
│       │   ├── home/          # Separate homepage section components
│       │   ├── cabanas/       # Cabana cards, collection and detail screens
│       │   ├── experiences/   # Content data and accordion action
│       │   ├── gallery/       # Filters, photo navigation and viewer
│       │   ├── admin/         # Login, inbox, cabana/settings/gallery editors
│       │   ├── contact/
│       │   └── legal/
│       └── shared/            # Common dialog, brand, API transport, formatting
├── backend/
│   └── src/modules/
│       ├── auth/
│       ├── cabanas/
│       ├── content/
│       ├── enquiries/
│       └── media/
├── packages/contracts/        # Shared API types and validation
├── scripts/
├── tests/
└── docs/
```

## Button name change — නම වෙනස් කරන්න

Open `frontend/src/modules/booking/config/labels.ts`:

```ts
reserveYourStay: "Reserve your stay",
```

Change it to:

```ts
reserveYourStay: "Book your cabana",
```

The header and every default ReserveButton use this same label. Changing the label does not change its click behavior. Buttons with a deliberate custom caption, such as the footer CTA, use that owning module's `config/labels.ts`.

## Button function change — click කළාම කරන වැඩේ වෙනස් කරන්න

`frontend/src/modules/booking/hooks/use-reserve-stay.ts` owns the reservation button action. The current behavior calls `openBooking({cabanaId})` and opens the enquiry dialog.

`components/reserve-button.tsx` owns the button's HTML, icon, CSS class and props. Reuse it with `<ReserveButton />` rather than copying another reservation button.

## What to edit

| Change                                   | File/folder                                                         |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Reserve button default caption           | `frontend/src/modules/booking/config/labels.ts` → `reserveYourStay` |
| Enquiry submit button caption            | Same file → `sendStayEnquiry`                                       |
| Reservation button click action          | `frontend/src/modules/booking/hooks/use-reserve-stay.ts`            |
| Form state, validation and submit action | `frontend/src/modules/booking/hooks/use-booking-form.ts`            |
| Enquiry HTTP endpoint call               | `frontend/src/modules/booking/services/booking-api.ts`              |
| Backend enquiry validation/storage       | `backend/src/modules/enquiries/`                                    |
| Header menu names and destinations       | `frontend/src/modules/navigation/config/navigation.ts`              |
| Header menu open/close behavior          | `frontend/src/modules/navigation/hooks/use-navigation.ts`           |
| Header/footer styling                    | `frontend/src/modules/navigation/styles/navigation.css`             |
| Homepage hero component                  | `frontend/src/modules/home/components/hero-section.tsx`             |
| Homepage button/link captions            | `frontend/src/modules/home/config/labels.ts`                        |
| Cabana card appearance                   | `frontend/src/modules/cabanas/components/cabana-card.tsx`           |
| Gallery filtering/photo buttons          | `frontend/src/modules/gallery/hooks/use-gallery.ts`                 |
| Admin button captions                    | `frontend/src/modules/admin/config/labels.ts`                       |
| Admin button actions                     | `frontend/src/modules/admin/hooks/use-admin-dashboard.ts`           |
| Admin API calls/uploads                  | `frontend/src/modules/admin/services/admin-api.ts`                  |
| Theme / common button style              | `frontend/src/shared/styles/base.css`                               |
| Site brand name and cabana content       | Admin settings / cabana editor, persisted in the database           |

Each module owns its styles, including responsive rules. Shared CSS contains reusable typography, buttons, forms, dialogs and page layout helpers. No backend code is imported by the frontend; only the explicit shared contracts package crosses that boundary.

## Run separately

From the root, terminal 1:

```powershell
npm run dev:frontend
```

Terminal 2:

```powershell
npm run dev:backend
```

Or run both with `npm run dev`. Frontend changes update automatically. Backend development now compiles TypeScript changes and restarts the API after a successful compilation. Database and uploads remain inside `backend/data` and `backend/uploads`.

You can also open each folder directly and run `npm run dev` from that application folder, after installing dependencies once at the root. The common root `node_modules` avoids duplicate installations.

## Add a new feature

1. Create `frontend/src/modules/<feature>/components` for its display.
2. Put button names in `config/labels.ts`.
3. Put state and click/submit actions in `hooks/`; HTTP calls in `services/`.
4. Put the module's desktop/mobile CSS in `styles/<feature>.css`, then import it from `app/globals.css`.
5. Add a small route entry under `app/` when a new URL is needed.
6. Add backend controllers/services under `backend/src/modules/<feature>` if the feature needs persisted data or server rules.
