import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Users from './Components/Users';
import Chat from './Components/Chat';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
