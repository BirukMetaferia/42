# Addis Eats — Authentication and Authorization

## 1. Authentication design

- `lib/session.js` is server-only and creates and verifies signed session tokens.
- Session tokens are signed with `AUTH_SECRET`, which must be configured as a sufficiently long secret in the environment.
- `getSession()` reads the session cookie and verifies its signature, expiration, and user data before returning a session.
- `lib/users.js` verifies demo-user passwords using scrypt password hashes.
- `app/actions/auth.js` handles sign-in and sign-out through Server Actions.

## 2. Session cookie security

The `session` cookie is configured with:

- `httpOnly: true` — client-side JavaScript cannot read the cookie.
- `secure: true` in production — the cookie is sent only over HTTPS.
- `sameSite: "lax"` — provides a defense against cross-site request forgery.
- `maxAge: SESSION_MAX_AGE` — limits the session lifetime.
- `path: "/"` — makes the cookie available throughout the application.

The session token is verified on the server. A cookie's presence alone is not proof of a valid session.

## 3. Protected routes and authorization

| Route | Protection |
|---|---|
| `/checkout` | Server-side session check |
| `/orders` | Server-side session check and user-scoped order query |
| `/kitchen` | Server-side session check and staff-role check |
| Server Action: `cancelOrder` | Rechecks the session and verifies order ownership before changing an order |

`proxy.js` uses a narrow matcher for `/checkout/:path*` and `/orders/:path*`. Static assets and unrelated routes are excluded.

Server Action POST requests are allowed to reach their own authorization checks. This is intentional: each protected action must independently authenticate and authorize the request.

## 4. Redirect validation

`safeNextPath` accepts only allowed local application paths. It rejects absolute external URLs, protocol-relative URLs, and backslash-based redirect attempts. Sign-in must not redirect users to an arbitrary external destination.

## 5. Order ownership

`lib/orders.js` filters orders by the authenticated user's ID. Order cancellation looks up the requested order using both the order ID and the authenticated user's ID. A missing order or an order owned by another user is rejected.

Every private page checks the session during rendering. Protected mutations also perform their own server-side authorization checks.

## 6. Kitchen authorization

`app/kitchen/page.js` checks the authenticated session on the server and permits only the `staff` role. Customers are denied access even if they navigate directly to `/kitchen`.

## 7. Security test evidence

Tests performed in the local browser:

- **Signed-out Server Action:** After signing out in another tab, submitting the stale cancellation form redirected to sign-in. After signing in again, `order-1001` remained `PREPARING`.
- **Order ID tampering:** Changed the cancellation form's order ID from `order-1001` to `order-2001`. The server displayed `Order not found or you are not allowed to modify it.` The customer's own order remained `PREPARING`.
- **External redirect:** Tried signing in with an external `next` destination. Navigation remained within the local application.
- **HttpOnly cookie:** `document.cookie` returned an empty string while the session was active.
- **Kitchen role check:** Customer access was denied; staff access succeeded.
- **Client bundle secret check:** The production build's `.next/static` assets did not contain the string `AUTH_SECRET`.
- **Proxy matcher:** Configuration is limited to `/checkout/:path*` and `/orders/:path*`.

## 8. Production considerations

- Set a unique, strong `AUTH_SECRET` in the production environment. Never expose it through a `NEXT_PUBLIC_` variable or commit secrets to source control.
- Configure HTTPS in production and ensure the production cookie uses `secure: true`.
- Keep password hashes and authentication logic on the server.
- The example order repository stores orders in memory. It is suitable for this security exercise, not production persistence. A real deployment must use a persistent database and enforce ownership in database queries and transactions.
- Use persistent, trusted user records and appropriate operational controls before deploying a real ordering system.

## 9. Verification commands

Run the production build:

```powershell
npm.cmd run build
```

Check the client bundle for the secret name:

```powershell
node -e "const fs=require('fs'),path=require('path'); const root='.next/static'; let found=false; function walk(p){if(!fs.existsSync(p))return; for(const e of fs.readdirSync(p,{withFileTypes:true})){const f=path.join(p,e.name); if(e.isDirectory())walk(f); else if(fs.readFileSync(f,'utf8').includes('AUTH_SECRET'))found=true;}} walk(root); console.log(found?'CHECK FAILED: AUTH_SECRET appears in client assets.':'PASS: AUTH_SECRET was not found in client assets.');"
```
