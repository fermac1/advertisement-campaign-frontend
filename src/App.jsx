import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import EditForm from './components/EditForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="/create" element={<CampaignForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </Router>
  );
};

export default App;
