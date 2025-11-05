import api from './apiService';

const generateSchedule = async ({ username, webUrl, topics, toneId = null }) => {
    const url = `${api.endpointBase}/schedule/generate`;

    try {

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, webUrl, topics, toneId }),
            credentials: "include",
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            console.error("Failed to generate schedule:", data);
            return { ok: false, status: res.status, message: data?.message || "Schedule generation failed", data: null };
        }

        return {
            ok: true,
            status: res.status,
            message: data?.message || "Schedule generated successfully",
            data: data,
        };

    } catch (error) {
        console.error("ScheduleService error:", error);
        return { ok: false, status: 500, message: error.message, data: null };
    }
};

const getPreviewPosts = async ({ username, webUrl }) => {
    const qs = new URLSearchParams({
        username,
        webUrl,
    }).toString();

    const url = `${api.endpointBase}/scheduledPost/preview?${qs}`;

    try {
        const res = await fetch(url, { method: "GET", credentials: "include" });
        const data = await res.json().catch(() => ([]));
        if (!res.ok) {
            return { ok: false, status: res.status, message: data?.message || "Failed to fetch previews", data: [] };
        }
        return { ok: true, status: res.status, data };
    } catch (err) {
        console.error("getPreviewPosts error:", err);
        return { ok: false, status: 500, message: err.message, data: [] };
    }
};

const updatePost = async (postId, { username, webUrl, title, description, publishDate }) => {
    const url = `${api.endpointBase}/scheduledPost/${postId}?username=${encodeURIComponent(username)}&webUrl=${encodeURIComponent(webUrl)}`;
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title, description, publishDate }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            return { ok: false, status: res.status, message: data?.message || "Failed to update post", data: null };
        }
        return { ok: true, status: res.status, message: data?.message || "Post updated", data };
    } catch (err) {
        console.error("updatePost error:", err);
        return { ok: false, status: 500, message: err.message, data: null };
    }
};

export default {
    generateSchedule,
    getPreviewPosts,
    updatePost,
};

