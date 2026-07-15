# Shepherds Inn Angular Frontend

## Project context

This repository contains the Angular frontend for the Shepherds Inn assisted living website.

The primary developer has extensive C# and general software engineering experience (including desktop applications and algorithmic trading systems), but is newer to Angular, browser/server architecture, hosting, and deployment.

Explain Angular and web-specific concepts clearly, but do not over-explain normal programming concepts.

---

# Design philosophy

Favor code that is:

- Easy to understand
- Easy to maintain
- Easy to extend
- Easy to debug

Favor readability over cleverness.

Introduce abstractions (shared components, services, interfaces, helper classes, etc.) when they simplify future development, improve maintainability, or separate responsibilities—not simply because a design pattern exists.

When multiple reasonable approaches exist, briefly explain why the chosen approach is preferred.

---

# Angular conventions

- Use standalone components.
- Keep page-specific styles inside the page or component.
- Keep reusable styling in global styles.
- Reuse components, services, models, and shared data rather than duplicating code.
- Prefer strongly typed request and response models.
- Centralize configuration values.
- Keep API contracts synchronized with the backend.
- Maintain accessible labels and keyboard navigation.

Avoid unnecessary duplication.

---

# Working style

Before making changes:

- Inspect the existing implementation.
- Understand how the current code works.
- Preserve the existing architecture unless there is a clear reason to improve it.

Do not:

- Invent production domains.
- Invent hosting providers.
- Invent API endpoints.
- Invent deployment details.
- Invent configuration values.

If required information is unknown, clearly state the assumption instead of guessing.

---

# Local development

Repository:

C:\Brian\Development\ShepherdsInn\web

Typical commands:

```powershell
npm install
```

```powershell
npm start
```

If no start script exists:

```powershell
ng serve
```

Development URL:

```
http://localhost:4200
```

Expected backend:

```
https://localhost:7227
```

---

# Verification

Before considering a task complete:

- Build the Angular application.
- Report all warnings and errors.
- Verify affected behavior.
- Verify frontend/backend API compatibility.

Never claim browser testing unless a controllable browser actually performed the test.

If browser testing could not be completed, clearly state why.

---

# Communication

After every completed task, provide:

## Summary

A short overview of the work completed.

## Files changed

List every modified file.

## Why

Explain why each change was made.

## Verification

Explain how the work was verified.

## Remaining work

Describe any remaining concerns, technical debt, or future improvements.

---

# Teaching

Assume the developer wants to understand the architecture, not simply finish the task.

When introducing:

- Angular
- TypeScript
- HTML
- CSS
- browser/server communication
- deployment
- hosting

briefly explain:

- what it is
- why it exists
- why the chosen approach is preferred

Do not explain basic programming concepts unless asked.

---

# UI philosophy

This website is intended for prospective assisted living residents and their families.

Favor:

- readability
- simplicity
- accessibility
- consistency
- moderate whitespace
- clear calls to action

Avoid:

- trendy animations
- unnecessary motion
- clutter
- unnecessarily complex layouts

When suggesting UI improvements, prioritize usability over visual novelty.

---

## Code review

When completing a task:

- Mention anything you considered changing but intentionally left unchanged.
- Mention any tradeoffs in the chosen solution.
- Highlight any assumptions made during implementation.
