
import React from 'react';
import { Home, PlusCircle, TrendingUp, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'record', icon: PlusCircle, label: '记录', special: true },
    { id: 'history', icon: TrendingUp, label: '历史' },
    { id: 'profile', icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full px-6 pb-10 pointer-events-none z-50 flex justify-center">
      <nav className="w-full max-w-md glass rounded-[2.5rem] px-5 py-4 flex justify-between items-center shadow-[0_20px_50px_rgba(74,62,49,0.1)] border-white/80 pointer-events-auto transition-all duration-500 hover:shadow-[0_25px_60px_rgba(188,138,95,0.2)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 relative ${
              activeTab === tab.id ? 'text-[#BC8A5F]' : 'text-[#4A3E31]/30'
            } ${tab.special ? 'scale-110 hover:scale-125' : 'hover:scale-105'}`}
          >
            <tab.icon 
              size={tab.special ? 34 : 22} 
              className={`${activeTab === tab.id ? 'fill-[#BC8A5F]/5' : ''} ${tab.special ? 'text-[#BC8A5F] drop-shadow-lg' : ''} transition-all`}
            />
            <span className={`text-[10px] font-black tracking-tight ${tab.special ? 'hidden' : 'block'} mt-0.5`}>
              {tab.label}
            </span>
            {activeTab === tab.id && !tab.special && (
              <div className="absolute -bottom-1.5 w-1 h-1 bg-[#BC8A5F] rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
