import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Console",
  description: "Owner-only San Bakes product availability controls.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
