import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SendMail from './components/SendMail';
import EmailHistory from './components/EmailHistory';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [activeTab, setActiveTab] = useState('send');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#111613] font-['Roboto',sans-serif]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="p-4 bg-[#111613]">
        {activeTab === 'send' ? <SendMail /> : <EmailHistory />}
      </main>
    </div>
  );
}