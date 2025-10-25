# TODO: Fix Products Page Issues on Vercel and GitHub Pages

## Information Gathered

- The app fetches product data via Next.js API routes that proxy to a Google Sheets API.
- On Vercel, API routes work but may fail if the GOOGLE_SHEET_API env var is not set, leading to "Tidak ada data."
- On GitHub Pages (static export), API routes don't function, causing fetches to fail and show empty data or 404 if URL is incorrect (/product vs /products).
- The Google Sheets API URL is: https://script.google.com/macros/s/AKfycbzfTBEMjaREyNxPSnMbF8qzr8f9LLkNOGb9KzJ2YOaGbwUz63ujLWiyCqg3xeiRDZVt/exec
- To fix, move data fetching to client-side using a public environment variable (NEXT_PUBLIC_GOOGLE_SHEET_API), allowing direct browser fetches on both platforms.
- Assumes the Google Apps Script allows public access with CORS enabled for GET/POST/PUT/DELETE.

## Plan

- [x] Update lib/api/products.ts to use process.env.NEXT_PUBLIC_GOOGLE_SHEET_API for direct client-side fetches.
- [x] Remove app/api/products/route.ts as API routes are no longer needed.
- [x] Add NEXT_PUBLIC_GOOGLE_SHEET_API to .env.local.
- [x] Ensure next.config.ts handles basePath for GitHub Pages (/xyzstore).
- [x] Inform user about correct GitHub Pages URL (/xyzstore/products, not /product).
- [x] Update package.json scripts to remove deprecated next export.
- [x] Build for both GitHub Pages and Vercel successfully.

## Dependent Files to be Edited

- lib/api/products.ts: Change BASE_URL to the public env var.
- app/api/products/route.ts: Delete the file.
- .env.local: Add the public env var.

## Followup Steps

- [x] Build and deploy to Vercel and GitHub Pages.
- [ ] Test the /products page on both platforms.
- [ ] Verify CORS and access in Google Apps Script if issues persist.
- [ ] Update user on correct URLs if needed.
