import { Typography, Card, Box } from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
  Lightbulb as InsightIcon,
  Update as UpdateIcon,
  NotificationsActive as AlertIcon,
  Hardware as HardwareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 + 0.2 }}
  >
    <Card className="p-6 glass-panel group border border-white/10 hover:shadow-neon hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/5 text-neon-blue group-hover:text-neon-purple transition-all duration-300"
        >
          <Icon />
        </motion.div>
        <div>
          <Typography 
            variant="h6" 
            className="font-futuristic font-bold text-white group-hover:text-neon-blue text-shadow-neon-blue transition-colors duration-300"
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            className="text-gray-300 mt-1"
          >
            {description}
          </Typography>
        </div>
      </div>
    </Card>
  </motion.div>
);

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"></div>
        <motion.div 
          className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-neon-blue/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-neon-purple/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Header */}
      <div className="relative overflow-hidden cosmic-panel p-8">
        <motion.div 
          className="absolute -top-20 -left-20 w-60 h-60 bg-neon-blue/5 rounded-full blur-3xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        <div className="relative flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 shadow-neon-blue"
          >
            <motion.div
              animate={{ 
                rotate: 360
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <WaterIcon className="text-neon-blue transform scale-150" />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h3" className="font-tech font-bold mb-3 text-white">
              <span className="text-animated-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-[length:200%_auto]">
                Water Quality Monitoring System
              </span>
            </Typography>
            <Typography variant="body1" className="text-gray-300 max-w-2xl">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-neon-blue font-medium"
              >
                Next-Gen IoT Solution:
              </motion.span>{' '}
              Real-time monitoring and analysis of water quality parameters, ensuring safety and compliance through intelligent automation.
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={WaterIcon}
          title="Real-time Monitoring"
          description="Continuous monitoring of water quality parameters with instant updates and alerts for any anomalies."
          index={0}
        />
        <FeatureCard
          icon={AnalyticsIcon}
          title="Performance Analytics"
          description="Advanced analytics and visualization tools to track trends and patterns in water quality data."
          index={1}
        />
        <FeatureCard
          icon={SecurityIcon}
          title="Secure Data Management"
          description="Enterprise-grade security measures to protect sensitive water quality data and system settings."
          index={2}
        />
        <FeatureCard
          icon={InsightIcon}
          title="Smart Insights"
          description="AI-powered analysis to predict potential issues and provide actionable recommendations."
          index={3}
        />
        <FeatureCard
          icon={UpdateIcon}
          title="Automated Updates"
          description="Regular system updates and calibration to maintain optimal performance and accuracy."
          index={4}
        />
        <FeatureCard
          icon={AlertIcon}
          title="Custom Alerts"
          description="Configurable notification system for immediate response to critical water quality changes."
          index={5}
        />
      </div>

      {/* Tech specs section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6 glass-panel border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7 }}
              className="p-2 rounded-lg bg-black/50 text-neon-blue"
            >
              <HardwareIcon />
            </motion.div>
            <Typography variant="h6" className="font-futuristic font-bold text-white text-shadow-neon-blue">
              System Specifications
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/5">
              <Typography variant="overline" className="text-neon-blue font-tech block mb-2">
                Hardware Components
              </Typography>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue"></span>
                  <Typography variant="body2">High-precision pH, temperature, and turbidity sensors</Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue"></span>
                  <Typography variant="body2">Integrated microprocessor with low-power consumption</Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue"></span>
                  <Typography variant="body2">Secure wireless transmission module</Typography>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/5">
              <Typography variant="overline" className="text-neon-purple font-tech block mb-2">
                Software Features
              </Typography>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
                  <Typography variant="body2">Advanced data analytics with ML algorithms</Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
                  <Typography variant="body2">Remote configuration and management</Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
                  <Typography variant="body2">End-to-end data encryption</Typography>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Version Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card className="p-6 glass-panel text-center border border-white/10">
          <Typography variant="overline" className="text-neon-blue font-tech block">
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Version 1.0.0
            </motion.span>
          </Typography>
          <Typography variant="caption" className="text-gray-400">
            © 2024 Water Quality Monitor. All rights reserved.
          </Typography>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default About; 