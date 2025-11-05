import React, { useState, useEffect } from "react";
import TextAreaField from '../Dashboard/fields/TextAreaField';
import Tones from "./Tones";

const Step3 = ({ formData, onFieldChange, isConnected }) => {

  const [localTopics, setLocalTopics] = useState(formData.topics || "");

  useEffect(() => {
    setLocalTopics(formData.topics || "");
  }, [formData.topics]);

  const handleLocalChange = (e) => {
    setLocalTopics(e.target.value);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-blue-600">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      <h3 className="mb-3 text-center text-xl font-semibold text-gray-900">
        Task Details
      </h3>

      {!isConnected ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-700 text-center font-medium">
          ⚠️ Please connect first to schedule tasks.
        </div>
      ) : (
        <>
          <TextAreaField
            label="Topics & Keywords"
            name="topics"
            value={localTopics}
            onChange={handleLocalChange}
            placeholder="Enter topics and keywords…"
            required={true}
            rows={6}
          />

          <Tones
            onFieldChange={onFieldChange}
            selectedTone={formData.toneId}
          />
        </>
      )}
    </div>
  );
};

export default Step3;
