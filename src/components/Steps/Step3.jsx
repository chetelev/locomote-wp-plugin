import React, { useState, useEffect, useCallback } from "react";
import TextAreaField from "../Dashboard/fields/TextAreaField";
import Tones from "./Tones";

const Step3 = ({ formData, onFieldChange, isConnected }) => {
  const [localTopics, setLocalTopics] = useState(formData.topics || "");

  useEffect(() => {
    setLocalTopics(formData.topics || "");
  }, [formData.topics]);

  const handleLocalChange = (e) => {
    setLocalTopics(e.target.value);
  };

  const handleToneChange = useCallback(onFieldChange, [onFieldChange]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-center rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 py-10 px-6 shadow-inner mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-8 w-8 text-blue-600"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Task Details
        </h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Define your topics and preferred writing tone for content creation.
        </p>
      </div>

      {!isConnected ? (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-6 py-5 text-yellow-800 text-center font-medium shadow-sm">
          Please connect first to schedule tasks.
        </div>
      ) : (
        <>
          <TextAreaField
            label="Topics & Keywords"
            name="topics" value={localTopics}
            onChange={handleLocalChange}
            placeholder="Enter topics and keywords…"
            required={true} rows={6}
          />
          <Tones onFieldChange={handleToneChange} selectedTone={formData.toneId} />
        </>
      )}
    </div>
  );
};

export default Step3;
