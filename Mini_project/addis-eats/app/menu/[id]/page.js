import { notFound } from "next/navigation";
import { dishes, getDishById } from "@/lib/dishes";

const siteUrl = "https://addis-eats.example.com";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish is not available on the Addis Eats menu.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: dish.name,
    description: dish.description,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      url: `${siteUrl}/menu/${dish.id}`,
      type: "website",
      images: [`${siteUrl}/menu/${dish.id}/opengraph-image`],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price.toString(),
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/menu/${dish.id}`,
    },
  };

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a href="/menu">? Back to menu</a>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p><strong>{dish.price.toLocaleString("en-ET")} ETB</strong></p>
    </main>
  );
}

