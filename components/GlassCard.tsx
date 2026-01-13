
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-[2.5rem] p-6 shadow-sm overflow-hidden border border-white/60 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
