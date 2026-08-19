# Wanderlust and Sigma 5 development projects

This repository contains the course's full-stack Wanderlust application and
the standalone frontend projects built in the later React, Tailwind, and Redux
modules.

## Wanderlust features

- MVC controllers and modular Express routers
- MongoDB/Mongoose listings, users, and reviews
- Passport signup, login, logout, and post-login redirects
- Listing-owner and review-author authorization
- Joi request validation and centralized error handling
- Cloudinary image upload, replacement, and deletion
- Mapbox geocoding, markers, and popups
- Search, category UI, tax display switch, and responsive layouts
- Mongo-backed production sessions and Render deployment configuration

## Local setup

1. Install Node.js and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and provide the service credentials.
4. Start MongoDB.
5. Run `npm start` and open <http://127.0.0.1:8080/listings>.

Cloudinary credentials are required only when uploading a new image. A Mapbox
token enables geocoding and the interactive map; without one, the app displays
a safe map placeholder. `MONGO_URL` defaults to the local `wanderlust` database
in development.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGO_URL` | Local MongoDB or MongoDB Atlas connection string |
| `SECRET` | Session encryption/signing secret |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Public Mapbox access token |
| `NODE_ENV` | Set to `production` when deployed |
| `SEED_USERNAME` | Development owner created/reused by `npm run seed` |
| `SEED_PASSWORD` | Password used only when that development owner is created |

Never commit `.env`; it is ignored by Git.

The seed command is intentionally disabled in production. In development it
creates or reuses the account configured by `SEED_USERNAME` and
`SEED_PASSWORD`, then assigns every seeded listing to that owner.

## Commands

- `npm start` — run Wanderlust
- `npm run seed` — replace local listing/review data with the course seed data
- `npm test` — run automated checks
- `npm run build:projects` — production-build every frontend project
- `npm run dev --workspace react-labs` — run the React concepts lab
- `npm run dev --workspace weather-app` — run the Material UI weather app
- `npm run dev --workspace tailwind-card` — run the Tailwind card project
- `npm run dev --workspace redux-todo` — run the Redux Toolkit Todo app

## Frontend course deliverables

- `projects/react-labs` covers JSX, components, props, arrays, conditionals,
  events, state, Todo updates, the Lottery game, controlled forms,
  validation, and effects.
- `projects/weather-app` is the React major project using Material UI and the
  OpenWeather API. Copy its `.env.example` to `.env` and provide an API key.
- `projects/tailwind-card` covers the Tailwind CLI/Vite flow, typography,
  colors, spacing, breakpoints, responsive states, and `@apply` components.
- `projects/redux-todo` covers store configuration, slices, reducers,
  `Provider`, `useSelector`, and dispatched add/toggle/delete actions.

## Deployment

`render.yaml` defines the web service. Connect the GitHub repository in Render
and enter the secret environment variables when prompted. Use a MongoDB Atlas
URL for `MONGO_URL` in production.
