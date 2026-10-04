# Kristel Ann & Francis Jouvien: wedding invitation (React + Vite)

Same design as the original site, rebuilt in React.

## Run locally
    npm install
    npm run dev

## Deploy
**Vercel:** import the repo. Framework preset "Vite" is detected automatically.
**Netlify:** build command `npm run build`, publish directory `dist`.

## Where to edit things
- `src/config.js`: all names, dates, venues, timeline, entourage, gifts, FAQ.
- `src/styles.css`: your original stylesheet, unchanged, plus a small `.map` rule.

## Embedded maps
In `src/config.js`, fill in `mapQuery` for `ceremony` and `reception`
(e.g. `"Venue name, City"`). The map appears automatically; while it is empty only
the "See location" button is shown.

## What changed from the original
- Service worker is now `public/sw.js` (lowercase), so it loads on case-sensitive hosts.
  Cache name bumped to `invite-v2`.
- The personal email address was removed from the page code. If the Formspree request
  fails, guests now see a clear error with a retry instead of an email app popup.
- RSVP replies still go through your existing Formspree form. To use a different one,
  set `VITE_FORMSPREE_ENDPOINT` in Vercel/Netlify environment variables.
