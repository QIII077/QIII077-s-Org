
import React from 'react';
import GlassCard from './GlassCard';
import { UserProfile, FoodRecord } from '../types';
import { calculateDailyGoal, calculateTDEE } from '../utils';
import { History as HistoryIcon, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  records: FoodRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ profile, records }) => {
  const intakeToday = records.reduce((acc, r) => acc + r.calories, 0);
  const tdee = calculateTDEE(profile);
  const dailyGoal = calculateDailyGoal(profile);
  const remaining = dailyGoal - intakeToday;
  
  const percentage = Math.min((intakeToday / dailyGoal) * 100, 100);
  
  const today = new Date();
  const monthStr = today.toLocaleDateString('zh-CN', { month: 'long' });
  const dayStr = today.getDate();
  const weekdayStr = today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

  return (
    <div className="space-y-8 pb-40 px-6 pt-10 animate-fade-in w-full">
      {/* Header Section */}
      <div className="flex justify-between items-start max-w-4xl mx-auto w-full">
        <div>
          <h2 className="text-base font-medium text-[#4A3E31]/50 leading-tight">你好,</h2>
          <h1 className="text-2xl md:text-3xl font-black text-[#4A3E31] tracking-tight mt-1">
            开启轻盈的一天了吗？
          </h1>
        </div>
        <div className="text-right pt-1">
          <p className="text-xs font-bold text-[#4A3E31]/40">{monthStr}{dayStr}日</p>
          <p className="text-sm md:text-base font-black text-[#BC8A5F] leading-none mt-1">
            {dayStr} {weekdayStr}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto w-full">
        <div className="space-y-8">
          {/* Main Calorie Dashboard Card */}
          <GlassCard className="relative bg-white/60 border-white/80 shadow-[0_30px_60px_rgba(74,62,49,0.05)] rounded-[3rem] p-8">
            <div className="flex flex-col">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] text-[#4A3E31]/40 font-black tracking-[0.25em] uppercase mb-1">今日摄入</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-black text-[#4A3E31] leading-none tracking-tighter">{intakeToday}</span>
                    <span className="text-lg font-bold text-[#4A3E31]/40">kcal</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#82954B] bg-[#82954B]/10 px-3 py-1.5 rounded-full mb-1">
                    <ArrowUpRight size={14} strokeWidth={3} />
                    <span className="text-xs font-black">{Math.round(percentage)}%</span>
                  </div>
                  <p className="text-[10px] text-[#4A3E31]/30 font-bold uppercase tracking-widest">完成度</p>
                </div>
              </div>

              <div className="relative h-6 w-full bg-[#F2E9E1] rounded-full overflow-hidden mb-10">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#BC8A5F] to-[#D4A373] rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(188,138,95,0.3)]"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-[#4A3E31]/5 pt-8">
                <div className="flex flex-col items-center">
                  <p className="text-[10px] text-[#4A3E31]/40 font-bold tracking-widest mb-2 uppercase">目标</p>
                  <p className="text-xl md:text-2xl font-black text-[#4A3E31]">{dailyGoal}</p>
                </div>
                <div className="flex flex-col items-center border-x border-[#4A3E31]/5">
                  <p className="text-[10px] text-[#4A3E31]/40 font-bold tracking-widest mb-2 uppercase">消耗</p>
                  <p className="text-xl md:text-2xl font-black text-[#4A3E31]">{tdee}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[10px] text-[#4A3E31]/40 font-bold tracking-widest mb-2 uppercase">剩余</p>
                  <p className={`text-xl md:text-2xl font-black ${remaining < 0 ? 'text-[#BC6C25]' : 'text-[#82954B]'}`}>
                    {Math.abs(remaining)}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Simple Motivational Card */}
          <GlassCard className="bg-[#BC8A5F]/5 border-[#BC8A5F]/10 py-8 px-7 rounded-[2.5rem] flex items-center justify-center text-center">
            <p className="text-[#4A3E31]/50 font-black italic text-sm tracking-wide">
              "每一口健康的抉择，都是对未来的馈赠。✨"
            </p>
          </GlassCard>
        </div>

        {/* Today's Footprint Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-2xl font-black text-[#4A3E31] tracking-tight">今日足迹</h3>
            <button className="text-sm font-bold text-[#BC8A5F] flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <HistoryIcon size={16} /> 查看全部
            </button>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
            {records.length === 0 ? (
              <div className="text-center py-24 rounded-[3rem] bg-white/20 border border-dashed border-[#4A3E31]/10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#E3D5CA]/20 flex items-center justify-center text-3xl">☕️</div>
                <p className="text-[#4A3E31]/40 text-base font-medium">点击“+”按钮，开始记录你的第一份能量</p>
              </div>
            ) : (
              records.map((record) => (
                <div key={record.id} className="glass rounded-[2rem] p-6 flex items-center justify-between transition-all active:scale-[0.98] hover:bg-white/80 border-white/60 shadow-sm">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] shadow-inner flex items-center justify-center text-3xl">
                      {record.mealType === '早餐' ? '🥐' : record.mealType === '午餐' ? '🍱' : record.mealType === '晚餐' ? '🥗' : '☕️'}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-[#4A3E31]">{record.name}</h4>
                      <p className="text-xs text-[#4A3E31]/40 font-black uppercase tracking-widest mt-1">
                        {record.mealType} · {record.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#BC8A5F] text-xl">{record.calories} <span className="text-xs">kcal</span></p>
                    <p className="text-[10px] font-black text-[#4A3E31]/20 tracking-tighter uppercase">{new Date(record.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
