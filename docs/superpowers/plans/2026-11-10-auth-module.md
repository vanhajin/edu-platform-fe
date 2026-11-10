# Auth Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a routed React authentication module from the three supplied static HTML pages, backed by the existing Axios API client.

**Architecture:** `src/modules/auth` owns shared auth UI, pages, styles, storage utilities, and the module auth service. `App.jsx` only defines top-level routes, while `src/services/apiClient.js` remains shared infrastructure and reads the persisted access token.

**Tech Stack:** React 19, React Router 7, Axios, Vite 8, Vitest and Testing Library for behavior tests

**Spec:** `docs/superpowers/specs/2026-11-10-auth-module-design.md`

## Global Constraints

- Registration sends exactly `email`, `password`, `fullName`, and `role`.
- Registration roles are `ADMIN`, `INSTRUCTOR`, and `STUDENT`.
- Login must call `authService.login(credentials)`.
- Login stores returned access and refresh tokens when present.
- Role navigation uses `ADMIN` -> `/admin`, `INSTRUCTOR` -> `/instructor`, and `STUDENT` -> `/student`.
- Reset password calls `/auth/reset-password` through `authService`.
- All converted JSX uses `className` and self-closing void elements.

## Review Focus

- Missing or malformed login response must show an error instead of navigating.
- Unknown roles must show an error and must not navigate.
- Token fields nested under `data` or returned at response root must be normalized consistently.
- Repeated submissions must be disabled while an API request is in flight.
- API validation and network errors must restore the form and expose a useful message.

---

### Task 1: Authentication contracts and storage

**Files:**
- Create: `src/modules/auth/services/authService.js`
- Create: `src/modules/auth/utils/authSession.js`
- Test: `src/modules/auth/utils/authSession.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: shared `apiClient` from `src/services/apiClient.js`
- Produces: `authService.login(credentials)`, `authService.register(formData)`, `authService.resetPassword(payload)`, `saveAuthSession(payload)`, and `getRoleDestination(role)`

- [ ] Write failing tests for token persistence and every supported/unsupported role mapping.
- [ ] Run the focused test and verify failure because the utility does not exist.
- [ ] Implement minimal service methods and session utilities.
- [ ] Run the focused test and verify it passes.

### Task 2: Shared auth presentation

**Files:**
- Create: `src/modules/auth/components/AuthLayout.jsx`
- Create: `src/modules/auth/components/FormField.jsx`
- Create: `src/modules/auth/styles/auth.css`
- Create: `src/modules/auth/index.js`

**Interfaces:**
- Produces: reusable `AuthLayout` and controlled `FormField` used by all auth pages

- [ ] Add a failing render test proving labels, controlled inputs, messages, and links render with accessible names.
- [ ] Run the focused test and verify failure because components do not exist.
- [ ] Convert shared static markup and styles to reusable JSX and CSS.
- [ ] Run the focused test and verify it passes.

### Task 3: Registration flow

**Files:**
- Create: `src/modules/auth/pages/RegisterPage.jsx`
- Test: `src/modules/auth/pages/RegisterPage.test.jsx`

**Interfaces:**
- Consumes: `AuthLayout`, `FormField`, and `authService.register(formData)`
- Produces: controlled registration page for `/register`

- [ ] Write failing tests for field updates, three role options, exact submit payload, loading, and API errors.
- [ ] Run tests and verify expected failures.
- [ ] Implement the controlled form with `useState` and the retained static design.
- [ ] Run tests and verify they pass.

### Task 4: Login and role navigation

**Files:**
- Create: `src/modules/auth/pages/LoginPage.jsx`
- Test: `src/modules/auth/pages/LoginPage.test.jsx`

**Interfaces:**
- Consumes: `authService.login(credentials)`, `saveAuthSession(payload)`, `getRoleDestination(role)`, and React Router `useNavigate()`
- Produces: login page that stores tokens and routes by returned `user.role`

- [ ] Write failing tests for credentials submission, access/refresh token storage, all role destinations, unknown roles, malformed responses, loading, and API errors.
- [ ] Run tests and verify expected failures.
- [ ] Implement the login flow and role navigation.
- [ ] Run tests and verify they pass.

### Task 5: Password-reset flow and app routing

**Files:**
- Create: `src/modules/auth/pages/ResetPasswordPage.jsx`
- Test: `src/modules/auth/pages/ResetPasswordPage.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.css`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `authService.resetPassword({ email })` and all auth page exports
- Produces: `/login`, `/register`, `/reset-password`, plus placeholder destination routes for `/admin`, `/instructor`, and `/student`

- [ ] Write failing tests for reset validation/submission and route rendering.
- [ ] Run tests and verify expected failures.
- [ ] Implement reset behavior, module exports, and top-level routes; remove Vite starter presentation.
- [ ] Run focused tests and verify they pass.

### Task 6: Full verification

**Files:**
- Verify all files changed above.

- [ ] Run `npm test -- --run` and require zero failures.
- [ ] Run `npm run lint` and require exit code 0.
- [ ] Run `npm run build` and require exit code 0.
- [ ] Inspect the final diff against every global constraint.
