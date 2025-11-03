import React from 'react';
import SelectField from '../Dashboard/fields/SelectField'; // adjust path if needed

const Step2 = ({
    formData,
    onFieldChange,
    onDayChange,
    publishStatusOptions
}) => {
    const days = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    return (
        <div className="lc-step-content">
            <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '40px', height: '40px', color: '#2563eb' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </div>
            <h3>Publishing Schedule</h3>
            <p className="description">
                Select the days you want content to be published.
            </p>

            <div className="days-grid">
                <label className="days-label">Select Days</label>
                <div className="days-checkboxes">
                    {days.map(day => (
                        <div key={day.key} className="day-checkbox-item">
                            <input
                                type="checkbox"
                                id={day.key}
                                checked={formData.days[day.key]}
                                onChange={() => onDayChange(day.key)}
                            />
                            <label htmlFor={day.key}>
                                {day.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <SelectField
                label="Publish Status"
                name="publishStatus"
                value={formData.publishStatus}
                onChange={onFieldChange}
                options={publishStatusOptions}
                required={true}
            />

            <div className="lc-checkbox-wrapper">
                <input
                    type="checkbox"
                    name="startImmediately"
                    checked={formData.startImmediately}
                    onChange={onFieldChange}
                    id="startImmediately"
                />
                <label htmlFor="startImmediately">
                    Start scheduling immediately
                </label>
            </div>
        </div>
    );
};

export default Step2;
