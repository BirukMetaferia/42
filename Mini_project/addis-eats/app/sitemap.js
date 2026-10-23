import { dishes } from "@/lib/dishes";

const siteUrl = "https://addis-eats.example.com";

export default function sitemap() {
  const publicPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const dishPages = dishes.map((dish) => ({
    url: `${siteUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...publicPages, ...dishPages];
}
