import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDelete, FiEqual, FiPlus, FiMinus, FiX, FiDivide } = FiIcons;

const Calculator = ({ onCalculation, settings }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue.toFixed(settings.precision)));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const result = newValue.toFixed(settings.precision);
      
      onCalculation({
        expression: `${previousValue} ${operation} ${inputValue}`,
        result: result,
        unit: settings.unit
      });

      setDisplay(result);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const buttons = [
    { label: 'C', action: clear, className: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: '±', action: () => setDisplay(String(parseFloat(display) * -1)), className: 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' },
    { label: '%', action: () => setDisplay(String(parseFloat(display) / 100)), className: 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' },
    { label: '/', action: () => performOperation('/'), className: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30', icon: FiDivide },
    
    { label: '7', action: () => inputNumber(7) },
    { label: '8', action: () => inputNumber(8) },
    { label: '9', action: () => inputNumber(9) },
    { label: '*', action: () => performOperation('*'), className: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30', icon: FiX },
    
    { label: '4', action: () => inputNumber(4) },
    { label: '5', action: () => inputNumber(5) },
    { label: '6', action: () => inputNumber(6) },
    { label: '-', action: () => performOperation('-'), className: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30', icon: FiMinus },
    
    { label: '1', action: () => inputNumber(1) },
    { label: '2', action: () => inputNumber(2) },
    { label: '3', action: () => inputNumber(3) },
    { label: '+', action: () => performOperation('+'), className: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30', icon: FiPlus },
    
    { label: '0', action: () => inputNumber(0), className: 'col-span-2' },
    { label: '.', action: inputDecimal },
    { label: '=', action: handleEquals, className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600', icon: FiEqual }
  ];

  return (
    <div className="max-w-md mx-auto">
      {/* Display */}
      <div className="bg-black/20 rounded-2xl p-6 mb-6 border border-white/10">
        <div className="text-right">
          <div className="text-white/60 text-sm mb-1">
            {operation && previousValue !== null && `${previousValue} ${operation}`}
          </div>
          <div className="text-white text-4xl font-light font-mono">
            {display}
          </div>
          <div className="text-purple-400 text-sm mt-1">
            {settings.unit}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.action}
            className={`
              h-16 rounded-2xl font-medium text-lg transition-all duration-200
              ${button.className || 'bg-white/10 text-white hover:bg-white/20'}
              border border-white/10 backdrop-blur-sm
              flex items-center justify-center
              ${button.className?.includes('col-span-2') ? 'col-span-2' : ''}
            `}
          >
            {button.icon ? (
              <SafeIcon icon={button.icon} className="w-5 h-5" />
            ) : (
              button.label
            )}
          </motion.button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDisplay(String(Math.sqrt(parseFloat(display))))}
          className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200"
        >
          √ Square Root
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDisplay(String(Math.pow(parseFloat(display), 2)))}
          className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200"
        >
          x² Square
        </motion.button>
      </div>
    </div>
  );
};

export default Calculator;