import React from 'react';

const Button = ({ text, icon, className, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={`py-2 px-4 border border-white rounded-md ${className}`} // Combining passed and default classNames
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Display icon before text if present */}
      {text}
    </button>
  );
}

export default Button;
