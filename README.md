Maraki — Dark Themed Marketing Site

Files created:
- index.html — Main site HTML
- styles.css — Dark theme styles, responsive layout, animations
- script.js — Small interactions (nav toggle, sticky header, scroll reveal, contact form mailto)

How to preview locally:
1. Open the folder in any static server or simply open `index.html` in your browser.
   - For a simple local server (recommended), run (from the project folder):

     python -m http.server 8000

   Then open http://localhost:8000 in your browser.


Contact & form handling

A lightweight mailto-based contact form is available in the Contact section. Submitting the form opens the visitor's default email client with a prefilled subject and message (no data is sent to or stored by the website).

How it works
- Fields: name (required), your email (required), subject (recommended), message (required), and an optional hidden "package" field populated when a "Request This Package" button is clicked.
- On submit the front-end validates required fields, composes a subject and body, URL-encodes them, and opens a `mailto:` URL addressed to `abebe667@gmail.com`.
- If the composed `mailto:` link would be excessively long (some email clients limit URL length), the script warns the user to shorten the message or send an email directly to the address.

Limitations and notes
- This is client-side only and relies on the visitor's email client. It does not save inquiries to a server or CRM.
- For automated processing, deployment, or to receive form submissions without relying on the visitor's email client, consider deploying one of the example serverless functions included in the repo (Vercel/Netlify + SendGrid). I can help wire that up when you're ready.

Testing locally
- Open `index.html` in a browser and fill the Contact form. Clicking "Send via Email" will open your email client with the prefilled fields. If no native mail client is configured, the browser may try to open a webmail handler (or nothing will happen depending on the OS/browser configuration).

If you'd like, I can switch the form to a fallback that pre-fills a `mailto:` link in a visible text area (copy/paste) for users who can't open a client, or reintroduce server-side handling instead.

Note about mailto behavior
- The contact form opens the visitor's email client with a prefilled subject and body. If the visitor's environment doesn't have an email client configured, behavior depends on the OS/browser — it may open a webmail handler or do nothing.
- If a message is extremely long some email clients may not accept a very long `mailto:` URL; in that case the site will ask the visitor to shorten their message or send an email directly to the address.
 
Design polish done in this update:
- Added improved meta tags and a simple SVG favicon (`favicon.svg`).
- Polished hero spacing, subtle radial glow, and refined typography.
- Animated mobile nav overlay and hamburger icon with body-scroll lock for a cleaner mobile experience.
- Pricing card badge, refined buttons, focus outlines for accessibility, and improved form message styling.

Hero illustration:
- Added an optimized SVG hero at `assets/hero-illustration.svg` and integrated it into the hero section with a subtle parallax/tilt animation. The illustration is lightweight and designed to work well on mobile and desktop.
 
Lottie hero animation:
- I integrated a Lottie animation into the hero using the `lottie-player` web component. The player is loaded from the unpkg CDN and the current demo animation is set in the `src` attribute of the `<lottie-player>` element in `index.html`.

How to change the animation:
- Replace the `src` on the `<lottie-player id="heroLottie">` in `index.html` with the Lottie JSON URL you prefer (from LottieFiles or your hosted JSON). The code includes a `<noscript>` fallback that uses `assets/hero-illustration.svg` for browsers without JS.
- If you prefer not to use the CDN, you can host `lottie-player` locally or use `lottie-web` directly and render into a container.

Favicons
-------

The project includes an SVG favicon at `favicon.svg` which works on modern browsers. For maximum compatibility I added a small Node script that generates PNG and ICO fallbacks from the SVG.

To generate `favicon-32.png`, `favicon-16.png`, and `favicon.ico` locally:

1. Install the dev dependencies (requires Node.js and npm):

```bash
npm install --save-dev sharp png-to-ico
```

2. Run the generator script from the project root:

```bash
node scripts/generate-favicons.js
```

This will write `favicon-32.png`, `favicon-16.png`, and `favicon.ico` in the project root. `index.html` already contains link tags that point to these files as fallbacks for older browsers.

If you prefer I can generate the PNG/ICO files for you and add them directly to the repository — tell me and I'll create them and update the repo.

If you'd like more visual improvements, I can next:
- Add a high-quality hero illustration or designer mockup (SVG or image) and animate it subtly.
- Add micro-interactions (button hover transitions, card tilt on mouse) and lazy-loading of any future images.
 - Add a Clients & Testimonials section (I implemented a simple one already; feel free to supply real quotes and logos). The current testimonials and logos are placeholders I added so the homepage shows social proof. If you later provide real quotes and logo files I'll wire them in and optimize them.
 - Add a Clients & Testimonials section (I implemented a simple one already; feel free to supply real quotes and logos). The current testimonials and logos are placeholders I added so the homepage shows social proof. If you later provide real quotes and logo files I'll wire them in and optimize them.
 - The testimonial slider uses an accessible fade animation and respects users' "prefers-reduced-motion" setting.



## Features

- Modern dark UI with orange accent
- Responsive layout, mobile-first styles
- Lottie animated hero (CDN) with SVG noscript fallback
- Pricing cards with package selection that pre-fills contact subject
- Accessible testimonial slider (respects prefers-reduced-motion)
- Mailto-based contact form (opens user's mail client)
- Favicon generator script to create PNG/ICO fallbacks from the SVG source
- Example serverless email functions (Vercel / Netlify) included as optional references

---

## Quick start (preview locally)

1. Clone the repository or copy the files to your machine.
2. From the project root run a static server (recommended):

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

3. Or open `index.html` directly in your browser.

Notes:
- The hero animation loads from the LottieFiles CDN. If you prefer no external runtime, replace the `<lottie-player>` with a static SVG or self-host the player.

---

## Dev scripts

- Regenerate favicons (requires Node.js and dev deps):

```bash
npm install --save-dev sharp png-to-ico
npm run gen:favicons
```

This produces `favicon-32.png`, `favicon-16.png` and `favicon.ico` from `favicon.svg`.

- Other scripts:
  - `npm run dev` — (optional) run platform-specific dev mode (e.g., `vercel dev` if you use Vercel). The project is primarily static and can be served with any static host.

---

## Favicon & assets

- Source SVG: `favicon.svg`
- Generated fallbacks: `favicon-32.png`, `favicon-16.png`, `favicon.ico` (checked into the project for compatibility)

If you update `favicon.svg`, re-run the `gen:favicons` script to regenerate PNG/ICO fallbacks.

## Serverless email examples (optional)

This repo includes example serverless functions demonstrating how to accept form data and send email via SendGrid:

- `api/send-email.js` — example for Vercel-style serverless functions
- `netlify/functions/send-email.js` — Netlify function example

Important:
- These examples read configuration from environment variables (`SENDGRID_API_KEY`, `SENDER_EMAIL`, `RECEIVER_EMAIL`). DO NOT commit real keys to the repo. Use your deployment platform's environment variable settings.
- The provided examples validate input and include a simple honeypot check (`_honey`) to reduce spam.

To enable server-side handling:
1. Add your SendGrid API key and emails to environment variables on your host (Vercel/Netlify).
2. Update the front-end to POST to the deployed function endpoint (the examples currently exist for reference).

---

## Accessibility

- The site respects `prefers-reduced-motion` and includes ARIA attributes for navigation and the testimonial slider.
- Form fields include required state and inline error messaging.

Consider running an accessibility audit (axe, Lighthouse) and testing with screen readers for additional coverage.

---

## Deployment recommendations

- Static hosting (fast & simple): Vercel, Netlify, GitHub Pages, or any static host.
- If you deploy to Vercel/Netlify and keep the `api/` or `netlify/functions/` folders, the example functions may be deployed as serverless endpoints — only keep them if you intend to use them or move them to an `examples/` folder.

Suggested steps to deploy to Vercel:
1. Create a new Vercel project from this repo.
2. Add environment variables (if you plan to use the serverless function): `SENDGRID_API_KEY`, `SENDER_EMAIL`, `RECEIVER_EMAIL`.
3. Deploy — Vercel will serve the static site and any `api/` functions.

---

## Tests & checks before publishing

- Manual device checks (important): phone tel: links, mailto behavior, Lottie loading on mobile
- Cross-browser sanity: Chrome, Firefox, Edge, Safari
- Run Lighthouse audit for performance/accessibility/SEO

---

## Contributing

Small contributions, fixes, and suggestions are welcome. If you'd like me to help with deployment, analytics, or serverless wiring I can prepare those changes.

When contributing:
- Follow the existing code style (vanilla HTML/CSS/JS)
- Keep the site static unless adding a clear server-side feature and documenting env vars

---

## License

This project is provided as-is. If you want a license added (MIT, Apache, etc.), tell me and I'll add it.

---

## Author / Contact

Maraki — Web Design & Development
- Email: abebemihiretu217@gmail.com
  

 
