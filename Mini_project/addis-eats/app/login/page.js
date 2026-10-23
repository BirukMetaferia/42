import { signIn } from "@/app/actions/auth";

export const metadata = {
  title: "Sign In",
  description: "Sign in to access your private Addis Eats account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  const next = typeof params?.next === "string" ? params.next : "/";

  return (
    <main style={{
      maxWidth: "420px",
      margin: "80px auto",
      padding: "32px",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      borderRadius: "12px"
    }}>
      <h1>Sign in to Addis Eats</h1>
      <p>Use a demo account to access the application.</p>

      {error && (
        <p role="alert" style={{ color: "crimson" }}>
          Sign-in failed. Check your username and password.
        </p>
      )}

      <form action={signIn}>
        <input type="hidden" name="next" value={next} />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          maxLength={100}
          style={{ display: "block", width: "100%", padding: "10px", margin: "8px 0 16px" }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          style={{ display: "block", width: "100%", padding: "10px", margin: "8px 0 20px" }}
        />

        <button type="submit" style={{ padding: "10px 18px", cursor: "pointer" }}>
          Sign in
        </button>
      </form>
    </main>
  );
}

export const instant = false;

