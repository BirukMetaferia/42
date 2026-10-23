import { test } from "node:test";
import assert from "node:assert/strict";
import { getMyOrder } from "./orders.js";

const mockOrders = [
  { id: "order-1", userId: "user-1", item: "Dish A" },
  { id: "order-2", userId: "user-2", item: "Dish B" },
];

async function findOrderByIdAndUserId(orderId, userId) {
  return mockOrders.find(
    (order) => order.id === orderId && order.userId === userId
  ) ?? null;
}

test("allows a user to read their own order", async () => {
  const result = await getMyOrder(
    "order-1",
    findOrderByIdAndUserId,
    async () => ({ userId: "user-1" })
  );

  assert.equal(result.error, null);
  assert.equal(result.order.id, "order-1");
});

test("prevents a user from reading another user's order", async () => {
  const result = await getMyOrder(
    "order-2",
    findOrderByIdAndUserId,
    async () => ({ userId: "user-1" })
  );

  assert.equal(result.error, "NOT_FOUND");
  assert.equal(result.order, null);
});

test("rejects an unauthenticated request", async () => {
  const result = await getMyOrder(
    "order-1",
    findOrderByIdAndUserId,
    async () => null
  );

  assert.equal(result.error, "UNAUTHENTICATED");
  assert.equal(result.order, null);
});
