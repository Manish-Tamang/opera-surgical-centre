import React from 'react';

interface FileInputProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => {
  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
      />
      <p className="text-sm text-gray-500 mt-1">
        SVG, PNG, JPG or GIF (max 800x400)
      </p>
    </div>
  );
};

export default FileInput;
