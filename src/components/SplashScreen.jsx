import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Box, CircularProgress } from '@mui/material';
import { OpacityOutlined as WaterIcon, Water as WaterFillIcon, Opacity as DropIcon } from '@mui/icons-material';

// Animated water wave component
const WaterWave = ({ delay, position }) => {
  return (
    <motion.div
      className="absolute left-0 right-0 h-24"
      style={{ bottom: position }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ 
        scaleY: 1, 
        opacity: [0, 0.8, 0.7],
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut"
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path 
          d="M0,0 C150,60 350,0 500,30 C650,60 750,0 900,30 C1050,60 1200,0 1200,0 V120 H0 Z"
          fill="rgba(0, 240, 255, 0.15)"
          animate={{
            d: [
              "M0,0 C150,60 350,0 500,30 C650,60 750,0 900,30 C1050,60 1200,0 1200,0 V120 H0 Z",
              "M0,0 C150,20 350,40 500,10 C650,20 750,40 900,10 C1050,20 1200,0 1200,0 V120 H0 Z",
              "M0,0 C150,60 350,0 500,30 C650,60 750,0 900,30 C1050,60 1200,0 1200,0 V120 H0 Z"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );
};

// Water droplet component with enhanced animation
const WaterDrop = ({ delay, size, x, y, color }) => {
  return (
    <motion.div
      initial={{ y: y - 100, opacity: 0, scale: 0 }}
      animate={{ 
        y: y,
        scale: 1,
        opacity: 1
      }}
      transition={{
        duration: 1,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
      style={{ position: 'absolute', left: `calc(50% + ${x}px)`, top: `${y}%` }}
    >
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3, 
          delay: delay + 0.5,
          ease: "easeInOut"
        }}
      >
        <DropIcon style={{ fontSize: size, color }} />
      </motion.div>
    </motion.div>
  );
};

// Bubble component
const Bubble = ({ delay, size, x, y }) => {
  return (
    <motion.div
      initial={{ y: y + 100, opacity: 0, scale: 0 }}
      animate={{ 
        y: y - 150,
        opacity: [0, 0.7, 0],
        scale: [0, 1, 1.2]
      }}
      transition={{
        duration: 4,
        delay,
        ease: "easeOut"
      }}
      style={{ 
        position: 'absolute', 
        left: `calc(50% + ${x}px)`, 
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 240, 255, 0.2))',
        boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
      }}
    />
  );
};

// Ripple effect
const Ripple = ({ delay, size, x, y }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{
        duration: 2,
        delay: delay + 0.2,
        ease: "easeOut"
      }}
      style={{ 
        position: 'absolute', 
        left: `calc(50% + ${x}px)`, 
        top: `${y}%`,
        width: size,
        height: size / 4,
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
      }}
    />
  );
};

// Loading progress indicator
const LoadingProgress = ({ progress }) => {
  return (
    <motion.div
      className="absolute bottom-20 left-0 right-0 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress 
          variant="determinate" 
          value={progress} 
          size={60}
          thickness={2}
          sx={{ 
            color: 'rgba(0, 240, 255, 0.8)',
            filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))'
          }} 
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" className="text-neon-blue font-bold">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" className="text-gray-400">
        Initializing water monitoring system...
      </Typography>
    </motion.div>
  );
};

const SplashScreen = ({ onFinished }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);

    // Show splash screen for 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onFinished();
      }, 800); // Give time for exit animation
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Background effects */}
          <Box 
            className="absolute inset-0 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"
          />
          
          {/* Animated water waves */}
          <WaterWave delay={0.8} position="0px" />
          <WaterWave delay={1.0} position="60px" />
          <WaterWave delay={1.2} position="120px" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center relative"
          >
            {/* Water droplets */}
            <WaterDrop delay={0.2} size={40} x={-80} y={30} color="rgba(0, 240, 255, 0.8)" />
            <WaterDrop delay={0.4} size={60} x={-20} y={25} color="rgba(0, 240, 255, 1)" />
            <WaterDrop delay={0.6} size={80} x={50} y={30} color="rgba(0, 240, 255, 0.9)" />
            
            {/* Bubbles */}
            <Bubble delay={1.0} size={20} x={-100} y={60} />
            <Bubble delay={1.3} size={15} x={-60} y={65} />
            <Bubble delay={1.6} size={25} x={-20} y={70} />
            <Bubble delay={1.9} size={18} x={30} y={65} />
            <Bubble delay={2.2} size={22} x={80} y={60} />
            
            {/* Ripple effects */}
            <Ripple delay={1.2} size={40} x={-60} y={80} />
            <Ripple delay={1.5} size={50} x={0} y={80} />
            <Ripple delay={1.8} size={40} x={60} y={80} />
          </motion.div>
          
          <motion.div
            className="relative z-10 mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Typography variant="h2" className="text-neon-blue font-futuristic font-bold mb-2 tracking-wider">
              WATER<span className="text-white">MONITOR</span>
            </Typography>
            <Typography variant="subtitle1" className="text-gray-400">
              Advanced Water Quality Monitoring System
            </Typography>
          </motion.div>
          
          {/* Loading progress indicator */}
          <LoadingProgress progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 