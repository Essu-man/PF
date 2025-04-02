import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EggLogging from './pages/EggLogging';
import FeedManagement from './pages/FeedManagement';
import MedicationTracking from './pages/MedicationTracking';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="pt-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/egg-logging" element={<EggLogging />} />
            <Route path="/feed-management" element={<FeedManagement />} />
            <Route path="/medication-tracking" element={<MedicationTracking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;