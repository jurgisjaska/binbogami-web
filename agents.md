

## Project Context
- **Language**: JavaScript (ES6+)
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite (Server Port: 8191, Alias: `@` -> `src/`)
- **State Management**: Pinia
- **Styling**: Bootstrap 5 & Tabler (SCSS)
- **Dashboard Template**: https://tabler.io/dashboard
- **Icon Libraries**: Font Awesome 6 (`@fortawesome/fontawesome-free`) & Tabler Icons (`@tabler/icons-webfont`)

## Project Structure
- `public/`: Static assets served directly
- `src/`: Core source files
  - `api/`: Axios API client instances (`app.js`, `auth.js`) with request/response interceptors
  - `assets/`: SCSS (`main.scss`), SVGs, and images
  - `components/`: Reusable UI components organized by feature (`book/`, `card/`, `forms/`, `pagination/`)
  - `layouts/`: Page layouts (`DashboardLayout.vue`, `AuthLayout.vue`, `DefaultLayout.vue`, `ErrorLayout.vue`)
  - `routers/`: Router configuration, modularly split (`auth.js`, `book.js`, `category.js`, `error.js`, `user.js`, `index.js`)
  - `stores/`: Pinia state management stores (`token.js`, `user.js`)
  - `views/`: Feature pages organized by folder (`auth/`, `book/`, `category/`, `error/`, `user/`)
- `index.html`: Main HTML entry point
- `.env.example`: Environment variables template (`VITE_APP_URL`, `VITE_AUTH_SERVICE_URL`)
- `package.json`: Project scripts and dependencies

## API & State Management
- **Backend API Repository**: https://github.com/jurgisjaska/binbogami
- **API Clients**: Dual Axios clients (`appApi` and `authApi`) created in `@/api` and injected globally in `main.js` via `app.provide()`.
- **Interceptors**:
  - `appApi` attaches `Bearer` token to request headers for `v1/` routes.
  - 401 responses automatically clear `token` and `user` stores and redirect to `/signin`.
  - 500+ status codes redirect to the `error_500` route.
- **State & Storage**:
  - `useTokenStore`: Decodes JWT tokens via `jwt-decode` and syncs with `localStorage['binbogami_token']`.
  - `useUserStore`: Stores user profile details and syncs with `localStorage['binbogami_user']`.

## Development Workflow
- **Development Server**: Run `npm run dev` to start the local Vite server (default port 8191).
- **Production Build**: Run `npm run build` to build the app for production.
- **Preview Build**: Run `npm run preview` to locally preview the production build.
- **Linting**: Run `npm run lint` to lint and auto-fix code style issues using ESLint.
- **Formatting**: Run `npm run format` to format files in the `src/` directory using Prettier.

## Coding Standards
- **Composition API**: Always use Vue 3 Composition API style with `<script setup>`.
- **Dynamic Layouts**:
  - Page layouts are resolved dynamically in `App.vue` via route meta (`meta.layout`).
  - When adding new routes, specify the appropriate layout component (e.g., `DashboardLayout`, `AuthLayout`, or `DefaultLayout`) in the route's `meta.layout` property.
- **Component Naming**:
  - Views should be named using PascalCase with a `View` suffix (e.g., `SettingsView.vue`, `BooksView.vue`).
  - Layouts should be named using PascalCase with a `Layout` suffix (e.g., `AuthLayout.vue`).
  - Reusable components should be named using PascalCase (e.g., `Navigation.vue`, `BookForm.vue`).
- **Store Naming**:
  - Follow the convention `use[Name]Store` for Pinia store hooks (e.g., `useUserStore`, `useTokenStore`).
- **Styling**:
  - Prefer using Bootstrap 5 and Tabler helper utility classes in markup.
  - Keep custom styles scoped inside components `<style scoped>` or in `@/assets/main.scss`.

## Agent Instructions
- Verify changes by running `npm run lint` and `npm run build` when making significant edits.
- Keep components focused and reusable.
- Follow the existing API integration pattern using the shared Axios clients in `@/api`.
- Keep commit messages concise and descriptive, do not use prefixes.
