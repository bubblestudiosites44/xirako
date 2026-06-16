const LOCAL_RETURN_HOSTS = [/^localhost$/i, /^127\.0\.0\.1$/i];

export function getRequestedAppName(searchParams) {
  const raw = searchParams.get("app");
  return raw?.trim() || "Xirako";
}

export function isAllowedReturnTo(value) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    if (url.protocol === "https:") {
      return Boolean(url.hostname);
    }

    if (url.protocol === "http:") {
      return LOCAL_RETURN_HOSTS.some((pattern) => pattern.test(url.hostname));
    }

    return false;
  } catch {
    return false;
  }
}

export function buildRelayUrl(returnTo, session, appName) {
  const url = new URL(returnTo);
  const hashParams = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);

  hashParams.set("xirako_access_token", session.access_token);
  hashParams.set("xirako_refresh_token", session.refresh_token);
  hashParams.set("xirako_app", appName);

  if (session.expires_at) {
    hashParams.set("xirako_expires_at", String(session.expires_at));
  }

  if (session.user?.email) {
    hashParams.set("xirako_email", session.user.email);
  }

  url.hash = hashParams.toString();
  return url.toString();
}
