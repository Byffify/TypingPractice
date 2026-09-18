# Typing Practice

A browser-based typing speed practice app built with **React + TypeScript + Vite**, inspired by
[Monkeytype](https://monkeytype.com/). It uses an overlay UI — as you type, each character under the cursor is highlighted:
**green = correct**, **red = incorrect**.

## Overview

Measure your typing speed and accuracy with two main modes:

- **Text** — random English words (common vocabulary + dev-flavored words like `react`, `typescript`, `hook`) joined into a passage.
- **Code** — type real code line by line, choosing from HTML / CSS / JavaScript / TypeScript (a Todo App example).

Pick a test duration of 15 / 30 / 60 seconds. The timer starts automatically on your first keystroke; when you finish
the target or time runs out, results are shown as **WPM** and **accuracy (%)**, with a "try again" button.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| [React](https://react.dev) 19 | UI built from components and hooks |
| [TypeScript](https://www.typescriptlang.org) | Types for test mode, duration, code snippets, and results |
| [Vite](https://vite.dev) | Dev server and build tool |
| [Tailwind CSS](https://tailwindcss.com) 4 | Styling via utility classes and CSS variables |
| [React Icons](https://react-icons.github.io/react-icons) | Icons, e.g. the GitHub link button |