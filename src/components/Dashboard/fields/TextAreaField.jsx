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
    <div className={`lc-input-group ${className}`}>
      <label className="lc-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="lc-textarea"
        required={required}
        rows={rows}
      />
    </div>
  );
};

export default TextAreaField;

