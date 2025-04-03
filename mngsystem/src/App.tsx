
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EggLogging from './pages/EggLogging';
import FeedManagement from './pages/FeedManagement';
import MedicationTracking from './pages/MedicationTracking';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Other routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/egg-logging" element={<EggLogging />} />
        <Route path="/feed-management" element={<FeedManagement />} />
        <Route path="/medication-tracking" element={<MedicationTracking />} />
      </Routes>
    </Router>
  );
}

export default App;