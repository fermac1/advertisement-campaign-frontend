import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="/create" element={<CampaignForm />} />
      </Routes>
    </Router>
  );
};

export default App;
