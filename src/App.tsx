import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Templates from './components/Templates';
import History from './components/History';
import { ValidationProvider } from './contexts/ValidationContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ValidationProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <div className="lg:pl-64">
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ValidationProvider>
  );
}

export default App;