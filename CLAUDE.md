# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm start

# ESLint linting
npm run lint
```

## Architecture Overview

This is a Next.js 15.4.5 application for Zummit Payments, a merchant services platform that helps businesses save up to 40% on credit card processing fees.

### Core Application Structure

- **Multi-step Lead Generation Flow**: The main page (`src/app/page.tsx`) implements a step-by-step form to capture prospect information
- **App Router Architecture**: Uses Next.js 13+ app directory structure with layout.tsx files for nested layouts
- **Supabase Integration**: Database operations handled through `src/lib/supabase.ts` with typed interfaces for Lead and ContactMessage entities
- **Component-Based Design**: Reusable components in `src/components/` including Header, Footer, Calendly integration, and specialized widgets

### Key Features

- **Calendly Integration**: Embedded scheduling widget via `CalendlyWidget.tsx`
- **Multi-language Support**: Google Translate integration built into the layout
- **Live Chat**: Tawk.to chat widget integrated globally
- **Exit Intent**: Lead capture popup system
- **Analytics**: Vercel Analytics integration

### Styling and UI

- **Tailwind CSS v3** with brand tokens in `tailwind.config.js`: `navy-*` (page tops, dark sections, footer), `gold-*` (primary buttons and the one highlight only), `ink`, `muted`, `paper`, `line`.
- **Typography**: Archivo (variable width) for everything; add `font-wide` / `font-extra-wide` to headings and big numbers. IBM Plex Mono is only for the home page receipt (`src/components/home/Receipt.tsx`).
- **Shared building blocks**: `src/components/ui/Layout.tsx` (`Container`, `Section`, `SectionHeading`, `PageHero`), `src/components/ui/Button.tsx` (`ButtonLink`, `buttonClasses`, icons), `src/components/ui/Visuals.tsx` (`IconTile` for lucide-react icons, `PaymentCards` illustration), `src/components/sections/*` (`OnboardingTimeline`, `CustomerStories`, `IndustryGrid`, `FaqList`), `CalendlyWidget.tsx` (`CalendlyButton`, `CalendlyEmbed`, inline calendar).
- **Page structure**: marketing routes get `Header` + `<main>` + `Footer` from their `layout.tsx` (never from `page.tsx`). Inner pages start with `PageHero`. The `Footer` ends every page with the closing call to action, so pages don't add their own CTA band. `/get-quote` and `/thank-you` are focused funnels with a slim bar and no nav.
- **Content rule**: only use facts that already exist on the site. Contact details, Calendly URL and phone live in `src/lib/site.ts`.

### Data Flow

1. **Lead Capture**: Multi-step form collects business information (location, volume, contact details)
2. **Supabase Storage**: Form data stored in Supabase tables with TypeScript interfaces
3. **Navigation**: After form completion, users access main site sections (Payment Solutions, Equipment, Company, Contact)

### Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Page Structure

- `/` - Main landing page with lead generation form
- `/admin-panel` - Administrative interface
- `/company` - Company information and about page
- `/contact` - Contact form and information
- `/credit-card-processing` - Service-specific landing page
- `/get-quote` - Quote request page
- `/portfolio` - Equipment and POS solutions showcase
- `/products` - Payment solutions and services
- `/support` - Support resources and account management
- `/thank-you` - Post-form completion page

### Third-party Integrations

- **Vercel Analytics**: Built-in performance and usage tracking
- **Google Translate**: Automatic page translation for multiple languages
- **Tawk.to Chat**: Live chat support widget (ID: 68928822205309192bd922e1)
- **Calendly**: Appointment scheduling system

### Development Notes

- Uses Turbopack for faster development builds
- TypeScript strict mode enabled
- ESLint configured with Next.js recommended rules
- No test framework currently configured
- Node.js 20+ and npm 10+ required per package.json engines