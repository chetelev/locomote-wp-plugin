import React from 'react';

const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  className = ""
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-[0.95rem] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        required={required}
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
