---
name: add-feature
description: Interview the user for feature requirements, then implement the feature on a new branch from main.
argument-hint: <feature-name (optional)>
triggers: ["user"]
---

## Interview

1. Ask the user for the **feature name** (e.g., "dark-mode", "pagination", "search").
2. Ask follow-up questions to gather requirements:
   - Where should the feature be placed in the UI?
   - Should state persist (localStorage, URL params, etc.)?
   - Any default behavior or OS-level preferences to respect?
   - Color scheme, styling, or UX preferences?
3. Summarize the requirements back to the user for confirmation before proceeding.

## Setup

1. Clone or pull the latest `main` branch of the repository.
2. Run `npm install` to ensure dependencies are up to date.
3. Create a new feature branch: `git checkout -b devin/<timestamp>-<feature-name>`.

## Implement

1. Explore the existing codebase to understand the architecture (components, services, store, styles).
2. Implement the feature following existing conventions:
   - Use Angular standalone components.
   - Use CSS custom properties (variables) defined in `src/styles.scss` for theming.
   - Use Angular Material components where appropriate.
   - Keep services in `src/app/shared/services/` for shared logic.
3. Ensure the feature is accessible (aria labels, keyboard navigation).
4. Use the existing NgRx store pattern if state management is needed.

## Verify

1. Run `npm run build` and confirm zero errors.
2. Run `npm test` if tests exist for affected components.
3. Manually verify the feature works as expected.

## Deliver

1. Commit changes with a descriptive message.
2. Push the branch and create a pull request.
3. Share the PR link with the user.
