import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://addis-eats.example.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Addis Eats | Ethiopian Food",
    template: "%s | Addis Eats",
  },
  description:
    "Discover Ethiopian favorites at Addis Eats, including traditional dishes, menu details, and prices in Ethiopian birr.",
  openGraph: {
    type: "website",
    siteName: "Addis Eats",
    title: "Addis Eats | Ethiopian Food",
    description:
      "Discover traditional Ethiopian dishes and explore the Addis Eats menu.",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats — Ethiopian food and traditional favorites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food",
    description:
      "Discover traditional Ethiopian dishes and explore the Addis Eats menu.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
