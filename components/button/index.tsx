import React, { ReactNode } from 'react';

export default function Button({
  onClick,
  color,
  children,
  className,
}: {
  onClick: () => void;
  color: string;
  children: ReactNode | string;
  className?: string;
}) {
  return (
    <button
      className={`mb-6 bg-${color}-100 border border-${color}-700 text-black font-medium py-1 px-3 rounded text-sm hover:bg-${color}-200 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
