import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Kitchen Dashboard",
  description: "Staff-only kitchen dashboard for managing Addis Eats orders.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/kitchen",
  },
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Fkitchen");
  }

  if (session.role !== "staff") {
    return (
      <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
        <h1>403 — Access denied</h1>
        <p>This page is restricted to staff members.</p>
        <a href="/">Return home</a>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, {session.name}.</p>
      <p>Your verified staff session grants access to this page.</p>
      <a href="/orders">View orders</a>
    </main>
  );
}

export const instant = false;

