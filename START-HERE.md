# Frontend / Backend — Start here

## One-command launch

From any PowerShell terminal, run:

```powershell
& "D:\projects\cabana\run.cmd"
```

This starts both applications when needed, waits for both to respond, prints the correct Website/Admin links, then opens the website in your default browser. If both are already running, it reuses them. From the project root, `npm run open` does the same thing. Keep the server terminal open while using the website.


Frontend: `D:\projects\cabana\frontend`
Backend: `D:\projects\cabana\backend`

Read `docs/MODULE-GUIDE.md` for the exact files to edit.

The most common changes:

- Button name: `frontend/src/modules/booking/config/labels.ts`
- Reservation button click: `frontend/src/modules/booking/hooks/use-reserve-stay.ts`
- Button appearance: `frontend/src/modules/booking/components/reserve-button.tsx`
- Booking form submit: `frontend/src/modules/booking/hooks/use-booking-form.ts`
- Menu names and links: `frontend/src/modules/navigation/config/navigation.ts`
- Admin actions: `frontend/src/modules/admin/hooks/use-admin-dashboard.ts`
- Backend booking rules: `backend/src/modules/enquiries`

Run from the root:

`npm run dev:frontend` — frontend only, port 3000
`npm run dev:backend` — backend only, port 4000, automatic TypeScript rebuild/restart
`npm run dev` — both

Each frontend module separates config, components, hooks, services and styles as needed. Each backend module separates controller, service and module registration. Database, uploads and the existing admin credentials were preserved.
