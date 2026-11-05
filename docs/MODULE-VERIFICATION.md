# Module refactor verification

- Applications moved from apps/web and apps/api to frontend and backend.
- Backend environment hash checked unchanged during migration; database and uploads moved with the backend.
- Original frontend source retained under work/backups (ignored by Git).
- Frontend/backend type checks and production builds passed.
- All 16 automated validation/API integration checks passed.
- Browser: shared ReserveButton opened the enquiry dialog; form submission returned a reference; the same record appeared in the extracted admin inbox; admin login and settings panel worked; public gallery filtering and Next photo action worked.
- Temporary browser-test enquiry removed by its exact test ID and test email.
- Backend automatic TypeScript compilation/restart verified after a temporary comment-only source change (then restored).
- No old apps/web, apps/api or frontend feature import paths remain in active source.
