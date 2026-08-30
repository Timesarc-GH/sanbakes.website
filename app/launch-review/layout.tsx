import type { Metadata } from "next";
export const metadata: Metadata = { title:"Owner Launch Review", description:"Private San Bakes menu, quantity and pricing recommendations for owner approval.", robots:{ index:false, follow:false } };
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
