import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { UIProvider } from "@/context/UIContext";
import { RotatePrompt } from "@/components/layout/RotatePrompt";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/SchemaMarkup";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Geometry Dash Lite - Play Online for Free",
    template: `%s | Geometry Dash Lite`,
  },
  description: "Play Geometry Dash Lite online for free. Experience the ultimate rhythm-based platformer with intense levels and addictive gameplay.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Geometry Dash Lite", "Geometry Dash", "Rhythm Games", "Play Online", "Free Games"],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Geometry Dash Lite",
    title: "Geometry Dash Lite - Play Online for Free",
    description: "Experience the ultimate rhythm-based platformer. Play Geometry Dash Lite online for free with intense levels and addictive gameplay.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Geometry Dash Lite Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geometry Dash Lite - Play Online for Free",
    description: "Experience the ultimate rhythm-based platformer. Play Geometry Dash Lite online for free with intense levels and addictive gameplay.",
    images: ["/og.png"],
    creator: "@geometrydashlite",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrganizationSchema />
        <WebSiteSchema />
        <UIProvider>
          {/* Rotation Prompt for Mobile */}
          <RotatePrompt />

          <Navbar />
          <div className="layout-wrapper">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Right Main Area */}
            <main style={{ flex: 1, minWidth: 0 }}>
              {children}
            </main>
          </div>
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
}
