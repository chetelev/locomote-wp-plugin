import React from 'react';
import SelectField from '../Dashboard/fields/SelectField';
import { languages } from '../../config/languages';

const Step2 = ({ formData, onFieldChange, onDayChange, publishStatusOptions, errors }) => {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-center rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 py-10 px-6 shadow-inner mb-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-blue-600">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Schedule Your Content</h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Plan your publishing days and preferences below.
        </p>
      </div>

      <div className="mb-10">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Publishing Days {errors?.days && <span className="text-red-500">*</span>}
        </label>
        <div className="flex flex-wrap gap-3">
          {days.map((day) => {
            const isActive = formData.days[day.key];
            return (
              <button
                type="button"
                key={day.key}
                onClick={() => onDayChange(day.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <SelectField
            label="Publish Status"
            name="publishStatus"
            value={formData.publishStatus}
            onChange={onFieldChange}
            options={publishStatusOptions}
            required
            error={errors?.publishStatus}
          />

          <SelectField
            label="Language"
            name="language"
            value={formData.language}
            onChange={onFieldChange}
            options={languages}
            required
            error={errors?.language}
            placeholder="Select a language"
          />
      </div>

      <div className="flex items-start bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="grow">
          <label htmlFor="startImmediately" className="text-sm font-medium text-gray-800">
            Start scheduling immediately
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Enable this to begin auto-publishing as soon as setup completes.
          </p>
        </div>

        <div className="pl-4 pt-1">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="startImmediately"
              name="startImmediately"
              checked={formData.startImmediately}
              onChange={onFieldChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step2;
