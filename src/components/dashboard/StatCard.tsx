import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    label: string;
    type?: 'increase' | 'decrease' | 'neutral';
  };
  icon?: string;
  iconColor?: string;
  theme?: 'light' | 'dark';
  aiInsight?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle,
  change, 
  icon,
  iconColor = 'text-palestine-black dark:text-dark-text-primary',
  theme = 'light',
  aiInsight
}) => {
  const getChangeColor = (type?: 'increase' | 'decrease' | 'neutral') => {
    switch(type) {
      case 'increase':
        return 'text-palestine-red';
      case 'decrease':
        return 'text-palestine-green';
      default:
        return 'text-text-secondary dark:text-dark-text-secondary';
    }
  };

  const getChangeIcon = (type?: 'increase' | 'decrease' | 'neutral') => {
    switch(type) {
      case 'increase':
        return 'trending_up';
      case 'decrease':
        return 'trending_down';
      default:
        return 'remove';
    }
  };

  return (
    <div className="widget-card bg-palestine-white dark:bg-dark-surface p-6 rounded-2xl shadow-lg
      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
        {icon && (
          <span className={`material-icons-outlined ${iconColor} transition-transform duration-300 hover:scale-110`}>
            {icon}
          </span>
        )}
      </div>
      
      <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-1 
        transition-all duration-300 hover:text-palestine-red dark:hover:text-palestine-red">{value}</p>
      {subtitle && (
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{subtitle}</p>
      )}
      
      {change && (
        <div className={`mt-3 flex items-center text-xs ${getChangeColor(change.type)} 
          transition-all duration-300 hover:scale-105`}>
          <span className="material-icons-outlined text-sm mr-1">
            {getChangeIcon(change.type)}
          </span>
          <span>{change.value}% {change.label}</span>
        </div>
      )}

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

export default StatCard;