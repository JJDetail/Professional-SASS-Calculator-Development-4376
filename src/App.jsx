import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SassCalculator from './components/SassCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<SassCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;