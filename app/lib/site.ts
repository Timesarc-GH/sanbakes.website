export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://san-bakes-chennai.timesarctech.chatgpt.site").replace(/\/$/, "");

export const publicRoutes = [
  "/",
  "/menu",
  "/cupcakes",
  "/parties",
  "/gifting",
  "/corporate",
  "/about",
  "/delivery",
  "/faq",
  "/policies",
  "/preorder",
] as const;
