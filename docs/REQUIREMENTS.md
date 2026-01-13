# Pomoflex Requirements

## Overview

A simple, flexible, backendless pomodoro web application.

---

## Core Timer Functionality

### Timer Durations (Defaults)

- **Work session:** 25 minutes
- **Short break:** 5 minutes
- **Long break:** 15 minutes
- **Long break interval:** Every 4 pomodoros

### Rollover Feature (Break Deficit)

When a work session ends, the user enters a **rollover window**. If they don't manually start a break within this window:

- A new work session automatically begins
- The earned break time is added to the **break deficit** (accumulated)
- Deficit is **uncapped by default** (can grow indefinitely)
- User can optionally configure a **max deficit** to cap accumulation

When taking a break:

- User can take **partial breaks** (e.g., 5 min break even if 20 min is banked)
- Break time is deducted from the deficit

**Example:** User completes 4 work sessions with rollover → deficit = 20 min (5+5+5+5). They could take a 10 min break, leaving 10 min still banked.

### Timer Behavior

- **Work/break durations:** Fixed (25/5/15) — standard pomodoro technique
- **Rollover timeout:** Configurable (default: 1 minute)
- **Max break deficit:** Configurable (default: unlimited)
- **Auto-start breaks:** No (user must opt-in; enables rollover)

---

## Notifications & Feedback

- **Audio notifications:** Yes — bell sound (may experiment with alternatives later)
- **Browser notifications:** Yes — OS-level notifications when timers complete
- **Visual cues:** Minimalistic approach
  - Easy on the eyes (no harsh bright whites)
  - Colorblind-friendly design (avoid relying solely on red/green distinction; use shapes, labels, or patterns as secondary indicators)

---

## Session Tracking

- **Track completed pomodoros:** Yes — count of completed work sessions
- **Persist across sessions (localStorage):** Yes — preserves deficit and session count on refresh/close
- **Clear history:** User can manually reset/clear stored data
- **Statistics/history view:** Not in MVP

---

## Task Management

- **Task list integration:** Not in MVP — pure timer focus

---

## UI/UX

- **Layout:**
  - Main screen: Timer display + start/stop control + settings button (minimal)
  - Settings view: Separate panel/modal for configuration options
- **Dark mode:** Deferred — decide after initial UI takes shape
- **Aesthetic:** Minimalist

---

## Additional Requirements

- **Keyboard shortcuts:** Yes (e.g., spacebar to start/pause/resume)
- **Responsive layout:** Yes — works on desktop, tablet, and mobile
- **PWA support:** Not in MVP
- **Pause functionality:** Yes — users can pause mid-session and resume

---

## Tech Stack

- **Framework:** Svelte — simple, reactive, compiles to small vanilla JS
- **Build Tool:** Vite — fast dev server, hot reload, official Svelte template
- **Styling:** Plain CSS with Svelte's built-in component scoping
- **Persistence:** localStorage (no backend)
- **Deployment:** GitHub Pages (static hosting, GitHub Action for CI/CD)
