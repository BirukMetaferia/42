import "server-only";

// Demo data for the Day 42 security exercise.
// In-memory data is for learning and testing, not production persistence.
const orders = [
  {
    id: "order-1001",
    userId: "customer-001",
    item: "Injera combo",
    status: "PREPARING",
  },
  {
    id: "order-2001",
    userId: "customer-002",
    item: "Shiro combo",
    status: "PREPARING",
  },
];

export async function getOrdersForUser(authenticatedUserId) {
  return orders.filter((order) => order.userId === authenticatedUserId);
}

export function getOrderForUser(orderId, authenticatedUserId) {
  return (
    orders.find(
      (order) =>
        order.id === orderId && order.userId === authenticatedUserId
    ) ?? null
  );
}

export function cancelOrderForUser(orderId, authenticatedUserId) {
  const order = getOrderForUser(orderId, authenticatedUserId);

  if (!order || order.status === "CANCELLED") {
    return false;
  }

  order.status = "CANCELLED";
  return true;
}
