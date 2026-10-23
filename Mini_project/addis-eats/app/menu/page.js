import Link from "next/link";
import { dishes } from "@/lib/dishes";

export const metadata = {
  title: "Ethiopian Menu",
  description:
    "Explore Ethiopian favorites at Addis Eats, including Doro Wat, Shiro, and Tibs, with menu prices in Ethiopian birr.",
  alternates: {
    canonical: "/menu",
  },
};

export default function MenuPage() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <h1>Explore Our Ethiopian Menu</h1>
      <p>Discover traditional Ethiopian dishes made for sharing.</p>

      <section
        aria-label="Available dishes"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {dishes.map((dish) => (
          <article
            key={dish.id}
            style={{ border: "1px solid #ddd", borderRadius: 12, padding: 20 }}
          >
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>
              <strong>
                {dish.price.toLocaleString("en-ET")} ETB
              </strong>
            </p>
            <Link href={`/menu/${dish.id}`}>View dish details</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
