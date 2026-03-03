// src/app/api/api.js

// Next.js uses process.env.NEXT_PUBLIC_* on the client.
// We'll default to "/api" so the Next dev server can proxy later.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

/**
 * Token storage
 */
const TOKEN_KEY = "tt_token";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getToken() {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function clearToken() {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

/**
 * Low-level request helper
 */
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  // Try to parse json response
  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore non-json
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export function apiGet(path, auth = false) {
  return request(path, { method: "GET", auth });
}

export function apiPost(path, payload, auth = false) {
  return request(path, { method: "POST", body: payload, auth });
}

export function apiPut(path, payload, auth = false) {
  return request(path, { method: "PUT", body: payload, auth });
}