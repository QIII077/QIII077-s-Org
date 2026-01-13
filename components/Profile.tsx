
import React, { useState } from 'react';
import { UserProfile, GoalType } from '../types';
import GlassCard from './GlassCard';
import { Settings, Shield, Bell, HelpCircle, ChevronRight, Target, Edit3, ArrowLeft, CheckCircle, Info, LogOut, X } from 'lucide-react';

interface ProfileProps { 
  profile: UserProfile; 
  setProfile: (p: UserProfile) => void; 
  username: string;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile, username, onLogout }) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const updateGoal = (goal: GoalType) => { 
    setProfile({ ...profile, goal }); 
  };

  const handleBasicSave = () => {
    setProfile(tempProfile);
    setIsEditingBasic(false);
  };

  const SubViewHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <button onClick={() => setActiveSubView(null)} className="p-2 glass rounded-full text-[#4A3E31]/50">
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-2xl font-black text-[#4A3E31]">{title}</h2>
    </div>
  );

  if (activeSubView === 'security') {
    return (
      <div className="p-8 pb-40 animate-fade-in max-w-2xl mx-auto w-full">
        <SubViewHeader title="账户与安全" />
        <div className="space-y-4">
          <GlassCard className="flex items-center justify-between p-6">
            <div>
              <p className="font-black text-[#4A3E31]">账号绑定</p>
              <p className="text-xs text-[#4A3E31]/40 mt-1">用户名: {username}</p>
            </div>
            <button className="text-xs font-bold text-[#BC8A5F]">修改</button>
          </GlassCard>
          <GlassCard className="flex items-center justify-between p-6">
            <div>
              <p className="font-black text-[#4A3E31]">退出登录</p>
              <p className="text-xs text-[#4A3E31]/40 mt-1">退出当前账号，下次进入需重新登录</p>
            </div>
            <button onClick={onLogout} className="text-xs font-bold text-red-500 flex items-center gap-1">
              <LogOut size={14} /> 退出
            </button>
          </GlassCard>
          <GlassCard className="flex items-center justify-between p-6">
            <div>
              <p className="font-black text-[#4A3E31]">账号注销</p>
              <p className="text-xs text-[#4A3E31]/40 mt-1">注销后所有数据将清空且不可找回</p>
            </div>
            <button className="text-xs font-bold text-red-400 opacity-50">联系客服</button>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (activeSubView === 'notifications') {
    return (
      <div className="p-8 pb-40 animate-fade-in max-w-2xl mx-auto w-full">
        <SubViewHeader title="每日提醒" />
        <div className="space-y-4">
          {['早餐记录提醒', '午餐记录提醒', '晚餐记录提醒', '今日建议推送'].map((item, idx) => (
            <GlassCard key={idx} className="flex items-center justify-between p-6">
              <span className="font-black text-[#4A3E31]">{item}</span>
              <div className="w-12 h-6 bg-[#BC8A5F] rounded-full relative shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubView === 'help') {
    return (
      <div className="p-8 pb-40 animate-fade-in max-w-2xl mx-auto w-full">
        <SubViewHeader title="使用帮助" />
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h4 className="font-black text-[#4A3E31] mb-2">如何精准记录卡路里？</h4>
            <p className="text-sm text-[#4A3E31]/60 leading-relaxed">
              建议您在用餐前通过“拍照识别”功能，小助会自动分析餐食组成。手动输入时，请尽量细化食材名称。
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <h4 className="font-black text-[#4A3E31] mb-2">卡路里预算是如何计算的？</h4>
            <p className="text-sm text-[#4A3E31]/60 leading-relaxed">
              我们基于 Mifflin-St Jeor 公式计算您的基础代谢率(BMR)，并结合您的活动强度和减脂/增肌目标给出每日热量建议。
            </p>
          </GlassCard>
        </div>
      </div>
    );
  }

  // 基础资料配置项，增加类型安全的 key 处理
  const basicStats: { label: string; key: keyof UserProfile; isStatus?: boolean; value?: string }[] = [
    { label: '身高 (cm)', key: 'height' },
    { label: '体重 (kg)', key: 'weight' },
    { label: '年龄', key: 'age' },
    { 
      label: '状态', 
      key: 'goal',
      value: profile.goal === GoalType.MAINTAIN ? '维持' : profile.goal === GoalType.LOSE ? '减脂' : '增重', 
      isStatus: true 
    }
  ];

  return (
    <div className="p-8 pb-40 space-y-10 pt-12 animate-fade-in max-w-screen-xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.8rem] glass p-1 border-2 border-[#BC8A5F]/20 relative shadow-2xl">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} className="w-full h-full object-cover rounded-[2.5rem]" alt="avatar" />
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#BC8A5F] to-[#D4A373] p-2.5 md:p-3 rounded-full border-4 border-[#FDFBF7] shadow-xl">
              <Edit3 size={12} className="text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-black text-[#4A3E31]">{username}</h1>
              <button 
                onClick={() => {
                  if (isEditingBasic) {
                    handleBasicSave();
                  } else {
                    setTempProfile(profile);
                    setIsEditingBasic(true);
                  }
                }}
                className={`p-2 glass rounded-xl transition-all ${isEditingBasic ? 'bg-[#BC8A5F] text-white' : 'text-[#BC8A5F]'}`}
              >
                {isEditingBasic ? <CheckCircle size={16} /> : <Settings size={16} />}
              </button>
              {isEditingBasic && (
                <button 
                  onClick={() => setIsEditingBasic(false)}
                  className="p-2 glass rounded-xl text-red-400"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="text-[10px] md:text-xs text-[#BC8A5F] uppercase tracking-[0.2em] font-black mt-2 bg-[#BC8A5F]/10 px-3 py-1 rounded-full inline-block">已登录 · 会员</p>
          </div>
        </div>

        <GlassCard className="bg-[#BC8A5F]/5 border-[#BC8A5F]/20 rounded-[2.5rem] p-6 md:max-w-xs">
          <p className="text-xs md:text-sm text-center md:text-left text-[#4A3E31]/60 font-black leading-relaxed">
            {username}，今天是你开启健康的第 <span className="text-[#BC8A5F] text-base">3</span> 天，<br className="hidden md:block" />
            继续坚持，身体会给你最好的反馈！✨
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-black text-xl text-[#4A3E31] px-1 tracking-tight">基础资料</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
            {basicStats.map((stat, i) => (
              <div key={i} className={`glass p-5 rounded-[2rem] text-center border-white/60 shadow-sm transition-all ${isEditingBasic ? 'bg-white/80 scale-105' : 'bg-white/40'}`}>
                <p className="text-[10px] text-[#4A3E31]/40 uppercase font-black tracking-tighter">{stat.label}</p>
                {isEditingBasic && !stat.isStatus ? (
                  <input 
                    type="number"
                    value={tempProfile[stat.key] as number}
                    onChange={(e) => setTempProfile({...tempProfile, [stat.key]: parseFloat(e.target.value)})}
                    className="w-full bg-transparent text-center font-black text-[#BC8A5F] focus:outline-none text-base mt-1.5 border-b border-[#BC8A5F]/20"
                  />
                ) : (
                  <p className="text-base font-black text-[#4A3E31] mt-1.5">{stat.isStatus ? stat.value : profile[stat.key] as number}</p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-black text-xl text-[#4A3E31] tracking-tight">体重目标</h3>
              <button onClick={() => setIsEditingGoal(!isEditingGoal)} className="text-xs font-black text-[#BC8A5F] underline underline-offset-8">
                {isEditingGoal ? '确认保存' : '修改目标'}
              </button>
            </div>

            <GlassCard className="bg-white/40 border-white/80 rounded-[2.5rem] shadow-sm">
              {isEditingGoal ? (
                <div className="space-y-6">
                  <div className="flex gap-2.5">
                    {[GoalType.LOSE, GoalType.MAINTAIN, GoalType.GAIN].map((g) => (
                      <button
                        key={g}
                        onClick={() => updateGoal(g)}
                        className={`flex-1 py-3 rounded-2xl text-[11px] font-black transition-all ${
                          profile.goal === g ? 'bg-[#BC8A5F] text-white shadow-lg shadow-[#BC8A5F]/20' : 'glass text-[#4A3E31]/40'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  
                  {profile.goal !== GoalType.MAINTAIN && (
                    <div className="space-y-2.5">
                      <p className="text-xs font-black text-[#4A3E31]/50 uppercase tracking-widest px-1">目标体重 (kg)</p>
                      <input
                        type="number"
                        value={profile.targetWeight || ''}
                        onChange={(e) => setProfile({...profile, targetWeight: parseFloat(e.target.value)})}
                        placeholder="请输入目标体重"
                        className="w-full glass rounded-2xl px-5 py-4 focus:outline-none border-white/80 font-black text-[#4A3E31]"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#BC8A5F]/10 rounded-2xl text-[#BC8A5F] shadow-inner">
                      <Target size={28} />
                    </div>
                    <div>
                      <p className="text-[15px] font-black text-[#4A3E31]">{profile.goal}</p>
                      <p className="text-xs text-[#4A3E31]/40 font-bold mt-0.5">
                        {profile.goal === GoalType.MAINTAIN ? '保持现有身材' : `目标体重：${profile.targetWeight || '--'} kg`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-[#BC8A5F] uppercase tracking-[0.15em] bg-[#BC8A5F]/10 px-3 py-1.5 rounded-lg border border-[#BC8A5F]/10 flex items-center gap-1">
                      <CheckCircle size={10} /> 进行中
                    </span>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-xl text-[#4A3E31] px-1 tracking-tight">应用设置</h3>
          {[
            { id: 'security', icon: Shield, label: '账户与安全', color: 'bg-[#BC8A5F]' },
            { id: 'notifications', icon: Bell, label: '每日提醒', color: 'bg-[#D4A373]' },
            { id: 'help', icon: HelpCircle, label: '使用帮助', color: 'bg-[#82954B]' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSubView(item.id)}
              className="w-full glass rounded-[2rem] p-6 flex items-center justify-between group transition-all active:scale-[0.98] border-white/60 shadow-sm hover:bg-white/80"
            >
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-2xl ${item.color}/10 text-[#4A3E31]/60`}>
                  <item.icon size={22} />
                </div>
                <span className="font-black text-[15px] text-[#4A3E31]">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-[#4A3E31]/20 group-hover:text-[#BC8A5F] transition-colors" />
            </button>
          ))}
          
          <div className="pt-6">
            <GlassCard className="bg-[#4A3E31]/5 border-transparent py-4 px-6 rounded-[1.5rem] flex items-center gap-4">
              <Info size={16} className="text-[#4A3E31]/30" />
              <p className="text-[10px] font-bold text-[#4A3E31]/30 tracking-widest uppercase">
                当前版本 v2.4.0 (Beta) · 已是最新版本
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
