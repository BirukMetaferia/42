"use server";

import { getSession } from "@/lib/session";
import { cancelOrderForUser } from "@/lib/orders";
import { redirect } from "next/navigation";

export async function cancelOrder(formData) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Forders");
  }

  const orderId = formData.get("orderId");

  if (
    typeof orderId !== "string" ||
    orderId.length > 100 ||
    !cancelOrderForUser(orderId, session.id)
  ) {
    redirect("/orders?error=order-not-found");
  }

  redirect("/orders?cancelled=1");
}
