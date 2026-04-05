# Frontend Structure

## Layers

The repo now follows a Feature-Sliced-oriented structure for product code in `src`.
Because Next.js reserves `src/pages` for the Pages Router, the FSD page layer lives in `src/pages-layer`:

- `app`
  - Next.js App Router entrypoints only.
  - Route files, layouts, metadata, error boundaries, API route handlers.
- `src/pages-layer`
  - Page-level UI composition for concrete screens.
  - Example: auth pages in `src/pages-layer/auth/*`.
- `src/widgets`
  - Large reusable page blocks composed from shared UI and features.
  - Example: header, footer, booking form, auth recovery shell.
- `src/features`
  - User scenarios and business interactions.
  - Example: auth route-closing flow, Google auth trigger, language switching.
- `src/entities`
  - Reserved for domain entities when the project gets richer domain slices.
- `src/shared`
  - Reusable infrastructure and primitives.
  - API client, i18n, SEO, base UI, helpers.

## Current Auth Mapping

- `app/[locale]/(auth)/*/page.tsx`
  - Thin route wrappers only.
- `app/[locale]/@modal/*`
  - Thin intercepted modal wrappers only.
- `src/pages-layer/auth/login/ui/LoginPage.tsx`
- `src/pages-layer/auth/register/ui/RegisterPage.tsx`
- `src/pages-layer/auth/forgot-password/ui/ForgotPasswordPage.tsx`
- `src/pages-layer/auth/reset-password/ui/ResetPasswordPage.tsx`
- `src/widgets/password-recovery-shell/ui/PasswordRecoveryShell.tsx`
- `src/widgets/auth-promo-list/ui/AuthPromoList.tsx`
- `src/features/auth/model/auth-flow.ts`
- `src/features/auth/google/ui/GoogleAuthButton.tsx`
- `src/features/change-language/ui/LanguageSwitcher.tsx`

## Current App Mapping

- `src/pages-layer/home/ui/HomePage.tsx`
- `src/pages-layer/cafe/ui/CafePage.tsx`
- `src/pages-layer/profile/ui/ProfilePage.tsx`
- `src/pages-layer/profile-tickets/ui/ProfileTicketsPage.tsx`
- `src/pages-layer/ticket-booking/ui/TicketBookingPage.tsx`
- `src/pages-layer/not-found/ui/NotFoundPage.tsx`
- `src/widgets/profile-tabs-bar/ui/ProfileTabsBar.tsx`
- `src/widgets/PopularRoutes/PopularRoutes.tsx`
- `src/widgets/BookingForm/*`
- `src/entities/trip/*`
- `src/entities/user/*`
- `src/shared/ui/Button/Button.jsx`

## Placement Rules

- Put route orchestration in `app`, not business UI.
- Put screen composition in `src/pages-layer`.
- Put reusable screen sections in `src/widgets`.
- Put business-specific interactions in `src/features`.
- Put domain data and domain API in `src/entities`.
- Keep `src/shared` free from feature-specific knowledge.
- Keep `src/shared/api` generic: only transport/session-level code belongs there.

## Important Constraint

`shared` must not depend on `features`, `widgets`, or `pages`.
If a shared component needs business behavior, pass it through props instead of importing feature logic directly.
