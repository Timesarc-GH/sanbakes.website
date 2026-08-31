import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { InventoryProvider } from "./components/InventoryProvider";
import { PreorderProvider } from "./components/PreorderProvider";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { SITE_URL } from "./lib/site";

const bakeryStructuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${SITE_URL}/#bakery`,
  name: "San Bakes Chennai",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  telephone: "+91 99400 58623",
  priceRange: "₹₹",
  sameAs: ["https://www.instagram.com/san.homebakes/"],
  areaServed: { "@type": "City", name: "Chennai" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600117",
    addressCountry: "IN",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Order Brownies Online in Chennai | San Bakes",
    template: "%s | San Bakes",
  },
  description:
    "Preorder small-batch brownies, Brownie Tins, Brownie Tubs, millet tea cakes and brownie birthday cakes from Keelkattalai, Chennai.",
  icons: { icon: "/brand/san-bakes-logo.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "SAN BAKES",
    description: "Dark chocolate. Ancient grains. Baked after you order.",
    type: "website",
    url: "/",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "San Bakes — dark chocolate, ancient grains, baked after you order" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAN BAKES",
    description: "Dark chocolate. Ancient grains. Baked after you order.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryStructuredData) }} />
        <LanguageProvider>
          <InventoryProvider>
            <PreorderProvider>
              <SiteHeader />
              {children}
              <SiteFooter />
              <WhatsAppFloat />
            </PreorderProvider>
          </InventoryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
