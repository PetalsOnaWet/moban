export const siteConfig = {
  name: "Unblocked Games 76",
  description: "Play the best unblocked games 76 online for free. Massive collection of browser games for school and work.",
  url: "https://unblocked-games-76.space",
  ogImage: "https://unblocked-games-76.space/og.png",
  author: "Unblocked Games 76",
  
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
    buyMeACoffee: "unblockedgames76",
  },

  // Social Links
  links: {
    twitter: "https://twitter.com/unblocked76",
    github: "https://github.com/unblockedgames76",
    discord: "https://discord.gg/unblocked",
  },

  // Keywords (SEO Expert Optimization)
  keywords: [
    "unblocked games 76",
    "unblocked games",
    "free online games",
    "games for school",
    "best browser games",
    "unblocked games 76 space",
  ],
};

export type SiteConfig = typeof siteConfig;
