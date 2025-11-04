import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import Step4List from "./Step4List";
import Step4Success from "./Step4Success";

export default function Step4() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [scheduleStarted, setScheduleStarted] = useState(false);

  const username = "admin";
  const webUrl = "http://wp-plugin-site.local";

  // 🔹 Fetch all preview posts
  const fetchPreviewPosts = async () => {
    setLoading(true);
    try {
      const url = `${apiService.endpointBase}/scheduledPost/preview?username=${username}&webUrl=${webUrl}`;
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

  // 🔹 Local edit only
  const handleFieldChange = (postId, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, [field]: value } : p))
    );
    setMessage("💾 Local changes saved (not yet synced)");
  };

  // 🔹 Start schedule → send all updates + mark success
  const handleStartSchedule = async () => {
    try {
      setSaving(true);
      setMessage("⏳ Saving all updates and starting schedule...");

      // Send all modified posts to the server
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

      // Start schedule
      const startUrl = `${apiService.endpointBase}/schedule/start`;
      const { ok } = await apiService.jsonFetch(startUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, webUrl }),
      });

      if (!ok) throw new Error("Failed to start schedule");

      // ✅ Success → show confirmation screen
      setScheduleStarted(true);
      setMessage("🚀 Schedule started successfully!");
      setPosts([]); // Clear posts
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
<<<<<<< Updated upstream
        <div className="text-center text-gray-700">Step4</div>
      
  );
};
=======
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Preview Generated Posts
      </h2>
>>>>>>> Stashed changes

      {message && (
        <div className="text-center text-sm text-blue-600 font-medium">
          {message}
        </div>
      )}

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
