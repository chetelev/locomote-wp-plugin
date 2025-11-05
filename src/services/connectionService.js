import api from "./apiService";

const wpAjaxUrl =
  (window.wpPluginReactConfig && window.wpPluginReactConfig.ajaxUrl) ||
  "/wp-admin/admin-ajax.php";

export const generateAppPassword = async () => {
  const body = new URLSearchParams();
  body.append("action", "locomote_generate_app_password");

  const res = await fetch(wpAjaxUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: body.toString(),
    credentials: "same-origin",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.success) {
    throw new Error(json?.data?.message || "Failed to generate app password");
  }
  const d = json.data || {};
  return {
    webUrl: d.webUrl || d.wp_url,
    username: d.username || d.wp_username,
    appPassword: d.appPassword || d.wp_app_password,
    email: d.email || d.wp_email,
  };
};

export const registerConnection = async (creds) => {
  const url = `${api.endpointBase}/connect`;

  const payload = {
    webUrl: creds.webUrl,
    username: creds.username,
    appPassword: creds.appPassword,
    email: creds.email,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Connection registration failed:", errorText);
    throw new Error("Failed to register connection with backend");
  }

  const data = await res.json();
  return data;
};

export const checkStatus = async ({ username, webUrl }) => {
  if (!username || !webUrl) {
    throw new Error("Missing required parameters for checkStatus");
  }

  const qs = new URLSearchParams({ username, webUrl }).toString();
  const url = `${api.endpointBase}/connect/status?${qs}`;

  const res = await fetch(url, { method: "GET", credentials: "include" });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Status check failed:", errorText);
    throw new Error("Failed to check connection status");
  }

  const data = await res.json();
  return data;
};

export default {
  generateAppPassword,
  registerConnection,
  checkStatus,
};
