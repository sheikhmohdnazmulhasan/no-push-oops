# no-push-oops Documentation Website

Documentation website for **no-push-oops** - a lightweight Git pre-push hook that prevents "oops" moments by running quality checks before every push.

## Features

- 📚 **MDX Documentation** - Write docs with full React component support
- 🌙 **Dark Mode** - Automatic theme switching with system preference detection
- 📱 **Responsive** - Optimized for all device sizes
- ⚡ **Fast** - Built with Next.js 15 and React Server Components
- 🎨 **Timeline Layout** - Chronological documentation with visual timeline
- 🔍 **Type-Safe** - Full TypeScript support

## Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main documentation page
│   ├── metadata.ts         # SEO metadata
│   └── globals.css         # Global styles
├── docs/content/           # MDX documentation files
│   ├── getting-started.mdx # Installation and setup
│   ├── configuration.mdx   # Configuration options
│   ├── usage.mdx           # Usage examples
│   ├── api.mdx             # API reference
│   └── comparison-faq.mdx  # Comparisons and FAQs
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── github-star-button.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/                    # Utilities
│   ├── site.ts             # Site configuration
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── mdx-components.tsx      # MDX component overrides
└── source.config.ts        # Fumadocs configuration
```

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Adding Documentation

Create a new MDX file in `docs/content/`:

```mdx
---
title: "Documentation Title"
description: "Brief description"
date: "2025-01-15"
tags: ["Installation", "Setup"]
version: "1.0"
---

Your documentation content here...

## Heading

Use standard MDX syntax with full React component support.
```

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm format` - Check code formatting
- `pnpm format:write` - Auto-format code

## Tech Stack

- **Framework**: Next.js 15
- **Content**: Fumadocs MDX
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui components
- **TypeScript**: Full type safety

## Deployment

Deploy to any Next.js compatible platform:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## Related

- [no-push-oops](../) - Main package repository
- [GitHub](https://github.com/sheikhmohdnazmulhasan/no-push-oops)

## License

MIT License
