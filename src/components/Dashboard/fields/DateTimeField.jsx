import React, { useState } from 'react';

const DateTimeField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  minDateTime,
  required = false,
  className = "",
  error = null
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatDisplayTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const currentTime = value ? new Date(value).toTimeString().slice(0, 5) : '12:00';
    const newDateTime = newDate ? `${newDate}T${currentTime}` : '';
    onChange({ target: { name, value: newDateTime } });
  };
  
  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    const currentDate = value ? new Date(value).toISOString().slice(0, 10) : '';
    const newDateTime = currentDate ? `${currentDate}T${newTime}` : '';
    onChange({ target: { name, value: newDateTime } });
  };

  return (
    <div className={`lc-input-group ${className}`}>
      <label className="lc-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="lc-datetime-container">
        <div className="lc-datetime-display">
          <div className="lc-date-display">
            {value ? formatDisplayDate(value) : 'Select date'}
          </div>
          <div className="lc-time-display">
            {value ? formatDisplayTime(value) : 'Select time'}
          </div>
        </div>
        
        <div className="lc-datetime-inputs">
          <input
            type="date"
            value={value ? new Date(value).toISOString().slice(0, 10) : ''}
            min={minDateTime ? new Date(minDateTime).toISOString().slice(0, 10) : undefined}
            onChange={handleDateChange}
            className="lc-date-input"
          />
          <input
            type="time"
            value={value ? new Date(value).toTimeString().slice(0, 5) : ''}
            onChange={handleTimeChange}
            className="lc-time-input"
          />
        </div>
      </div>
      
      {error && (
        <small className="lc-error">
          {error}
        </small>
      )}
    </div>
  );
};

export default DateTimeField;
