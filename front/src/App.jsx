import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Resultats from './components/Resultats';
import Home from './components/Home';
import Cloud from './components/Cloud';
import DocumentDisplay from './components/DocumentDisplay';
import MotDisplay from './components/MotDisplay';
import Stats from './components/Stats';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resultats" element={<Resultats />} />
          <Route path="/cloud/:id" element={<Cloud />} />
          <Route path="/doc/:id" element={<DocumentDisplay />} />
          <Route path="/mots" element={<MotDisplay />} />
          <Route path="/statistics" element={<Stats />} />
          <Route path="/resultats" element={<Resultats />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
