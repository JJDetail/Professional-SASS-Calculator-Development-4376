import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrash2, FiCopy, FiClock } = FiIcons;

const HistoryPanel = ({ history, onClear }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Calculation History</h3>
        {history.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
            Clear All
          </motion.button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <SafeIcon icon={FiClock} className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No calculations yet</p>
          <p className="text-white/40 text-sm mt-2">Your calculation history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-white font-mono text-lg">
                        {entry.calculation.expression}
                      </code>
                      <span className="text-white/60">=</span>
                      <code className="text-purple-400 font-mono text-lg font-bold">
                        {entry.result}{entry.calculation.unit}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <SafeIcon icon={FiClock} className="w-3 h-3" />
                      {entry.timestamp}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(entry.result)}
                    className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg p-2 transition-all duration-200"
                  >
                    <SafeIcon icon={FiCopy} className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Statistics */}
      {history.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">{history.length}</div>
            <div className="text-white/60 text-sm">Total Calculations</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {history.length > 0 ? history[0].timestamp.split(',')[0] : 'N/A'}
            </div>
            <div className="text-white/60 text-sm">Last Session</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {Math.round(history.length / 7)}
            </div>
            <div className="text-white/60 text-sm">Avg. per Day</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;