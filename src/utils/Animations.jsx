import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fade In Component
export const FadeIn = ({ children, duration = 0.5, delay = 0, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide In Component
export const SlideIn = ({ 
  children, 
  direction = 'right', 
  duration = 0.5, 
  delay = 0, 
  distance = 30,
  className = '', 
  ...props 
}) => {
  const initialX = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
  const initialY = direction === 'up' ? -distance : direction === 'down' ? distance : 0;

  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: initialX, y: initialY, opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered Animation Container
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1, 
  initialDelay = 0,
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            style: {
              ...child.props.style,
            },
            animate: {
              ...child.props.animate,
              transition: {
                ...child.props?.animate?.transition,
                delay: initialDelay + (i * staggerDelay),
              }
            }
          });
        }
        return child;
      })}
    </motion.div>
  );
};

// Typing Text Animation
export const TypingText = ({ text, className = '', speed = 50, ...props }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`inline-block ${className}`} {...props}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Animated Number Counter
export const AnimatedCounter = ({ value, duration = 2, className = '', ...props }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    
    if (start === end) return;
    
    const incrementTime = (duration / end) * 1000;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  return (
    <span className={className} {...props}>
      {count}
    </span>
  );
};

// Floating Element
export const FloatingElement = ({ 
  children, 
  amplitude = 10, 
  duration = 4,
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -amplitude, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Pulsing Element
export const PulsingElement = ({ 
  children, 
  scale = 1.05, 
  duration = 2,
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, scale, 1],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 3D Rotate on Hover
export const Rotate3DOnHover = ({ 
  children, 
  intensity = 10, 
  perspective = 1000,
  className = '', 
  ...props 
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate rotation
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateY = ((x / width) - 0.5) * intensity;
    const rotateX = -((y / height) - 0.5) * intensity;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
      className={className}
      {...props}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Glow Effect
export const GlowEffect = ({ 
  children, 
  color = '#00f0ff', 
  intensity = '10px',
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      animate={{ 
        boxShadow: [
          `0 0 5px ${color}50, 0 0 ${intensity} ${color}20`,
          `0 0 8px ${color}70, 0 0 ${parseInt(intensity) * 1.5}px ${color}40`,
          `0 0 5px ${color}50, 0 0 ${intensity} ${color}20`,
        ],
      }}
      transition={{ 
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Background Particles
export const BackgroundParticles = ({ className = '', ...props }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      {...props}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neon-blue/30"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [null, Math.random() * 100 + '%'],
            x: [null, Math.random() * 100 + '%'],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 8 + 2 + 'px',
            height: Math.random() * 8 + 2 + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default {
  FadeIn,
  SlideIn,
  StaggerContainer,
  TypingText,
  AnimatedCounter,
  FloatingElement,
  PulsingElement,
  Rotate3DOnHover,
  GlowEffect,
  BackgroundParticles
}; 