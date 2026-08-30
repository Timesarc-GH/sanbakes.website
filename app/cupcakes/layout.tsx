import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cupcakes",
  description: "Order San Bakes Cupcakes in boxes of 6, 9 and 12, with individual holders, flavour selections and WhatsApp checkout.",
};

export default function CupcakesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
