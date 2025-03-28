import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Dashboard from './pages/Dashboard';
import EggLogging from './pages/EggLogging';
import FeedManagement from './pages/FeedManagement';
import MedicationTracking from './pages/MedicationTracking';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="egg-logging" element={<EggLogging />} />
            <Route path="feed-management" element={<FeedManagement />} />
            <Route path="medication-tracking" element={<MedicationTracking />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;