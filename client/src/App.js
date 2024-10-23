import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Leads from './components/leads/Leads';
import Analytics from './components/analytics/Analytics';
import Reports from './components/reports/Reports';
import EmailAlert from './components/emailAlert/EmailAlert';
import './app.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/email-alert" element={<EmailAlert />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
