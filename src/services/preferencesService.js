const PREFS_BASE = 'http://localhost:3000';

export const savePreferences = async (payload) => {

  const res = await fetch(`${PREFS_BASE}/api/preferences`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  return { ok: res.ok, status: res.status, data };
};


export default { savePreferences };
