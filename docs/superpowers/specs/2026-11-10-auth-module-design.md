# Auth Module Design

## Intent

Convert the static login, registration, and password-reset pages into a cohesive React authentication module for the Vite frontend connected to Spring Boot microservices.

## Goals

- Keep authentication code under `src/modules/auth`.
- Preserve the supplied visual design and client-side validation.
- Use controlled React inputs and JSX-safe markup.
- Call the existing Axios API client through an auth service.
- Persist returned authentication tokens in browser storage.
- Route authenticated users by `user.role` with React Router navigation.

## Non-goals

- Implement the `/admin`, `/instructor`, or `/student` feature modules.
- Change backend contracts or authentication policy.
- Add unrelated application modules.

## Constraints

- Registration sends `email`, `password`, `fullName`, and one of `ADMIN`, `INSTRUCTOR`, or `STUDENT` as `role`.
- Login calls `authService.login(credentials)` and maps roles to `/admin`, `/instructor`, or `/student`.
- Password reset calls `/auth/reset-password` through the auth service.
- Shared infrastructure such as `apiClient` stays outside the feature module.

## Approach

Use a feature-module structure with shared auth components, three routed pages, a module-local service, and shared auth styles. This was selected over placing all pages in `App.jsx`, because it keeps each business flow isolated and allows future business areas to be added as separate modules.

## Structure

```text
src/modules/auth/
  components/AuthLayout.jsx
  components/FormField.jsx
  pages/LoginPage.jsx
  pages/RegisterPage.jsx
  pages/ResetPasswordPage.jsx
  services/authService.js
  styles/auth.css
  index.js
```

`App.jsx` owns top-level routes. Successful login stores available access and refresh tokens, reads `user.role`, and navigates using this mapping:

- `ADMIN` -> `/admin`
- `INSTRUCTOR` -> `/instructor`
- `STUDENT` -> `/student`
