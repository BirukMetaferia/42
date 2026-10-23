import { Suspense } from "react";
import { signIn } from "./actions.js";

export default function SignInPage({ searchParams }) {
  return (
    <Suspense fallback={<main><p>Loading sign-in...</p></main>}>
      <SignInContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SignInContent({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "/";
  const hasError = params?.error === "invalid";

  return (
    <main>
      <h1>Sign in</h1>
      <p>Exercise-only mock authentication. Do not use real passwords.</p>

      {hasError && (
        <p role="alert">Invalid exercise username or password.</p>
      )}

      <form action={signIn}>
        <label>
          Username
          <input name="username" autoComplete="username" required />
        </label>

        <br />

        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        <br />

        <label>
          Role
          <select name="role" defaultValue="CUSTOMER">
            <option value="CUSTOMER">Customer</option>
            <option value="STAFF">Staff</option>
          </select>
        </label>

        <input type="hidden" name="next" value={next} />

        <br />

        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
