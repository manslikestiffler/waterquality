import React from 'react';

// Glass Card Component
export const GlassCard = ({ children, className = '', variant = 'primary', glow = false, ...props }) => {
  const baseClasses = 'relative overflow-hidden rounded-xl backdrop-blur-glass transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-glass-medium border border-white/20 shadow-glass',
    cosmic: 'bg-cosmic-900/40 border border-cosmic-400/20 shadow-glass',
    neon: 'bg-glass-dark border border-neon-blue/20 shadow-neon',
    purple: 'bg-glass-dark border border-neon-purple/20 shadow-neon-purple',
    dark: 'bg-black/40 border border-white/10 shadow-glass',
  };
  
  const glowClasses = glow ? 'animate-glow' : '';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className}`} {...props}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>
      {children}
    </div>
  );
};

// Glass Button Component
export const GlassButton = ({ children, className = '', variant = 'primary', size = 'md', glow = false, ...props }) => {
  const baseClasses = 'relative overflow-hidden backdrop-blur-glass font-medium transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-glass-medium hover:bg-glass-heavy border border-white/20 text-white hover:text-white/90 shadow-glass',
    cosmic: 'bg-cosmic-600/40 hover:bg-cosmic-600/60 border border-cosmic-400/30 text-white shadow-glass',
    neon: 'bg-glass-dark hover:bg-glass-dark/70 border border-neon-blue/30 text-neon-blue shadow-neon hover:shadow-none',
    purple: 'bg-glass-dark hover:bg-glass-dark/70 border border-neon-purple/30 text-neon-purple shadow-neon-purple hover:shadow-none',
    danger: 'bg-red-900/40 hover:bg-red-900/60 border border-red-400/30 text-white shadow-glass',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-xl',
  };
  
  const glowClasses = glow ? 'animate-glow' : '';
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${glowClasses} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

// Glass Panel
export const GlassPanel = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'relative rounded-2xl backdrop-blur-glass overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-glass-medium border border-white/10 shadow-glass',
    cosmic: 'bg-cosmic-900/40 border border-cosmic-400/20 shadow-glass',
    dark: 'bg-black/30 border border-white/5 shadow-glass',
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10"></div>
      {children}
    </div>
  );
};

// Neon Text
export const NeonText = ({ children, className = '', color = 'blue', size = 'md', glow = true, ...props }) => {
  const baseClasses = 'font-futuristic font-bold transition-all duration-300';
  
  const colorClasses = {
    blue: 'text-neon-blue',
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
    green: 'text-neon-green',
    yellow: 'text-neon-yellow',
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };
  
  const glowClasses = glow ? 'drop-shadow-md' : '';
  
  return (
    <span className={`${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${glowClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Futuristic Badge
export const FuturisticBadge = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
    cosmic: 'bg-cosmic-500/20 text-cosmic-400 border border-cosmic-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    neon: 'bg-black/30 text-neon-blue border border-neon-blue/50 shadow-neon',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Holographic Container with Animation
export const HolographicContainer = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Animated holographic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-700/40 via-cosmic-500/20 to-neon-blue/30 animate-pulse-slow"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-mesh-grid bg-[length:30px_30px] opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue/50 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-3/4 left-1/2 w-3 h-3 rounded-full bg-neon-purple/50 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-neon-pink/50 animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

// Gradient Border Container
export const GradientBorderContainer = ({ children, className = '', ...props }) => {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`} {...props}>
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-pulse-slow"></div>
      
      {/* Inner content with background */}
      <div className="relative bg-black/60 backdrop-blur-glass rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Data Visualization Card
export const DataVisCard = ({ children, title, subtitle, className = '', ...props }) => {
  return (
    <GlassCard className={`p-6 ${className}`} variant="cosmic" {...props}>
      <div className="mb-4">
        <h3 className="text-lg font-display font-bold text-white group-hover:text-cosmic-300 transition-colors duration-300">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </GlassCard>
  );
};

export default {
  GlassCard,
  GlassButton,
  GlassPanel,
  NeonText,
  FuturisticBadge,
  HolographicContainer,
  GradientBorderContainer,
  DataVisCard
}; 