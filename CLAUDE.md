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

```
app/
├── (auth)/                    # Auth route group
│   ├── login/page.tsx        # Login page with Supabase auth
│   ├── register/page.tsx     # Registration page with Supabase auth
│   └── utils.ts              # Validation utilities (email, password)
├── layout.tsx                # Root layout with ThemeRegistry + ToastProvider
├── page.tsx                  # Home page (client component)
├── theme.ts                  # MUI theme configuration
├── ThemeRegistry.tsx         # MUI theme provider wrapper
└── globals.css               # Global CSS reset

components/
└── Navbar/
    └── Navbar.tsx            # Server component navigation bar

contexts/
├── ToastContext.tsx          # Global toast notification system (MUI Snackbar)
└── AuthContext.tsx           # Authentication state management (user, isLoading)

lib/
├── supabase/
│   ├── client.ts             # Browser Supabase client (@supabase/ssr)
│   ├── server.ts             # Server Supabase client with cookies
│   ├── middleware.ts         # Cookie handling for middleware
│   ├── auth.ts               # Empty file (placeholder)
│   └── database.types.ts     # Supabase database types
└── theme/
    └── theme.ts              # Duplicate theme file (consider removing)

public/                       # Static assets (SVG files)
global.d.ts                   # TypeScript declaration for CSS module imports
```

### TypeScript Configuration

- Path alias `@/*` maps to the root directory
- Target: ES2017
- JSX mode: `react-jsx`
- Strict mode enabled

### Branch Strategy

- Main branch: `master`
- Development branch: `dev` (current)

## Authentication System

### Supabase Integration

The app uses **Supabase** for authentication and backend services:

- **Client**: `@supabase/ssr` v0.7.0 and `@supabase/supabase-js` v2.76.1
- **Auth Methods**: Email/Password authentication
- **Client-side**: Uses `createClient()` from `lib/supabase/client.ts`
- **Server-side**: Uses cookie-based auth from `lib/supabase/server.ts`

### Auth Pages

**Login Page** (`app/(auth)/login/page.tsx`):
- Client component with MUI form components
- Email and password validation (real-time with `touched` state)
- Uses `signInWithPassword()` from Supabase
- Success: Shows toast notification → redirects to `/` after 1s delay
- Error: Shows inline error + toast notification
- Proper try/catch/finally for loading states
- Fixed Router import (uses `next/navigation` not `next/router`)

**Register Page** (`app/(auth)/register/page.tsx`):
- Similar structure to login page
- Additional fields: First Name, Last Name
- Confirm password field (shows after password field has content)
- Stores user metadata: `first_name`, `last_name`
- Password match validation (checks on every keystroke once field has content)
- Uses `signUp()` from Supabase
- Success: Shows toast → redirects to `/`
- Proper error handling with toasts

**Validation** (`app/(auth)/utils.ts`):
- `validateEmail()`: Regex pattern for email validation
- `validatePassword()`: Minimum 5 characters, requires uppercase, lowercase, and number

### Auth Context

**AuthContext** (`contexts/AuthContext.tsx`):
- Provides: `user` (User | null), `isLoading` (boolean)
- Fetches current user on mount via `supabase.auth.getUser()`
- Subscribes to auth state changes with `onAuthStateChange()`
- Properly cleans up subscription on unmount
- **NOTE**: Has console.log statement that should be removed for production (line 43)
- **NOTE**: Line 44 uses non-standard syntax `<AuthContext>` instead of `<AuthContext.Provider>` - may need verification
- **Integrated in layout**: Wraps entire app at root level

## Toast Notification System

**ToastContext** (`contexts/ToastContext.tsx`):
- Global toast notification system using MUI Snackbar + Alert
- Integrated into root layout → toasts **survive page navigation**
- API: `const { showToast } = useToast()`
- Usage: `showToast(message, severity)` where severity is `"success" | "error" | "warning" | "info"`
- Position: Bottom-center
- Auto-hide: 6 seconds
- Styled with filled variant for better visibility

**Integration**:
- Wrapped in `app/layout.tsx` inside ThemeRegistry
- Used in login and register pages for success/error feedback
- Shows success message with 1s delay before redirect (lets user see the feedback)

## Component Architecture

### Navbar (`components/Navbar/Navbar.tsx`)

- **Server Component** (no "use client" directive)
- Uses Next.js `Link` component for navigation
- MUI components: Stack, Divider, IconButton, Typography
- Links: Home (`/`), Products (`/products`), Something (`/something`), Sign In (`/signin`)
- **Static**: Does not reflect auth state (no conditional rendering for logged-in users)

### Root Layout (`app/layout.tsx`)

Provider hierarchy:
```tsx
<html>
  <body>
    <AuthProvider>          // Authentication state (outermost)
      <ThemeRegistry>       // MUI theme provider
        <ToastProvider>     // Global toast notifications
          <Navbar />
          {children}
        </ToastProvider>
      </ThemeRegistry>
    </AuthProvider>
  </body>
</html>
```

## Recent Changes (Session Summary)

### UX Polish Fixes
1. **Fixed broken redirect** in login page (was using Pages Router API)
2. **Added redirect** to register page (was missing entirely)
3. **Consistent error display** - all FormHelperText inside FormControl
4. **Better validation messages** - now explains requirements clearly
5. **Improved confirm password validation** - checks on every keystroke
6. **Added proper autoComplete attributes** for better UX
7. **Try/catch/finally** for all async operations
8. **Removed unused imports** and state variables

### Global Toast System
1. Created `ToastContext.tsx` with MUI Snackbar
2. Integrated into root layout
3. Added success/error toasts to auth pages
4. Toasts survive page navigation (key feature!)

### TypeScript Fixes
1. Created `global.d.ts` to fix CSS import errors
2. Declares `*.css` module type for TypeScript

## Known Issues & Technical Debt

### Bugs
1. **Unused imports**: `console` imported but not used in AuthContext line 5
2. **Console.log statements**: Debug log left in production code (AuthContext line 43)
3. **Non-standard Context syntax**: AuthContext line 44 uses `<AuthContext>` instead of standard `<AuthContext.Provider>` - appears to work but may need verification

### Missing Features
1. **No middleware**: No route protection or session refresh middleware
2. **Static Navbar**: Doesn't show user state (login/logout buttons, user profile)
3. **No email confirmation flow**: If Supabase requires email confirmation, no handling for that
4. **No "forgot password" link**: Common auth feature missing
5. **No loading UI**: No skeleton screens or spinners during page loads
6. **Duplicate theme file**: `lib/theme/theme.ts` seems redundant with `app/theme.ts`

### Code Quality
1. Empty file: `lib/supabase/auth.ts` - unclear purpose
2. Typo in AuthContext: "withing" should be "within" (line 50)
3. Typo in AuthContext: "subscreiption" should be "subscription" (line 38 comment)

## Development Guidelines

### When Adding New Features
1. **Auth-required pages**: Use AuthContext (once fixed) to check user state
2. **User feedback**: Use ToastContext for success/error notifications
3. **Forms**: Follow pattern from login/register (touched state, real-time validation)
4. **MUI Components**: Must be in client components (`"use client"`)
5. **Navigation**: Use Next.js `Link` from `next/link`, not `<a>` tags

### Component Guidelines
- Server components by default (don't add "use client" unless needed)
- Use "use client" when:
  - Using hooks (useState, useEffect, useContext)
  - Using MUI components
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs

### Authentication Flow
1. User submits login/register form
2. Form validates fields
3. Calls Supabase auth method
4. On success: Show toast → wait 1s → redirect
5. On error: Show toast + inline error message
6. AuthContext picks up session change via `onAuthStateChange()`

## Next Steps (Recommendations)

1. **Remove console.log statements** and unused imports from AuthContext
2. **Add middleware** for route protection and session refresh
3. **Make Navbar dynamic** based on auth state (show login/logout, user profile)
4. **Add email confirmation handling** if required by Supabase
5. **Clean up duplicate theme file** (`lib/theme/theme.ts`)
6. **Add forgot password flow**
7. **Consider loading states** for better UX during navigation
8. **Verify AuthContext syntax** - non-standard but apparently working
