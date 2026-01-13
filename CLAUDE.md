# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

This project follows a spec-driven development approach. Context may be cleared frequently to stay focused, so reference these docs to bootstrap:

### Key Documents
- `docs/REQUIREMENTS.md` — Product requirements and tech stack decisions
- GitHub Issues — Source of truth for tasks (use `gh issue list` to see open issues)

### Workflow Steps
1. **Pick an issue** — Check open issues with `gh issue view <number>` for details
2. **Create a feature branch** — Name format: `<issue-number>-short-description`
3. **Implement** — Make changes, use Chrome integration to test visually
4. **Commit** — Use [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `chore:` for maintenance tasks
   - `refactor:` for code restructuring
5. **Create PR** — Push branch, open PR with `gh pr create`, reference the issue
6. **User reviews and merges** — Wait for approval before moving to next issue

### Commands Reference
```bash
# View open issues
gh issue list

# View specific issue
gh issue view <number>

# Create branch
git checkout -b <issue-number>-<description>

# Start dev server (run in background)
npm run dev

# Create PR
gh pr create --title "type: description" --body "..."
```

### Testing
- Run `npm run dev` in background for local testing
- Use Chrome integration (`mcp__claude-in-chrome__*`) for visual verification
- Take screenshots to confirm UI changes

## Frontend Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
