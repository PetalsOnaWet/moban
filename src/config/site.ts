export const siteConfig = {
  name: "CloudTemplate Pro",
  description: "High-performance website template built with Next.js 16 and Cloudflare.",
  url: "https://yourdomain.com",
  ogImage: "https://yourdomain.com/og.png",
  author: "Your Name",
  
  // Theme Configuration
  theme: "linear", // Options: 'linear', 'stripe', 'vercel'
  
  // Feature Flags
  features: {
    enableComments: true,
    enableRatings: true,
    enableAuth: false, // Set to true to activate SaaS features
    enablePayments: false,
    enableNewsletter: true,
  },

  // Analytics & Tracking
  analytics: {
    google: "G-XXXXXXXXXX", // Google Analytics 4 ID
    clarity: "XXXXXXXXXX", // Microsoft Clarity ID
  },

  // Monetization
  monetization: {
    adsense: {
      client: "ca-pub-XXXXXXXXXXXXXXXX",
      slots: {
        sidebar: "XXXXXXXXXX",
        content: "XXXXXXXXXX",
      },
    },
    buyMeACoffee: "yourusername",
  },

  // Social Links
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    discord: "https://discord.gg/yourlink",
  },

  // Keywords (SEO Expert Optimization)
  keywords: [
    "Next.js 16",
    "Cloudflare Pages",
    "SaaS Template",
    "Linear Design",
    "Atomic CSS",
    "D1 Database",
  ],
};

export type SiteConfig = typeof siteConfig;
