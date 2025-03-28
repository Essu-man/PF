import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EggLogging from './pages/EggLogging';
import FeedManagement from './pages/FeedManagement';
import MedicationTracking from './pages/MedicationTracking';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="flex justify-center items-center py-4 space-x-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            to="/egg-logging"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Egg Logging
          </Link>
          <Link
            to="/feed-management"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Feed Management
          </Link>
          <Link
            to="/medication-tracking"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Medication Tracking
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/egg-logging" element={<EggLogging />} />
          <Route path="/feed-management" element={<FeedManagement />} />
          <Route path="/medication-tracking" element={<MedicationTracking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;