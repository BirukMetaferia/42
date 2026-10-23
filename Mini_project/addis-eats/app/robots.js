const siteUrl = "https://addis-eats.example.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/login", "/orders", "/kitchen"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
