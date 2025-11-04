import React from 'react';

const TextField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = ""
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

export default TextField;
