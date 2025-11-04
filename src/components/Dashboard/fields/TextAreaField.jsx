import React from 'react';

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 5,
  className = ""
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
        rows={rows}
      />
    </div>
  );
};

export default TextAreaField;

