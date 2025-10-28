# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router architecture with Material-UI (MUI) v7 for component styling. The project uses TypeScript and React 19.2.0.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

The dev server runs on http://localhost:3000 with Turbopack enabled for faster builds.

## Architecture

### Styling System

The app uses Material-UI with a custom theming setup:

- **Theme Configuration**: `app/theme.ts` - Contains the MUI theme configuration using `createTheme()`
- **Theme Provider**: `app/ThemeRegistry.tsx` - Client component that wraps the app with MUI's `ThemeProvider` and `CssBaseline`
- **Global Styles**: `app/globals.css` - Minimal global CSS reset (box-sizing, padding, margin)

The theming architecture requires:
1. `ThemeRegistry` is a client component that must wrap all children in the root layout
2. All MUI customization should be done in `app/theme.ts`
3. Pages using MUI components must be client components (marked with `'use client'`)

### Project Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout that wraps app with ThemeRegistry
  - `page.tsx` - Home page (client component)
  - `theme.ts` - MUI theme configuration
  - `ThemeRegistry.tsx` - MUI theme provider wrapper
  - `globals.css` - Global styles
- `public/` - Static assets (SVG files)

### TypeScript Configuration

- Path alias `@/*` maps to the root directory
- Target: ES2017
- JSX mode: `react-jsx`
- Strict mode enabled

### Branch Strategy

- Main branch: `master`
- Development branch: `dev` (current)
