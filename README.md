# Pranav More - Portfolio

React + Vite + GSAP. Dark glassmorphism theme and a clean light theme, with a toggle in the navbar.

## Run locally
```bash
npm install
npm run dev
```

## Contact form (sends straight to pranavmore2811@gmail.com)
By default the form uses FormSubmit (no key). **One-time activation:** the first message sent makes
FormSubmit email you an "Activate Form" link. Click it (check Spam), then send again. If the form is not
activated, the site shows a toast telling you so.

If you prefer no activation step, use Web3Forms instead:
1. Get a free key at https://web3forms.com using pranavmore2811@gmail.com.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=your_key`.
3. On Vercel/Netlify, add the same variable in the project's environment settings, then redeploy.

## Edit your content
All text, links and projects are in `src/data.js`.

## Deploy
`npm run build` creates `dist/`. Drag it to Netlify, or connect the repo to Vercel.
# Pranav-Portfolio
