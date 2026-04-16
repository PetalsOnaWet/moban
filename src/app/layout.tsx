import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Geometry Dash Lite - Play Online for Free",
    template: `%s | Geometry Dash Lite`,
  },
  description: "Play Geometry Dash Lite online for free. Experience the ultimate rhythm-based platformer with intense levels and addictive gameplay.",
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
        <Navbar />
        <div className="layout-wrapper">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Right Main Area */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
