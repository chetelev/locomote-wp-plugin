import React from 'react';
import DateTimeField from './DateTimeField';

const ScheduledDatesField = ({ 
  scheduledDates, 
  onChange, 
  getMinDateTime, 
  isValidDate 
}) => {
  const addDate = () => {
    const newDates = [...scheduledDates, ''];
    onChange({ target: { name: 'scheduledDates', value: newDates } });
  };
  
  const removeDate = (index) => {
    const newDates = scheduledDates.filter((_, i) => i !== index);
    onChange({ target: { name: 'scheduledDates', value: newDates } });
  };
  
  const updateDate = (index, value) => {
    const newDates = [...scheduledDates];
    newDates[index] = value;
    onChange({ target: { name: 'scheduledDates', value: newDates } });
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Scheduled Dates <span className="text-red-500">*</span>
      </label>

      <div className="space-y-4">
        {scheduledDates.map((date, index) => (
          <div key={index} className="flex items-start gap-3">
            <DateTimeField
              name={`date-${index}`}
              value={date}
              onChange={(e) => updateDate(index, e.target.value)}
              minDateTime={getMinDateTime()}
              required={true}
              error={date && !isValidDate(date) ? 'Must be 5+ min in future' : null}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeDate(index)}
              className="h-10 shrink-0 rounded-full border border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addDate}
          className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          + Add New Date
        </button>
      </div>
    </div>
  );
};

export default ScheduledDatesField;
