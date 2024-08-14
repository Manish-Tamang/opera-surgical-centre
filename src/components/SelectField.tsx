import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, className, children }) => {
  return (
    <div className={`col-span-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
      >
        {children}
      </select>
    </div>
  );
};

export default SelectField;
