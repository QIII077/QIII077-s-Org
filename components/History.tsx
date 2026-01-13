
import React from 'react';
import GlassCard from './GlassCard';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrendData = [
  { day: 'Mon', kcal: 1850 },
  { day: 'Tue', kcal: 2100 },
  { day: 'Wed', kcal: 1600 },
  { day: 'Thu', kcal: 1950 },
  { day: 'Fri', kcal: 2300 },
  { day: 'Sat', kcal: 1800 },
  { day: 'Sun', kcal: 1750 },
];

const History: React.FC = () => {
  return (
    <div className="p-6 pb-32 space-y-8 pt-12 animate-fade-in">
      <h1 className="text-3xl font-black text-[#4A3E31]">历史趋势</h1>
      
      <GlassCard className="h-72 bg-white/60 border-white/80 rounded-[3rem]">
        <h3 className="font-black text-[10px] mb-6 text-[#4A3E31]/40 uppercase tracking-[0.2em]">热量摄入趋势 (7天)</h3>
        <div className="w-full h-full pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTrendData}>
              <defs>
                <linearGradient id="colorKcal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BC8A5F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#BC8A5F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#4A3E31', fontWeight: 800, opacity: 0.3}} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.9)', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 20px 40px -10px rgba(74,62,49,0.1)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: '#BC8A5F', fontWeight: 900, fontSize: '14px' }}
                labelStyle={{ fontWeight: 800, color: '#4A3E31', marginBottom: '4px', fontSize: '10px' }}
              />
              <Area 
                type="monotone" 
                dataKey="kcal" 
                stroke="#BC8A5F" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorKcal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-5">
        <GlassCard className="flex flex-col items-center justify-center p-6 bg-white/60 border-white/80 rounded-[2.5rem] shadow-sm">
          <span className="text-[10px] text-[#4A3E31]/40 font-black uppercase tracking-widest mb-1">平均摄入</span>
          <span className="text-2xl font-black text-[#4A3E31]">1840</span>
          <span className="text-[10px] font-black text-[#82954B] mt-1">+5% vs 上周</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center p-6 bg-white/60 border-white/80 rounded-[2.5rem] shadow-sm">
          <span className="text-[10px] text-[#4A3E31]/40 font-black uppercase tracking-widest mb-1">达标天数</span>
          <span className="text-2xl font-black text-[#4A3E31]">5 / 7</span>
          <span className="text-[10px] font-black text-[#BC8A5F] mt-1">坚持住！✨</span>
        </GlassCard>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xl text-[#4A3E31] px-1 tracking-tight">过往周报</h3>
        {[
          { date: '昨天 (1月23日)', total: 1980, status: '达标' },
          { date: '周三 (1月22日)', total: 2450, status: '超标' },
          { date: '周二 (1月21日)', total: 1650, status: '达标' },
        ].map((item, i) => (
          <div key={i} className="glass rounded-[2rem] p-6 flex justify-between items-center border-white/60 shadow-sm active:scale-[0.98] transition-all">
            <div>
              <p className="font-black text-[15px] text-[#4A3E31]">{item.date}</p>
              <p className="text-[11px] text-[#4A3E31]/40 font-bold uppercase tracking-tighter mt-0.5">{item.total} kcal 总计</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
              item.status === '达标' ? 'bg-[#82954B]/10 text-[#82954B]' : 'bg-[#BC6C25]/10 text-[#BC6C25]'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
