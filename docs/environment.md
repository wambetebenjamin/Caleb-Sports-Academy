# Environment variable inventory

The source archive declares no environment variables. These are introduced by the Next.js application. `.env.example` contains configuration placeholders, not credentials. `NODE_ENV` is framework-managed; all other names are documented in that example. NEXT_PUBLIC values are public at build time. Never place secrets in them.

- `ACADEMY_EMAIL`
- `COACH_PASSWORD_HASH`
- `COACH_SESSION_SECRET`
- `KV_REST_API_TOKEN`
- `KV_REST_API_URL`
- `NEXT_PUBLIC_MAP_EMBED_URL`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NODE_ENV`
- `PARTNERSHIPS_WHATSAPP`
- `RECAPTCHA_ALLOWED_HOSTNAMES`
- `RECAPTCHA_SECRET_KEY`
- `RECAPTCHA_V2_SECRET_KEY`
- `SITE_LAUNCH_READY`
- `SMTP_FROM`
- `SMTP_HOST`
- `SMTP_PASSWORD`
- `SMTP_PORT`
- `SMTP_USER`
- `TRAINING_DIRECTIONS`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_TEMPLATE_NAME`

This sandbox cannot reach Google CAPTCHA, Meta WhatsApp, SMTP or arbitrary Redis services through its outbound allowlist. Live delivery and persistence must be tested in the configured deployment environment. Set NEXT_PUBLIC_SITE_URL to the exact public origin; for a configured preview, use its HTTPS preview origin, not localhost. List the preview hostname separately in CAPTCHA settings if testing there.
