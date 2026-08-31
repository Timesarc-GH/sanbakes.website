import type { Metadata } from "next";
export const metadata: Metadata = { title:"Preorder Brownies on WhatsApp", description:"Review a San Bakes preorder cart, send the complete order through WhatsApp and generate an amount-linked UPI QR after confirmation.", alternates:{ canonical:"/preorder" } };
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
