import type { Metadata } from "next";
import "./globals.css";

const OG_IMAGE = "https://provisions.soccer/card/api/og";

export const metadata: Metadata = {
  title: "A lineup of goods for '26 — Provisions",
  description: "Summer '26 products for brands, agencies + fans. Pick a country, snap a photo, share it with your squad.",
  metadataBase: new URL("https://provisions.work"),
  alternates: { canonical: "/world-cup/card-generator" },
  openGraph: {
    title: "A lineup of goods for '26 — Provisions",
    description: "Summer '26 products for brands, agencies + fans. Pick a country, snap a photo, share it with your squad.",
    url: "https://provisions.soccer/card",
    siteName: "Provisions",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A lineup of goods for '26 — Provisions",
    description: "Summer '26 products for brands, agencies + fans.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
