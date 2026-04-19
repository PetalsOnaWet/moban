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
    default: "Unblocked Games 76 - Play Best Free Online Games",
    template: `%s | Unblocked Games 76`,
  },
  description: "Play the best unblocked games 76 online for free. Experience a massive collection of rhythm, action, and puzzle games unblocked for school and work.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Unblocked Games 76",
    title: "Unblocked Games 76 - Play Best Free Online Games",
    description: "Play the best unblocked games 76 online for free. Experience a massive collection of rhythm, action, and puzzle games unblocked for school and work.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Unblocked Games 76 Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unblocked Games 76 - Play Best Free Online Games",
    description: "Play the best unblocked games 76 online for free. Experience a massive collection of rhythm, action, and puzzle games unblocked for school and work.",
    images: ["/og.png"],
    creator: "@unblockedgames76",
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
            <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
