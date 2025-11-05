import React from 'react';
import SelectField from '../Dashboard/fields/SelectField';

const Step2 = ({ formData, onFieldChange, onDayChange, publishStatusOptions, errors }) => {

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
        <div className="w-full flex flex-col">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </div>
            <h3 className="mb-3 text-center text-xl font-semibold text-gray-900">Publishing Schedule</h3>
            <p className=" mb-8 text-center text-sm leading-6 text-gray-500">
                Choose the days when your posts should be published.
            </p>

            <div>
                <label className="mb-4 text-sm font-semibold text-gray-700 flex items-center gap-1">
                    Select Days
                    {errors?.days && <span className="text-red-500">*</span>}
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                    {days.map(day => (
                        <div key={day.key} className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-50">
                            <input
                                type="checkbox"
                                id={day.key}
                                checked={formData.days[day.key]}
                                onChange={() => onDayChange(day.key)}
                                className="h-5 w-5 rounded accent-blue-600"
                            />
                            <label htmlFor={day.key} className="cursor-pointer select-none text-sm font-medium text-gray-700">
                                {day.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <SelectField
                label={
                    <span className="flex items-center gap-1">
                        Publish Status
                    </span>
                }
                name="publishStatus"
                value={formData.publishStatus}
                onChange={onFieldChange}
                options={publishStatusOptions}
                required
            />

            <div className="mt-4 flex items-center gap-3">
                <input
                    type="checkbox"
                    name="startImmediately"
                    checked={formData.startImmediately}
                    onChange={onFieldChange}
                    id="startImmediately"
                    className="h-5 w-5 rounded accent-blue-600"
                />
                <label htmlFor="startImmediately" className="cursor-pointer select-none text-[15px] font-medium text-gray-900">
                    Start scheduling immediately
                </label>
            </div>
        </div>
    );
};

export default Step2;
