import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import Step4List from "./Step4List";
import Step4Success from "./Step4Success";
import dayjs from "dayjs";

export default function Step4({ username, webUrl }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [scheduleStarted, setScheduleStarted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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

  const handleFieldChange = (postId, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, [field]: value } : p))
    );
  };

  const validatePosts = (postsToValidate = posts) => {
    const newErrors = {};
    const now = dayjs();
    const maxDate = now.add(1, "month");

    postsToValidate.forEach((post) => {
      const errs = [];

      if (!post.title?.trim()) errs.push("Title is required");
      if (!post.description?.trim()) errs.push("Description is required");

      const date = dayjs(post.publishDate);
      if (!date.isValid()) errs.push("Invalid date");
      else {
        if (date.isBefore(now)) errs.push("Date cannot be in the past");
        if (date.isAfter(maxDate)) errs.push("Date cannot be more than 30 days ahead");
      }

      if (errs.length > 0) newErrors[post.id] = errs;
    });

    setValidationErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    if (posts.length > 0) validatePosts(posts);
  }, [posts]);

  const handleStartSchedule = async () => {
    if (!isValid) return;

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
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Preview Generated Posts
        </h2>
        <p className="text-gray-500 text-sm">
          Review and adjust your generated posts before starting the schedule.
        </p>
      </div>

      <Step4List
        posts={posts}
        onFieldChange={handleFieldChange}
        validationErrors={validationErrors}
      />

      <div className="flex justify-center mt-8">
        <button
          onClick={handleStartSchedule}
          disabled={!isValid || saving}
          title={!isValid ? "Please fix the highlighted errors first" : ""}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow transition-all duration-200 active:scale-95 
            ${
              !isValid || saving
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
        >
          {saving ? "Starting..." : "Start Schedule"}
        </button>
      </div>
    </div>
  );
}
