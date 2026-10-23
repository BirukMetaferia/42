import { getSession } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Secure Checkout",
  description: "Complete your Addis Eats order through the protected checkout page.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Fcheckout");
  }

  return (
    <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Checkout</h1>
      <p>Welcome, {session.name}.</p>
      <p>Your session has been verified on the server.</p>
      <p>This is the protected checkout page for the Addis Eats mini-project.</p>

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}

export const instant = false;

