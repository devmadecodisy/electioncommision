# Election Monitoring App (scaffold)

This repository contains a scaffold for an election monitoring front-end built with Vite + React. It demonstrates component structure, routing, simple global state, local persistence, polling, and charting.

Quick start:

```powershell
cd election-app
npm install
npm run dev
```

Open http://localhost:5173 (or the port Vite chooses) after the dev server starts.

Environment / API
------------------
- This app supports two modes:
  - Development/mock mode (default): uses `src/data/mockData.json` and local service wrapper.
  - Remote API mode: set `VITE_API_URL` to your backend base URL (see `.env.example`). When set, the app will call `/races` and `/races/:id` on that host.

Notes on integrating a real backend:
- Ensure CORS is enabled on the backend for the origin serving the UI.
- The UI expects `GET /races` to return either an array of races or an object with a `races` array.
- For a single race, `GET /races/:id` should return the race object.

Files of interest:
- `src/services/api.js` — switch between mock and real API.
- `src/data/mockData.json` — demo data used when `VITE_API_URL` is unset.

Customization & Deployment
--------------------------
- Add or replace components in `src/components` and pages in `src/pages`.
- Build for production and deploy the `dist` folder to Netlify, Vercel, or GitHub Pages.

Deployment automation
---------------------

GitHub Pages (automated):
- This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the app and deploys the `dist` folder to GitHub Pages when you push to the `main` branch.
- To use it, push this repository to GitHub and ensure the default branch is `main` (or adjust the workflow). GitHub Actions will run and publish to the `gh-pages` branch automatically.

Netlify:
- A `netlify.toml` file is included. To deploy to Netlify, connect your repository in the Netlify UI and set the build command to `npm run build` and the publish directory to `dist`.

Vercel:
- You can deploy to Vercel directly by connecting the repository; Vercel will detect a Vite project and run `npm run build`.

Setting a production API URL
----------------------------
- If you have a backend, copy `.env.example` to `.env` and set `VITE_API_URL` to your API base URL before building.


Environment example
-------------------
Copy `.env.example` to `.env` and update `VITE_API_URL` for deployments.

License & notes
---------------
This is a demo scaffold intended for learning and rapid prototyping.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
