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

- **Tailwind CSS**: Primary styling framework with custom configuration
- **Design Theme**: Dark gradient backgrounds (blue to slate) with gold/orange accent colors
- **Typography**: Geist Sans and Geist Mono fonts from Google Fonts
- **Glass Effect**: Custom glass morphism styles for modern UI elements

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