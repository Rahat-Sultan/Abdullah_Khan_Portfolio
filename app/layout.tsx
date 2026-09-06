import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Orbitron } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abdullah Khan — Digital Marketing Specialist",
    template: "%s — Abdullah Khan",
  },
  description:
    "Portfolio of Abdullah Khan, Digital Marketing Specialist in Islamabad — social media, Meta Ads, WordPress, and analytics.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "Abdullah Khan Portfolio",
    title: "Abdullah Khan — Digital Marketing Specialist",
    description:
      "Portfolio of Abdullah Khan, Digital Marketing Specialist in Islamabad — social media, Meta Ads, WordPress, and analytics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Khan — Digital Marketing Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Khan — Digital Marketing Specialist",
    description:
      "Portfolio of Abdullah Khan, Digital Marketing Specialist in Islamabad — social media, Meta Ads, WordPress, and analytics.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${orbitron.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ak-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`,
          }}
        />
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
