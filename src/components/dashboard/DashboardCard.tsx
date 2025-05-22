import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon?: string;
  iconColor?: string;
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  aiInsight?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon,
  iconColor = 'text-palestine-black dark:text-dark-text-primary',
  children, 
  className = '', 
  theme = 'light',
  aiInsight
}) => {
  return (
    <div className={`widget-card bg-palestine-white dark:bg-dark-surface p-6 rounded-2xl shadow-lg 
      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
        {icon && (
          <span className={`material-icons-outlined ${iconColor} transition-transform duration-300 hover:scale-110`}>
            {icon}
          </span>
        )}
      </div>
      
      <div className="relative">
        {children}
      </div>

      {aiInsight && (
        <div className="ai-insight-icon transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <span className="material-icons-outlined text-base">auto_awesome</span>
          <div className="ai-insight-popup bg-ai-light-purple dark:bg-dark-ai-light-purple text-ai-purple">
            {aiInsight}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;