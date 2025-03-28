import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Named export for Input
export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={`border p-2 ${className}`} {...props} />;
};
