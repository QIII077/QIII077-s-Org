
import React, { useState, useEffect } from 'react';
import { UserProfile, FoodRecord } from './types';
import { DEFAULT_PROFILE } from './constants';
import Dashboard from './components/Dashboard';
import BottomNav from './components/BottomNav';
import RecordFood from './components/RecordFood';
import History from './components/History';
import Profile from './components/Profile';
import Login from './components/Login';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('is_logged_in') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [records, setRecords] = useState<FoodRecord[]>(() => {
    const saved = localStorage.getItem('food_records');
    return saved ? JSON.parse(saved) : [];
  });
  const [showRecordModal, setShowRecordModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('food_records', JSON.stringify(records));
  }, [records]);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('is_logged_in', 'true');
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('username');
    setActiveTab('home');
  };

  const handleAddRecord = (data: Omit<FoodRecord, 'id' | 'timestamp'>) => {
    const newRecord: FoodRecord = {
      ...data,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setRecords([newRecord, ...records]);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard profile={profile} records={records} />;
      case 'history':
        return <History />;
      case 'profile':
        return <Profile profile={profile} setProfile={setProfile} username={username} onLogout={handleLogout} />;
      default:
        return <Dashboard profile={profile} records={records} />;
    }
  };

  useEffect(() => {
    if (activeTab === 'record') {
      setShowRecordModal(true);
      setActiveTab('home');
    } else {
      window.scrollTo(0, 0);
    }
  }, [activeTab]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center">
      {/* Decorative background blobs */}
      <div className="fixed top-[-5%] right-[-5%] w-96 h-96 bg-[#BC8A5F]/10 rounded-full blur-[110px] pointer-events-none animate-float z-0"></div>
      <div className="fixed bottom-[15%] left-[-15%] w-[450px] h-[450px] bg-[#E3D5CA]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <main className="relative z-10 w-full max-w-screen-xl mx-auto flex-1 flex flex-col">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {showRecordModal && (
        <RecordFood 
          onAddRecord={handleAddRecord} 
          onClose={() => setShowRecordModal(false)} 
        />
      )}
    </div>
  );
};

export default App;
