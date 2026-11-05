# Architecture and maintenance

## Request flow

Browser → Next.js web application → `/api/v1` proxy → NestJS modules → database adapter.

Guest pages fetch current public settings and cabanas on the server with caching disabled. Browser interactions use relative API URLs. Admin credentials and database access never enter the frontend bundle. The original image assets are local to the web application; uploaded images are served by the API and proxied through the frontend.

## Frontend boundaries

- `src/app`: URL routing, metadata and page composition.
- `modules/home`: stay search and experiences accordion.
- `modules/cabanas`: reusable collection cards.
- `modules/booking`: shared enquiry dialog, validation and submission state.
- `modules/gallery`: category filters and lightbox.
- `modules/admin`: admin login and management screens.
- `components`: navigation, footer, brand mark and native-dialog wrapper.
- `lib/api.ts`: browser API transport; `lib/data.ts`: server-side public data reads.
- `modules/*/styles/`: each module owns its desktop/mobile styles; `shared/styles/base.css` holds common styles.

## Backend boundaries

- `auth`: password verification, temporary opaque sessions, request guard, login throttling.
- `cabanas`: public collection and protected content mutations.
- `content`: site settings, contact details and gallery content.
- `enquiries`: validated, rate-limited booking requests and protected inbox/status operations.
- `media`: authenticated JPG/PNG/WebP uploads with MIME/signature and size validation.
- `database`: parameterized storage operations; SQLite local adapter, optional PostgreSQL adapter, initial additive migration.

Controllers receive requests; services own domain behavior; database access is isolated. Shared contracts validate both browser inputs and server requests. No module bypasses authentication for admin writes.

## Frequent changes

| Change                                        | Where                                                     |
| --------------------------------------------- | --------------------------------------------------------- |
| Rates, amenities, room copy                   | Admin → Cabanas                                           |
| Brand, hero text, story, contact and WhatsApp | Admin → Settings                                          |
| Gallery uploads and captions                  | Admin → Gallery                                           |
| Theme colours/fonts/spacing                   | `frontend/src/shared/styles/base.css` tokens              |
| Cabana card layout                            | `frontend/src/modules/cabanas/components/cabana-card.tsx` |
| Booking validation                            | `packages/contracts/index.js`                             |
| Guest capacity/business rules                 | `backend/src/modules/enquiries`                           |
| Storage provider                              | Database/media adapters                                   |

After saving content, reload guest pages to get the current API data. No deployment is needed for content edits.

## Release and emergency changes

1. Commit or back up the working source. Keep secrets and database/uploads outside Git.
2. Implement the feature in its owning module and update shared contracts compatibly.
3. Run type checks and relevant tests, then build. Preview on staging with a separate database.
4. Back up production data before schema changes. Review additive migrations; perform destructive changes as a separate planned operation.
5. Deploy frontend/API versions with compatible contracts. Keep the previous built release for application rollback.

Application rollback does not undo a data migration. Restore or forward-fix data intentionally. For live inventory in a later release, implement per-unit date-range conflict protection and transaction-safe reservation state transitions. Payment confirmation must use verified, idempotent provider callbacks, never only a browser success page.

## Limits of this local release

SQLite is used and tested locally. PostgreSQL, hosted backups, distributed rate limits, object storage, email delivery, live availability, instant reservations and payments are not provisioned. Admin sessions are in memory and expire after eight hours or an API restart. Rate limits are per API instance. Frontend public pages fall back to sample seed content if the API is unavailable; enquiry submission reports the error rather than pretending to save.
