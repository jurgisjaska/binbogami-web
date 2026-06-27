# Agents

## Project Context
- **Language**: JavaScript (ES6+)
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Bootstrap 5 & Tabler Core (SCSS)
- **Project Name**: Binbogami Web

## Project Structure
- `public/`: Static assets served directly
- `src/`: Core source files
  - `api.js`: Axios API client instance with interceptors for token management
  - `asset/`: SCSS and styling assets
  - `component/`: Reusable UI components (e.g., `Navigation.vue`)
  - `layout/`: Page layouts (e.g., `DashboardLayout.vue`, `AuthLayout.vue`)
  - `router/`: Router configuration, modularly split (e.g., `auth.js`, `user.js`)
  - `store/`: Pinia state management stores (e.g., `token.js`, `user.js`)
  - `view/`: Pages/views organized by feature folders (e.g., `auth/`, `user/`, `book/`)
- `index.html`: Main HTML entry point
- `package.json`: Project scripts and dependencies

## Development Workflow
- **Development Server**: Run `npm run dev` to start the local Vite server.
- **Production Build**: Run `npm run build` to build the app for production.
- **Linting**: Run `npm run lint` to lint and auto-fix code style issues using ESLint.
- **Formatting**: Run `npm run format` to format files in the `src/` directory using Prettier.

## Coding Standards
- **Composition API**: Always use Vue 3 Composition API style with `<script setup>`.
- **Dynamic Layouts**:
  - Page layouts are resolved dynamically in [App.vue](file:///Users/jurgis/Develop/binbogami-web/src/App.vue) via route meta (`meta.layout`).
  - When adding new routes, specify the appropriate layout component (e.g., `DashboardLayout` or `DefaultLayout`) in the route's `meta.layout` property.
- **Component Naming**:
  - Views should be named using PascalCase with a `View` suffix (e.g., `SettingsView.vue`).
  - Layouts should be named using PascalCase with a `Layout` suffix (e.g., `AuthLayout.vue`).
  - Reusable components should be named using PascalCase (e.g., `Navigation.vue`).
- **Store Naming**:
  - Follow the convention `use[Name]Store` for Pinia store hooks (e.g., `useUserStore`, `useTokenStore`).
- **Styling**:
  - Prefer using Bootstrap 5 and Tabler helper utility classes in markup.
  - Keep custom styles scoped inside components `<style scoped>` or in `@/asset/main.scss`.

## Agent Instructions
- Verify changes by running `npm run lint` and `npm run build` when making significant edits.
- Keep components focused and reusable.
- Follow the existing API integration pattern using the shared Axios client in [api.js](file:///Users/jurgis/Develop/binbogami-web/src/api.js).
