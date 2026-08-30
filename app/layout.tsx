import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { InventoryProvider } from "./components/InventoryProvider";
import { PreorderProvider } from "./components/PreorderProvider";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "San Bakes | Small-Batch Brownies in Chennai",
    template: "%s | San Bakes",
  },
  description:
    "Preorder small-batch brownies, Brownie Tins, Brownie Tubs, millet tea cakes and brownie birthday cakes from Keelkattalai, Chennai.",
  icons: { icon: "/brand/san-bakes-logo.jpg" },
  openGraph: {
    title: "SAN BAKES",
    description: "Dark chocolate. Ancient grains. Baked after you order.",
    type: "website",
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
