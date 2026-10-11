# Caleb Sports Academy

A Next.js adaptation of the supplied **Sportz** archive, not a new visual direction. The source ZIP and completely extracted source are retained. Original Bootstrap and Sportz CSS and icon fonts are served unchanged; Mukta is self-hosted. The academy extension keeps the red/black palette, black-backed photographic hero, rectangular controls, grid layouts and charcoal footer.

## Preview, not launch-ready

**Do not add live child data or publicly deploy this pinned build yet.** The explicitly requested **Next.js 15.3.3** has critical security advisories. `docs/dependency-audit.json` records the current audit (one critical and two high dependency entries, all in the Next dependency tree). Authorise a patched Next release, regenerate the lock, rebuild, and re-audit before launch. The sandbox preview has no real credentials or athlete records.

Also required: review of photo personality/privacy rights for the intended promotional use; confirmed academy address, roster, schedules, fees, results and policies; legal/safeguarding review; deployment integration credentials; successful live end-to-end tests. "Website 41" was not supplied. Its exact dependency list and voice implementation could not be cloned.

## Run

```sh
nvm install
nvm use
npm ci
npm run dev
# Or:
npm run build
npm start
```

Node `.nvmrc`: **24.3.0**, engine `>=24.0.0`; Next **15.3.3**; React/React DOM **19.1.0**. All additional packages are exactly pinned. In this sandbox the Node 24 executable is available via `npm exec --yes --package=node@24.3.0 -- node ...`; production build and final automated tests were run with Node 24.3.0.

Dev and production servers bind to `0.0.0.0`. Browser requests use relative API URLs. There is no second browser-facing backend or localhost URL in client code. `next.config.mjs` permits the Arena preview host for development.

## Implemented

- Responsive academy home adapted from the source; sticky navigation, full-screen mobile dialog, sports cards, programme detail pages, scholarship and sponsorship pages, contact and coach applications.
- Five-step booking, server-rendered real availability, same-origin API, server validation, guardian consent, atomic slot capacity decrement and UUID retry deduplication.
- Server-side reCAPTCHA v3 verification (action, timestamp, hostname and score); v2 checkbox fallback below 0.5; all six public submission forms covered.
- KV persistence and SMTP / approved-template WhatsApp adapters. Missing services fail closed and no fake success is returned. Failed notifications do not roll back saved bookings; the UI explicitly reports delivery limitations.
- Signed, expiring HTTP-only coach sessions; protected performance CRUD; sport-specific metrics; Recharts trends; print-to-PDF scouting export with an explicit authorisation reminder. This is a minimal single coach-credential system, not a staff identity-management platform.
- Gallery filters and native-dialog lightbox; approved-events feed and result archive; four trusted local MDX articles.
- Local-storage consent with Necessary/Functional/Analytics/Marketing categories; native modal focus management; necessary-only option; no optional trackers installed.
- Local browser speech-synthesis tour with the exact supplied script; 56px floating control; first scroll/click attempt and explicit playback fallback. Browser autoplay restrictions can prevent automatic audio. This is not a recorded human narration and cannot be asserted to match Website 41.
- Short runner loading animation, reduced-motion alternative, custom 404 and 500, three draft legal policies, WhatsApp enquiry link.
- Course, LocalBusiness/SportsActivityLocation and published-event structured data; article/programme Open Graph; sitemap; noindex launch gate; 3600-second programme/home ISR, SSR booking and tracker; Vercel security headers.

## Deliberately not fabricated

No invented coach identities/qualifications, alumni placements, customer quotes, real tournament results, venue map, or athlete records. Sections explain what is awaiting verification. Fees/timetables and sponsorship tiers are **explicitly indicative**, not authorised commercial terms. The six public sports programmes do not pretend to verify the brief's eight-discipline statistic. The impact strip is marked unverified. Gallery/hero images now use credited, watermark-free internet photography: Kenyan community football and a Kenyan marathon runner, Ugandan volleyball, a Kigali pool, and Pexels equipment still lifes. They are not academy athletes or venues; see `image-credits.md` and `/image-credits`.

Coach photo cards, real testimonials, scholarship recipient stories, verified video gallery and venue-specific map await supplied/approved content. Scouting export uses the browser's **Save as PDF** flow, not a pre-generated PDF attachment. No social media account URLs are invented. Email/WhatsApp delivery, CAPTCHA challenges, authenticated KV CRUD, concurrency and notification failures require integration tests against real or controlled staging services.

## Configuration and deployment

1. Resolve the security version gate above.
2. Copy `.env.example` to `.env.local` for local configuration, or configure variables in the deployment platform. Never commit secrets. See `docs/environment.md` for every variable name.
3. Configure a Redis REST integration compatible with `@vercel/kv`. Vercel KV is deprecated for new projects; existing stores migrated to Upstash. This implementation keeps the requested Vercel KV interface. Review the provider’s region, data-processing agreement, encryption and retention arrangements.
4. Configure v3 and v2 site/secret pairs and allowed hostnames. Set `RECAPTCHA_ALLOWED_HOSTNAMES` to a comma-separated exact hostname list, and register those hostnames with Google. Keep `NEXT_PUBLIC_SITE_URL` equal to the deployment's exact origin for CSRF checks and metadata.
5. Set SMTP credentials, a verified sender and `ACADEMY_EMAIL`. Set approved WhatsApp template credentials, international-format recipient phone numbers, and `PARTNERSHIPS_WHATSAPP`. The WhatsApp template must accept **two text body parameters: reference ID and submission type**. Outbound business messages require Meta approval and appropriate recipient permission; the `wa.me` link alone cannot send confirmations.
6. Generate a strong coach password hash by sending a password from a secure password manager to `scripts/hash-coach-password.mjs` via stdin. Store only the returned `salt:hash` in `COACH_PASSWORD_HASH`. Set a separate cryptographically random `COACH_SESSION_SECRET` of at least 32 characters. Rotate the session secret to revoke all sessions. A production multi-coach rollout should add individual accounts, MFA, access audit and revocation.
7. Seed only approved available sessions using `node --env-file=.env.local scripts/seed-availability.mjs approved-slots.json`. Schema is documented below. Do not reset existing capacity after bookings.
8. Verify all notifications end-to-end, race-test booking reservations, test privacy access controls and v2 fallback, and establish staff follow-up / delivery retry procedures. Notification results are stored in `notification-status`; an automatic retry worker is **not** implemented.
9. Confirm privacy contact, guardian authority checks, legal terms, separate media consent, safeguarding, retention/deletion workflows, international-transfer safeguards and incident response with Kenyan counsel. A website checkbox alone does not certify compliance with the Kenya Data Protection Act 2019.
10. Review licensed photo usage and approve content; configure `NEXT_PUBLIC_MAP_EMBED_URL` to a verified Google Maps embed URL. Map loading remains explicit user action. Only after review set `SITE_LAUNCH_READY=true` and rebuild. Vercel's runtime may supply its currently supported Node 24 patch rather than the exact local `.nvmrc` patch.

## KV model

- `availability:ids`: set of slot IDs.
- `slot:<id>`: JSON `{id, sport, ageGroup, startsAt, endsAt, remaining}`. `sport` is a programme slug; `ageGroup` is `6–9`, `10–13` or `14–18` (en dash). Dates are ISO 8601 with offset; UI displays Africa/Nairobi. Each slot must be a future, approved session.
- `booking:<uuid>`: private booking and consent record, plus selected session time. Atomic Lua operation saves and decrements remaining places.
- `scholarship:<uuid>`, `sponsor:<uuid>`, `contact:<uuid>`, `newsletter:<uuid>`, `coach-application:<uuid>`: private validated submissions.
- `performance:<internal-athlete-id>`: hash of session UUID → private JSON record. Accessible only through coach-authenticated APIs; never published in sitemap, JSON-LD or public API responses.
- `events:public`: approved event array `{id,name,sport,date,venue,ageCategory,entryFee,result?}`. Only those whitelisted fields are exposed. Do not put child records here.
- `notification-status`: hash of submission reference → delivery state; staff must follow up failures.
- `rate:<scope>:<HMAC-IP>:<minute>`: abuse prevention counters, 120-second expiry. Deployment must supply trusted forwarding headers. Distributed public API requests are limited to 12 per minute per scope and hashed IP.

Staff inspection/deletion of submission records currently uses the private provider console or an approved operator workflow. There is no public admin/list-all-bookings route. Establish access and retention policy before enabling live forms.

## API routes

Implemented by the App Router catch-all in `app/api/[...path]/route.js`:

| Route | Methods | Access |
|---|---|---|
| `/api/availability` | GET | Whitelisted future slot data only |
| `/api/booking` | POST | CAPTCHA + guardian consent + validation |
| `/api/scholarship` | POST | CAPTCHA + guardian consent + validation |
| `/api/sponsor` | POST | CAPTCHA + consent + validation |
| `/api/coach-application` | POST | CAPTCHA + consent + validation |
| `/api/contact` | POST | CAPTCHA + consent + validation |
| `/api/newsletter` | POST | CAPTCHA + adult newsletter consent |
| `/api/captcha` | POST | Same-origin, rate-limited verification; not a reusable bypass token |
| `/api/events` | GET | Approved public fields only |
| `/api/blog` | GET | Public article metadata; `?slug=` returns whitelisted local MDX |
| `/api/tracker` | GET, POST, PATCH, DELETE | Coach session required on every operation |
| `/api/auth/login` | POST | Rate-limited password verification |
| `/api/auth/logout` | POST | Same-origin cookie removal |

All submission routes independently reverify CAPTCHA, even if `/api/captcha` was called separately. Do not submit a v3 token to both endpoints: Google tokens are single-use. The forms call the submission endpoint directly. Public API responses do not return athlete data. UUID request IDs deduplicate retries. No real data is seeded by default.

## Verification

```sh
npm test
# While the production server is running:
TEST_BASE_URL=http://localhost:3000 npm test
```

- Production build passed on Node 24.3.0.
- 50 automated checks passed: 11 validation tests, 36 HTTP/access/route tests and 3 image provenance/asset tests. Without TEST_BASE_URL, HTTP tests are skipped.
- Chromium: no horizontal overflow at 1440, 1024, 768, 390 and 320 on home; all main forms, legal/article/programme detail and tracker tested at 320.
- Chromium: mobile navigation, cookie persistence/preferences, gallery lightbox, guarded tracker, no-slot state and all five booking steps passed. Booking steps used **browser-intercepted synthetic availability**, not a real KV booking. Unconfigured CAPTCHA correctly blocks final submission. No browser page errors observed.
- Live third-party integrations were not tested: keys are absent and external hosts are restricted in this sandbox.

See `docs/inventory.md`, `docs/source-manifest.json`, `docs/package-versions.md`, `docs/environment.md`, `docs/dependency-audit.json`, and `image-credits.md` for provenance and launch gates.
