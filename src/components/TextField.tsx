import React from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, name, type, autoComplete, required, value, onChange, className }) => {
  return (
    <div className={`col-span-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
      />
    </div>
  );
};

export default TextField;
