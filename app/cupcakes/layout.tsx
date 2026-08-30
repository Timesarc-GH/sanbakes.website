import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cupcakes · Planned Launch",
  description: "Preview the planned San Bakes cupcake collection in boxes of 6, 9 and 12, with transport-conscious finishes and clear validation gates.",
};

export default function CupcakesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
