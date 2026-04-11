This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Cloudflare Pages Deployment

This project is optimized for **Cloudflare Pages** using `@opennextjs/cloudflare`.

### Deployment Settings

Ensure the following settings are configured in your Cloudflare Pages project:

- **Framework preset**: `None`
- **Build command**: `npm run build:cf`
- **Build output directory**: `.open-next/assets`
- **Compatibility flags**: `nodejs_compat_v2` (or `nodejs_compat`)
- **Compatibility date**: `2024-11-18` (or later)

### Database Initialization

To initialize your D1 database (`moban-db`), run the following command in your terminal:

```bash
npx wrangler d1 execute moban-db --remote --file=./schema.sql
```

### Static Asset Routing

The build script automatically generates a `_routes.json` file in the output directory to ensure static assets (`/_next/*`) bypass the worker for optimal performance and to avoid 404 errors.
