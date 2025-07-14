import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './Calculator';
import ConversionPanel from './ConversionPanel';
import HistoryPanel from './HistoryPanel';
import Header from './Header';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSettings, FiHistory, FiRefreshCw } = FiIcons;

const SassCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'dark',
    precision: 4,
    unit: 'px'
  });

  const addToHistory = (calculation) => {
    const newEntry = {
      id: Date.now(),
      calculation,
      timestamp: new Date().toLocaleString(),
      result: calculation.result
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: FiRefreshCw },
    { id: 'conversions', label: 'Conversions', icon: FiRefreshCw },
    { id: 'history', label: 'History', icon: FiHistory }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Main Calculator Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-white/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-600/30 text-white border-b-2 border-purple-400'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'calculator' && (
                      <Calculator 
                        onCalculation={addToHistory}
                        settings={settings}
                      />
                    )}
                    {activeTab === 'conversions' && (
                      <ConversionPanel settings={settings} />
                    )}
                    {activeTab === 'history' && (
                      <HistoryPanel 
                        history={history} 
                        onClear={clearHistory}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <SafeIcon icon={FiSettings} className="w-5 h-5" />
                Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Precision
                  </label>
                  <select
                    value={settings.precision}
                    onChange={(e) => setSettings(prev => ({ ...prev, precision: parseInt(e.target.value) }))}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ color: 'white' }}
                  >
                    <option value={2} className="bg-slate-800 text-white">2 decimal places</option>
                    <option value={4} className="bg-slate-800 text-white">4 decimal places</option>
                    <option value={6} className="bg-slate-800 text-white">6 decimal places</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Default Unit
                  </label>
                  <select
                    value={settings.unit}
                    onChange={(e) => setSettings(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ color: 'white' }}
                  >
                    <option value="px" className="bg-slate-800 text-white">Pixels (px)</option>
                    <option value="rem" className="bg-slate-800 text-white">REM</option>
                    <option value="em" className="bg-slate-800 text-white">EM</option>
                    <option value="%" className="bg-slate-800 text-white">Percentage (%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ color: 'white' }}
                  >
                    <option value="dark" className="bg-slate-800 text-white">Dark</option>
                    <option value="light" className="bg-slate-800 text-white">Light</option>
                    <option value="auto" className="bg-slate-800 text-white">Auto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SassCalculator;