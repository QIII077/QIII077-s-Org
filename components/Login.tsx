
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { LogIn, UserPlus, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      onLogin(username);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#FDFBF7]">
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BC8A5F]/15 rounded-full blur-[120px] pointer-events-none animate-float"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#E3D5CA]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-10">
          {/* Minimalist Hand-drawn Salad Logo */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#BC8A5F] to-[#D4A373] rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl shadow-[#BC8A5F]/30 mb-6 rotate-3">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-white opacity-95">
              {/* Bowl - Hand-drawn style with slight asymmetry */}
              <path 
                d="M18,52 C18,82 82,82 82,52" 
                stroke="currentColor" 
                strokeWidth="5" 
                fill="none" 
                strokeLinecap="round" 
              />
              <path 
                d="M15,52 L85,52" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-40" 
              />
              
              {/* Salad Leaves - Organic wavy lines */}
              <path 
                d="M28,52 Q32,22 45,45 Q55,15 65,45 Q75,20 78,52" 
                stroke="currentColor" 
                strokeWidth="5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M38,38 Q45,12 55,30" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                className="opacity-60"
              />
              
              {/* Garnishes/Dots */}
              <circle cx="48" cy="42" r="3.5" fill="currentColor" />
              <circle cx="62" cy="34" r="2.5" fill="currentColor" className="opacity-80" />
              <circle cx="35" cy="45" r="2" fill="currentColor" className="opacity-70" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-black text-[#4A3E31] tracking-tight">欢迎来到轻享健康</h1>
          <p className="text-[#4A3E31]/40 text-sm font-bold mt-2 uppercase tracking-widest">开启你的智能营养之旅</p>
        </div>

        <GlassCard className="bg-white/60 border-white/80 p-8 rounded-[3rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#4A3E31]/40 uppercase tracking-[0.2em] ml-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full glass rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/20 font-bold text-[#4A3E31] transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#4A3E31]/40 uppercase tracking-[0.2em] ml-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full glass rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/20 font-bold text-[#4A3E31] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#BC8A5F] to-[#D4A373] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#BC8A5F]/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isRegister ? "立即注册" : "安全登录"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#4A3E31]/5 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-black text-[#BC8A5F] hover:opacity-70 transition-opacity uppercase tracking-widest"
            >
              {isRegister ? "已有账号？去登录" : "没有账号？点击注册"}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
