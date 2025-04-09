
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import EggLogging from './pages/EggLogging';
import EggRecords from './pages/EggRecords';
import FeedManagement from './pages/FeedManagement';
import MedicationTracking from './pages/MedicationTracking';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Redirect root path to Dashboard */}
          <Route path="/" element={<Navigate to="/Login" replace />} />

          {/* Other routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/egg-logging" element={<EggLogging />} />
          <Route path="/feed-management" element={<FeedManagement />} />
          <Route path="/medication-tracking" element={<MedicationTracking />} />
          <Route path="/egg-records" element={<EggRecords />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
