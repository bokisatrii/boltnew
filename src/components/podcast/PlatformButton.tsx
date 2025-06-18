import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlatformButtonProps {
  href: string;
  text: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
  className?: string;
}

const PlatformButton: React.FC<PlatformButtonProps> = ({
  href,
  text,
  bgColor,
  textColor,
  icon,
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${bgColor} ${textColor} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
      <ExternalLink size={16} className="ml-2" />
    </motion.a>
  );
};

export default PlatformButton;