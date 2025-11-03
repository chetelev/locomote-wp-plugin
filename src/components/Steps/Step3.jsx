import React from "react";
import TextAreaField from '../Dashboard/fields/TextAreaField';
import DateTimeField from '../Dashboard/fields/DateTimeField';

const Step3 = ({
  formData,
  onFieldChange,
  isConnected
}) => {

  // Get minimum datetime (5 minutes from now)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    return now.toISOString().slice(0, 16);
  };

  // Validate if a date is at least 5 minutes in the future
  const isValidDate = (dateString) => {
    if (!dateString.trim()) return true;
    const date = new Date(dateString);
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 5 * 60 * 1000);
    return date >= minDateTime;
  };

  

  return (
    <div className="lc-step-content">
      <div className="icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '40px', height: '40px', color: '#2563eb' }}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <h3>Task Details</h3>
      <p className="description">
        Specify the topics and keywords for your automated publishing task.
      </p>

      {!isConnected ? (
        <div className="lc-not-connected">
          ⚠️ Please connect first to schedule tasks.
        </div>
      ) : (
        <>
          <TextAreaField
            label="Topics & Keywords"
            name="topics"
            value={formData.topics}
            onChange={onFieldChange}
            placeholder="Enter topics and keywords, one per line or separated by commas..."
            required={true}
            rows={6}
          />
        </>
      )}
    </div>
  );
};

export default Step3;
