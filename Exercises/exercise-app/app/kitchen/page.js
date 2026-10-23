import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session.js";

export default function KitchenPage() {
  return (
    <Suspense fallback={<main><p>Loading kitchen...</p></main>}>
      <KitchenContent />
    </Suspense>
  );
}

async function KitchenContent() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }

  if (session.role !== "STAFF") {
    return (
      <main>
        <h1>Access denied</h1>
        <p>This page is for staff members only.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Kitchen</h1>
      <p>Welcome to the staff kitchen page.</p>
    </main>
  );
}

