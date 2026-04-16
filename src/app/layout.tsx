import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { UIProvider } from "@/context/UIContext";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          {/* Rotation Prompt for Mobile */}
          <div className="rotate-prompt">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <div className="rotate-prompt-text">Please rotate your device to landscape for a better gaming experience.</div>
          </div>

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
