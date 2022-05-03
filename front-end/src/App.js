import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CmiProvider from './context/cmiProvider';
import Index from './pages/login';

function App() {
  return (
    <CmiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </CmiProvider>
  );
}

export default App;
