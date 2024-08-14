import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  color: 'cyan' | 'blue' | 'red'; // Add more colors as needed
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, color, className, children }) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-md text-white ${color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
