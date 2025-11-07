import api from "./apiService";

export const savePreferences = async (payload) => {

  const res = await fetch(`${api.endpointBase}/preferences`, {
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
