/**
 * findOrderByIdAndUserId must look up the order using BOTH IDs.
 * readSession supplies the verified session.
 */
export async function getMyOrder(
  orderId,
  findOrderByIdAndUserId,
  readSession
) {
  const session = await readSession();

  if (!session) {
    return { error: "UNAUTHENTICATED", order: null };
  }

  const order = await findOrderByIdAndUserId(
    orderId,
    session.userId
  );

  if (!order) {
    return { error: "NOT_FOUND", order: null };
  }

  return { error: null, order };
}
