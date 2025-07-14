import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiZap, FiTrendingUp } = FiIcons;

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
        >
          <SafeIcon icon={FiCode} className="w-6 h-6 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Sass Calculator Pro
        </h1>
      </div>
      
      <p className="text-white/70 text-lg max-w-2xl mx-auto">
        Professional Sass calculations, unit conversions, and CSS preprocessing utilities
      </p>
      
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2 text-white/60">
          <SafeIcon icon={FiZap} className="w-4 h-4" />
          <span className="text-sm">Lightning Fast</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
          <span className="text-sm">Production Ready</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;