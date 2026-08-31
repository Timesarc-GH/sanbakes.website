import type { MetadataRoute } from "next";
import { publicRoutes, SITE_URL } from "./lib/site";
import { products } from "./lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publicRoutes.map((route, index) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: index === 0 ? 1 : route === "/menu" || route === "/cupcakes" ? 0.9 : 0.7,
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...productPages];
}
