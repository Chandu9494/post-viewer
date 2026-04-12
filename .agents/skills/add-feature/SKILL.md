---
name: add-feature
description: >
  Reusable workflow for adding any new feature. Interviews the user for
  requirements, creates a branch, implements, verifies, and delivers a PR.
  Invoke with: @add-feature or @add-feature <feature-name>
argument-hint: <feature-name (optional)>
triggers: ["user"]
---

## 1 — Interview

If a feature name was passed as `$ARGUMENTS`, use it. Otherwise ask:

1. **Feature name** — Ask the user for a short kebab-case name
   (e.g., `dark-mode`, `infinite-scroll`, `search-bar`, `user-auth`).
2. **Requirements** — Use `content_type="user_question"` to ask the user
   these questions (batch them into a single message when possible):
   - Where in the UI should the feature live? (e.g., header, sidebar, card, new page)
   - Does the feature need to persist state? If so, how? (localStorage, URL params, backend API, none)
   - Any default/initial behavior to respect? (e.g., OS preference, logged-in state, empty state)
   - Styling or UX preferences? (colors, animations, responsive behavior)
   - Any third-party libraries or APIs required?
3. **Confirm** — Summarize all gathered requirements back to the user in a
   bulleted list. Wait for explicit confirmation before proceeding.

## 2 — Setup

1. `git checkout main && git pull origin main`
2. `npm install`
3. `git checkout -b devin/$(date +%s)-<feature-name>`

## 3 — Explore

Before writing any code, read and understand the existing codebase:

1. Scan the project structure (`src/app/` tree, `angular.json`, `package.json`).
2. Identify existing patterns:
   - Component style: standalone vs NgModule-based
   - State management: NgRx store, services with BehaviorSubject, signals, etc.
   - Styling approach: CSS variables in `src/styles.scss`, component SCSS, Angular Material theme
   - Routing: lazy-loaded routes, route guards
3. Note the conventions so the new feature matches them.

## 4 — Implement

1. Create or modify files following the conventions discovered in step 3.
   General rules:
   - **Components** — Use the same component style as the rest of the app
     (standalone components with `imports` array in this repo).
   - **Services** — Place shared services in `src/app/shared/services/`.
   - **Theming** — Define any new colors as CSS custom properties in
     `src/styles.scss` under both `:root` / `[data-theme="dark"]` and
     `[data-theme="light"]` blocks so dark mode works automatically.
   - **Angular Material** — Import Material modules as needed.
   - **Accessibility** — Add `aria-label`, keyboard handlers, and
     semantic HTML where appropriate.
   - **State** — Use the existing state management pattern (NgRx or
     service-based BehaviorSubject) rather than introducing a new one.
2. Keep changes minimal and focused on the requested feature.
3. Do NOT modify or delete existing tests to make them pass.

## 5 — Verify

1. `npm run build` — must complete with **zero errors**.
2. `npm test` — run if tests exist; fix any failures caused by your changes.
3. Start the dev server (`npx ng serve`) and visually verify the feature
   works as expected. Take a screenshot or record for proof.

## 6 — Deliver

1. `git add` only the files you changed (no `git add .`).
2. Commit with a descriptive conventional-commit message:
   `feat: <short description of the feature>`
3. `git push origin <branch-name>`
4. Create a pull request using the `git_create_pr` tool.
5. Share the PR link with the user and ask for review.
