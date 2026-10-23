export function getSafeRedirect(next) {
  if (
    typeof next !== "string" ||
    !next.startsWith("/") ||
    next.startsWith("//") ||
    next.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(next, "http://localhost");

    if (url.origin !== "http://localhost") {
      return "/";
    }

    return url.pathname + url.search + url.hash;
  } catch {
    return "/";
  }
}
