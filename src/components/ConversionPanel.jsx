import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiRefreshCw, FiArrowRight } = FiIcons;

const ConversionPanel = ({ settings }) => {
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('px');
  const [toUnit, setToUnit] = useState('rem');
  const [result, setResult] = useState('');

  const units = [
    { value: 'px', label: 'Pixels (px)' },
    { value: 'rem', label: 'REM' },
    { value: 'em', label: 'EM' },
    { value: '%', label: 'Percentage (%)' },
    { value: 'vh', label: 'Viewport Height (vh)' },
    { value: 'vw', label: 'Viewport Width (vw)' },
    { value: 'pt', label: 'Points (pt)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'in', label: 'Inches (in)' }
  ];

  const convertUnits = (value, from, to) => {
    const baseFontSize = 16; // Assuming 16px base font size
    const viewportWidth = 1920; // Assuming 1920px viewport width
    const viewportHeight = 1080; // Assuming 1080px viewport height

    // Convert to pixels first
    let pixels;
    switch (from) {
      case 'px':
        pixels = value;
        break;
      case 'rem':
        pixels = value * baseFontSize;
        break;
      case 'em':
        pixels = value * baseFontSize;
        break;
      case '%':
        pixels = (value / 100) * baseFontSize;
        break;
      case 'vh':
        pixels = (value / 100) * viewportHeight;
        break;
      case 'vw':
        pixels = (value / 100) * viewportWidth;
        break;
      case 'pt':
        pixels = value * 1.333;
        break;
      case 'cm':
        pixels = value * 37.795;
        break;
      case 'mm':
        pixels = value * 3.7795;
        break;
      case 'in':
        pixels = value * 96;
        break;
      default:
        pixels = value;
    }

    // Convert from pixels to target unit
    switch (to) {
      case 'px':
        return pixels;
      case 'rem':
        return pixels / baseFontSize;
      case 'em':
        return pixels / baseFontSize;
      case '%':
        return (pixels / baseFontSize) * 100;
      case 'vh':
        return (pixels / viewportHeight) * 100;
      case 'vw':
        return (pixels / viewportWidth) * 100;
      case 'pt':
        return pixels / 1.333;
      case 'cm':
        return pixels / 37.795;
      case 'mm':
        return pixels / 3.7795;
      case 'in':
        return pixels / 96;
      default:
        return pixels;
    }
  };

  const handleConvert = () => {
    if (fromValue && !isNaN(fromValue)) {
      const converted = convertUnits(parseFloat(fromValue), fromUnit, toUnit);
      setResult(converted.toFixed(settings.precision));
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(result);
    setResult(fromValue);
  };

  const conversions = [
    { name: 'Sass Functions', examples: ['darken($color, 10%)', 'lighten($color, 20%)', 'saturate($color, 15%)'] },
    { name: 'Responsive Units', examples: ['clamp(1rem, 2.5vw, 2rem)', 'max(1rem, 4vw)', 'min(2rem, 8vw)'] },
    { name: 'CSS Grid', examples: ['repeat(auto-fit, minmax(250px, 1fr))', 'minmax(min-content, max-content)'] }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unit Converter */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Unit Converter</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">From</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/40"
                  placeholder="Enter value"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ color: 'white' }}
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value} className="bg-slate-800 text-white">
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapUnits}
                className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 rounded-full p-3 transition-all duration-200"
              >
                <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
              </motion.button>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">To</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={result}
                  readOnly
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none placeholder-white/40"
                  placeholder="Result"
                />
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ color: 'white' }}
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value} className="bg-slate-800 text-white">
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-lg py-3 px-4 font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              Convert
            </motion.button>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Quick Reference</h3>
          
          <div className="space-y-6">
            {conversions.map((category, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">{category.name}</h4>
                <div className="space-y-2">
                  {category.examples.map((example, exIndex) => (
                    <div key={exIndex} className="bg-black/20 rounded-lg p-3 border border-white/10">
                      <code className="text-green-400 text-sm font-mono">{example}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Conversions */}
      <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Common Conversions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { from: '16px', to: '1rem', desc: 'Base font size' },
            { from: '24px', to: '1.5rem', desc: 'Heading size' },
            { from: '8px', to: '0.5rem', desc: 'Small spacing' },
            { from: '32px', to: '2rem', desc: 'Large spacing' },
            { from: '100%', to: '1em', desc: 'Full width' },
            { from: '50%', to: '0.5em', desc: 'Half width' }
          ].map((conversion, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-black/20 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-mono">{conversion.from}</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 text-white/60" />
                <span className="text-purple-400 font-mono">{conversion.to}</span>
              </div>
              <p className="text-white/60 text-sm">{conversion.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversionPanel;