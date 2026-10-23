import { getSession } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import Link from "next/link";

export const metadata = {
  title: "Ethiopian Food and Traditional Favorites",
  description: "Explore the Addis Eats Ethiopian menu, discover traditional dishes, and view prices in Ethiopian birr.",
  alternates: {
    canonical: "/",
  },
};

export const instant = false;

export default async function HomePage() {
  const session = await getSession();

  return (
    <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Addis Eats</h1>
      <p><Link href="/menu">Explore Our Menu</Link></p>
      <p>Day 42 — Securing the application</p>

      {session ? (
        <>
          <p>Signed in as <strong>{session.name}</strong> ({session.role}).</p>

          <ul>
            <li><Link href="/checkout">Checkout</Link></li>
            <li><Link href="/orders">My Orders</Link></li>
            <li><Link href="/kitchen">Kitchen Dashboard</Link></li>
          </ul>

          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        <>
          <p>You are signed out.</p>
          <Link href="/login">Sign in</Link>
        </>
      )}
    </main>
  );
}


