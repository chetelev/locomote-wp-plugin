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
    <div className="lc-input-group">
      <label className="lc-label">
        Scheduled Dates <span className="text-red-500">*</span>
      </label>
      
      <div className="lc-scheduled-dates">
        {scheduledDates.map((date, index) => (
          <div key={index} className="lc-date-item">
            <DateTimeField
              name={`date-${index}`}
              value={date}
              onChange={(e) => updateDate(index, e.target.value)}
              minDateTime={getMinDateTime()}
              required={true}
              error={date && !isValidDate(date) ? 'Must be 5+ min in future' : null}
            />
            <button
              type="button"
              onClick={() => removeDate(index)}
              className="lc-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addDate}
          className="lc-add-btn"
        >
          + Add New Date
        </button>
      </div>
    </div>
  );
};

export default ScheduledDatesField;
