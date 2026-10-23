import { getSession } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { cancelOrder } from "@/app/actions/orders";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "@/lib/orders";

export const metadata = {
  title: "My Orders",
  description: "View and manage your Addis Eats orders.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/orders",
  },
};

export default async function OrdersPage({ searchParams }) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Forders");
  }

  const params = await searchParams;
  const orders = await getOrdersForUser(session.id);

  return (
    <main style={{ maxWidth: "700px", margin: "60px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>My Orders</h1>
      <p>Signed in as {session.name}.</p>

      {params?.cancelled === "1" && (
        <p role="status">Order cancelled successfully.</p>
      )}

      {params?.error === "order-not-found" && (
        <p role="alert">Order not found or you are not allowed to modify it.</p>
      )}

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "16px" }}>
              <strong>{order.id}</strong> — {order.item} — {order.status}

              {order.status !== "CANCELLED" && (
                <form action={cancelOrder} style={{ display: "inline", marginLeft: "12px" }}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <button type="submit">Cancel order</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}

      <p><a href="/checkout">Go to checkout</a></p>

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}

export const instant = false;

