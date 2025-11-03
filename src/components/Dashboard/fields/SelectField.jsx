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
    <div className={`lc-input-group ${className}`}>
      <label className="lc-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="lc-select"
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
