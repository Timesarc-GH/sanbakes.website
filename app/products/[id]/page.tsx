import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPricing } from "../../lib/pricing";
import { categories, findProduct, products } from "../../lib/products";
import { SITE_URL } from "../../lib/site";
import { ProductDetailClient } from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  if (!product || !getPricing(product.id)) notFound();

  const canonical = `${SITE_URL}/products/${product.id}`;
  const image = product.image ? new URL(product.image, SITE_URL).toString() : undefined;
  const description = `${product.description} Preorder from San Bakes in Chennai.`;

  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      url: canonical,
      images: image ? [{ url: image, alt: product.name }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: product.name,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const pricing = getPricing(product.id);
  if (!pricing) notFound();

  const category = categories.find((item) => item.id === product.category);
  const canonical = `${SITE_URL}/products/${product.id}`;
  const image = product.image ? new URL(product.image, SITE_URL).toString() : undefined;
  const offers = pricing.options.filter((option) => option.price !== null).map((option) => ({
    "@type": "Offer",
    name: option.label,
    sku: `${product.id}-${option.id}`,
    url: canonical,
    priceCurrency: "INR",
    price: option.price,
    availability: "https://schema.org/PreOrder",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE_URL}/#bakery` },
  }));
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: product.name,
    description: product.description,
    sku: product.id,
    ...(image ? { image: [image] } : {}),
    brand: { "@type": "Brand", name: "San Bakes" },
    category: category?.name ?? product.category,
    ...(offers.length > 0 ? { offers } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData).replace(/</g, "\\u003c") }}
      />
      <ProductDetailClient
        product={product}
        pricing={pricing}
        category={{ name: category?.name ?? "San Bakes", nameTa: category?.nameTa ?? "San Bakes" }}
      />
    </>
  );
}
