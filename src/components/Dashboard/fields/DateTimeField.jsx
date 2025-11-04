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
    <div className={`mb-6 ${className}`}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-[200px] rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="text-[1.05rem] font-medium text-gray-900 mb-2">
            {value ? formatDisplayDate(value) : 'Select date'}
          </div>
          <div className="text-sm font-medium text-blue-600">
            {value ? formatDisplayTime(value) : 'Select time'}
          </div>
        </div>

        <div className="flex flex-1 gap-3">
          <input
            type="date"
            value={value ? new Date(value).toISOString().slice(0, 10) : ''}
            min={minDateTime ? new Date(minDateTime).toISOString().slice(0, 10) : undefined}
            onChange={handleDateChange}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="time"
            value={value ? new Date(value).toTimeString().slice(0, 5) : ''}
            onChange={handleTimeChange}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {error && (
        <small className="mt-2 block rounded border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </small>
      )}
    </div>
  );
};

export default DateTimeField;
