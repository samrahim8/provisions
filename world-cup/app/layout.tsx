import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Player Card · Provisions Series",
  description: "The player card for the rest of us. Pick a country, snap a photo, share it with your squad. Issue 01 of the Provisions Series, summer '26.",
  metadataBase: new URL("https://provisions.work"),
  alternates: { canonical: "/world-cup/card-generator" },
  openGraph: {
    title: "The Player Card · Provisions Series",
    description: "The player card for the rest of us. Pick a country, snap a photo, share it with your squad.",
    url: "https://provisions.work/world-cup/card-generator",
    siteName: "Provisions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Player Card · Provisions Series",
    description: "The player card for the rest of us.",
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
