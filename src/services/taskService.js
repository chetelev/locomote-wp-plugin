import api from './apiService';

const startSchedule = async (payload) => {
    const url = `${api.endpointBase}/schedule/start`;
    try {
        const { ok, data, status } = await api.jsonFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        console.log('Schedule - Response:', { ok, status, data });
        return { ok, message: data?.message, data };
    } catch (error) {
        console.error('Schedule - Error:', error);
        return { ok: false, message: error.message, data: null };
    }
};

const getTasks = async (connectData) => {
    const params = new URLSearchParams({
        webUrl: connectData?.webUrl || '',
        username: connectData?.username || '',
    }).toString();

    const url = `${api.endpointBase}/scheduledPost/scheduled?${params}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('Schedule - Get Tasks Error:', text);
            return { ok: false, data: null, status: res.status };
        }

        const data = await res.json();
        return { ok: true, data, status: res.status };
    } catch (error) {
        console.error('Schedule - Get Tasks Error:', error);
        return { ok: false, data: null, status: 500 };
    }
};


const cancelTask = async (id, userId, username, webUrl) => {
  const url = `${api.endpointBase}/scheduledPost/cancel`;

  try {
    const { ok, data } = await api.jsonFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        userId,
        username,
        webUrl
      }),
    });

    return { ok, message: data?.message, data };
  } catch (error) {
    console.error("ScheduledPost - Cancel Error:", error);
    return { ok: false, message: error.message, data: null };
  }
};


export default { startSchedule, getTasks, cancelTask };
