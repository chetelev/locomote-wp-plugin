import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import Step4List from "./Step4List";
import Step4Success from "./Step4Success";

export default function Step4({ username, webUrl }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [scheduleStarted, setScheduleStarted] = useState(false);

  const fetchPreviewPosts = async () => {
    setLoading(true);
    try {
      const url = `${apiService.endpointBase}/scheduledPost/preview?username=${username}&webUrl=${webUrl}`;
      console.log()
      const { ok, data } = await apiService.jsonFetch(url);
      if (!ok) throw new Error("Failed to load preview posts");
      setPosts(data);
    } catch (err) {
      console.error("Error fetching preview posts:", err);
      setError("Failed to load preview posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviewPosts();
  }, []);

  const handleFieldChange = (postId, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, [field]: value } : p))
    );
  };

  const handleStartSchedule = async () => {
    try {
      setSaving(true);

      for (const post of posts) {
        const url = `${apiService.endpointBase}/scheduledPost/${post.id}?username=${username}&webUrl=${webUrl}`;
        await apiService.jsonFetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: post.title,
            description: post.description,
            publishDate: post.publishDate,
          }),
        });
      }

      const startUrl = `${apiService.endpointBase}/schedule/start`;
      const { ok } = await apiService.jsonFetch(startUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, webUrl }),
      });

      if (!ok) throw new Error("Failed to start schedule");

      setScheduleStarted(true);
      setPosts([]);
    } catch (err) {
      console.error("Error starting schedule:", err);
      setError("Failed to save updates or start schedule.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading preview posts...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (scheduleStarted)
    return <Step4Success />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Preview Generated Posts
      </h2>

      <Step4List posts={posts} onFieldChange={handleFieldChange} />

      <div className="flex justify-center mt-8">
        <button
          onClick={handleStartSchedule}
          disabled={saving}
          className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow disabled:bg-gray-400"
        >
          {saving ? "Starting..." : "🚀 Start Schedule"}
        </button>
      </div>
    </div>
  );
}
