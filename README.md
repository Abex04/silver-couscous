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

.
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

# Maraki — Creative Web Design & Development

Maraki is a minimal, dark-themed single-page site template intended for small web studios and freelancers. It provides a clean marketing landing page with service descriptions, pricing, and an approachable contact flow.

This repository is structured as a static site that can be deployed to GitHub Pages, Vercel, Netlify, or any static host.

---

## Key features

- Responsive, accessible single-page layout with a modern dark theme
- Lottie-powered hero animation with an SVG noscript fallback
- Pricing cards that prefill the contact form for fast lead capture
- Accessible testimonial slider with keyboard controls and reduced-motion support
- Mailto-based contact form (client-side) with optional serverless examples for SendGrid
- Favicon generation script to produce PNG/ICO fallbacks from an SVG source

---

## Tech stack

- HTML5, CSS (single stylesheet), and vanilla JavaScript
- Lottie (LottieFiles player) for the hero animation
- Node.js used for development tasks (favicons generation)

---

## Getting started

Clone the repository:

```bash
git clone https://github.com/Abex04/silver-couscous.git
cd silver-couscous
```

Preview locally with a static server (Python 3 example):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Optional: install Node dev dependencies and generate favicons:

```bash
npm install
npm run gen:favicons
```

The favicon script reads `favicon.svg` and creates `favicon-32.png`, `favicon-16.png`, and `favicon.ico`.


This repository includes example serverless functions demonstrating how to accept form data and send email using SendGrid:

- `api/send-email.js` (Vercel-style serverless function)
- `netlify/functions/send-email.js` (Netlify function)

These examples expect the following environment variables when deployed:

- `SENDGRID_API_KEY`
- `SENDER_EMAIL`
- `RECEIVER_EMAIL`

Important: Do not commit real API keys or `.env` files to source control. Configure secrets using your host's environment settings.


## Contributing

Contributions are welcome. Recommended workflow:

1. Fork the repository
2. Create a branch (`git checkout -b feat/your-change`)
3. Commit changes with clear messages
4. Open a pull request

---

## License

This project is provided under the MIT License. Add a `LICENSE` file to set the project license.




## Author / Contact

Maraki — Web Design & Development
- Email: abebemihiretu217@gmail.com
  

 
