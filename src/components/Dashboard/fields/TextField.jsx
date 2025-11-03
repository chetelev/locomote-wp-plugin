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
    <div className={`lc-input-group ${className}`}>
      <label className="lc-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="lc-input"
        required={required}
      />
    </div>
  );
};

export default TextField;
