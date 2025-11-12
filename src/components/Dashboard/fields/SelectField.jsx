import React from 'react';
import Select from 'react-select';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = '',
}) => {
  const selected = options.find((opt) => opt.value === value);

  const handleChange = (selectedOption) => {
    onChange({ target: { name, value: selectedOption.value } });
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: 9999,
      backgroundColor: '#ffffff',
      borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59,130,246,0.25)' : 'none',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: '2.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 10,
      zIndex: 20,
      fontSize: '0.875rem',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#2563eb'
        : state.isFocused
        ? '#f1f5f9'
        : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#111827',
      cursor: 'pointer',
      padding: 10,
      borderRadius: 6,
      margin: '2px 6px',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#111827',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        color: '#374151',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-gray-700!">
          {label}
        </label>
      )}
      <Select
        name={name}
        value={selected}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        isSearchable={false}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SelectField;
