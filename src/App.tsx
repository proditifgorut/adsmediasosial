import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignBuilder from './pages/CampaignBuilder';
import AssetLibrary from './pages/AssetLibrary';
import AccountConnections from './pages/AccountConnections';
import AIGenerator from './pages/AIGenerator';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaign-builder" element={<CampaignBuilder />} />
          <Route path="/ai-generator" element={<AIGenerator />} />
          <Route path="/asset-library" element={<AssetLibrary />} />
          <Route path="/accounts" element={<AccountConnections />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
