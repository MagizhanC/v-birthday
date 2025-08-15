'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableDoodleProps {
  children: React.ReactNode;
  initialX: number;
  initialY: number;
  id: string;
  onClick: (position: { x: number; y: number }) => void;
}

const DraggableDoodle: React.FC<DraggableDoodleProps> = ({ 
  children, 
  initialX, 
  initialY, 
  id,
  onClick 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    if (!isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      onClick({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  };

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        left: initialX,
        top: initialY,
      }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        // Small delay to prevent click after drag
        setTimeout(() => setIsDragging(false), 100);
      }}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      whileDrag={{ 
        scale: 1.2,
        rotate: 10,
        zIndex: 1000,
        transition: { duration: 0.1 }
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.3,
        rotate: Math.random() * 40 - 20,
        y: 50
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: Math.random() * 20 - 10,
        y: 0
      }}
      transition={{ 
        duration: 0.8,
        delay: 6.0 + Math.random() * 3,
        ease: "backOut"
      }}
      dragConstraints={{
        left: 0,
        right: window?.innerWidth - 150 || 1200,
        top: 0,
        bottom: window?.innerHeight - 150 || 800,
      }}
    >
      {children}
    </motion.div>
  );
};

export default DraggableDoodle;
