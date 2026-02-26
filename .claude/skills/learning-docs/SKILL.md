---
name: learning-docs
description: Update project learning documentation in documentation/learning/. Use this automatically before every commit to capture architectural decisions, patterns, and project knowledge. Also use when the user explicitly asks to update or refresh learning docs.
metadata:
  author: PropmannDEMO team
  version: "1.0"
---

Maintain the project's learning documentation — a digestible knowledge base for developer onboarding and upskilling.

**Location**: `documentation/learning/`

---

## When This Runs

- **Automatically before every commit** — Analyze staged changes and update learning docs if there's something worth capturing
- **Manually via `/learning-docs`** — Full refresh across the entire codebase

---

## What to Capture

Only document things that help a developer understand **why** and **how**, not trivial details.

### Worth documenting:
- **Architectural decisions** — Why we structured something a certain way
- **Design patterns** — Recurring patterns used in the codebase
- **Technology choices** — Why we picked specific libraries/tools and how we use them
- **Non-obvious conventions** — Things that aren't obvious from reading the code alone
- **Gotchas and pitfalls** — Things that would trip up a new developer
- **Data flow** — How data moves through the system, especially complex flows

### NOT worth documenting:
- Obvious code (self-explanatory functions, standard CRUD)
- Individual bug fixes (unless they reveal a systemic issue)
- Trivial config changes
- Things already covered in `documentation/requirements/` — reference those instead

---

## File Structure

```
documentation/learning/
├── README.md              # Index — start here
├── architecture.md        # System architecture & structure decisions
├── patterns.md            # Code patterns & conventions
├── tech-choices.md        # Technology decisions & rationale
└── gotchas.md             # Pitfalls, edge cases, non-obvious behavior
```

Create files **only when there's content for them**. Don't create empty placeholders.

---

## Format Guidelines

Keep entries **short and scannable**. Each entry should be understandable in under 2 minutes.

### Entry format:

```markdown
### [Short descriptive title]
*Added: YYYY-MM-DD*

**Context**: Why this decision/pattern exists (1-2 sentences)

**Decision/Pattern**: What we do (1-3 sentences or a short code snippet)

**Why**:
- Reason 1
- Reason 2
```

### Example:

```markdown
### Separate route groups for Manager and Resident
*Added: 2026-02-27*

**Context**: The app serves two distinct user types with very different UIs.

**Decision**: Manager pages live under `app/manager/`, Resident pages under `app/resident/`. Each has its own layout, components folder, and UI library.

**Why**:
- Manager uses Ant Design (desktop), Resident uses Ant Design Mobile (touch)
- Completely separate navigation and layout patterns
- Prevents accidental cross-contamination of styles/components
```

---

## Process

### Before a commit (automatic):

1. **Check staged changes**: Run `git diff --cached --stat` to see what's changing
2. **Read existing learning docs**: Check what's already documented in `documentation/learning/`
3. **Analyze the changes**: Look for architectural decisions, new patterns, technology usage, or gotchas
4. **If something is worth capturing**:
   - Update the relevant file (or create it if it doesn't exist)
   - Add new entries at the **top** of the relevant section (newest first)
   - Update `documentation/learning/README.md` index if a new file was created
   - Stage the learning doc changes alongside the other changes
5. **If nothing is worth capturing**: Do nothing — not every commit needs a learning doc update

### Manual refresh (`/learning-docs`):

1. **Scan the entire codebase**: Read key files, understand the architecture
2. **Read all existing learning docs**: Understand what's already documented
3. **Identify gaps**: What important knowledge is missing?
4. **Update/create entries**: Fill gaps with new entries
5. **Clean up**: Remove outdated entries, update dates, fix broken references
6. **Show the user**: Summarize what was added/changed/removed

---

## Updating Existing Entries

- If a pattern or decision changes, **update the existing entry** rather than adding a duplicate
- Add `*Updated: YYYY-MM-DD*` below the original date
- If a decision is reversed, note it clearly with the old and new approach

---

## README.md Format

The learning README should serve as a "start here" guide:

```markdown
# Learning

A digestible knowledge base for developers working on PropmannDEMO.
These docs capture the **why** behind decisions, not just the **what**.

Auto-maintained by Claude — updated with each commit.

## Topics

| File | What's inside |
|------|--------------|
| [architecture.md](./architecture.md) | System structure, routing, layouts |
| [patterns.md](./patterns.md) | Code conventions, recurring patterns |
| [tech-choices.md](./tech-choices.md) | Why we chose our libraries and tools |
| [gotchas.md](./gotchas.md) | Pitfalls and non-obvious behavior |

## How to Use
- **New to the project?** Read top-to-bottom for a quick overview
- **Looking for something specific?** Check the relevant topic file
- **Found something missing?** Ask Claude to update, or add it manually
```

Only list files that actually exist in the table.

---

## Guardrails

- **Don't duplicate requirements docs** — Reference `documentation/requirements/` instead of copying
- **Don't document everything** — Be selective. Only capture knowledge that genuinely helps
- **Keep entries short** — If an entry exceeds ~15 lines, simplify it
- **Use today's date** — Always use the current date for new/updated entries
- **Don't remove manually-added content** — Preserve anything a developer added by hand
- **Stage with the commit** — Learning doc updates should be part of the same commit, not separate
