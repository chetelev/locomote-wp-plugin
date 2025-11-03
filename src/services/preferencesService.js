const PREFS_BASE = 'http://localhost:3000';

const jsonFetch = async (url, opts = {}) => {
  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
};

export const savePreferences = async (payload) => {
  console.log("Sending to backend:", payload);

  const res = await fetch(`${PREFS_BASE}/api/preferences`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  console.log("Backend response:", data);

  return { ok: res.ok, status: res.status, data };
};


export default { savePreferences };
