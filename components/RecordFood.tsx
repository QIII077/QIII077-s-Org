
import React, { useState, useRef } from 'react';
import GlassCard from './GlassCard';
import { QUICK_FOODS, COLORS } from '../constants';
import { MealType, FoodRecord } from '../types';
import { Camera, Search, X, Loader2, Plus, Sparkles } from 'lucide-react';
import { analyzeFoodImage, searchFoodCalories } from '../services/gemini';

interface RecordFoodProps {
  onAddRecord: (record: Omit<FoodRecord, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

const RecordFood: React.FC<RecordFoodProps> = ({ onAddRecord, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuickAdd = (food: typeof QUICK_FOODS[0]) => {
    onAddRecord({
      name: food.name,
      calories: food.calories,
      mealType: food.type as MealType,
      quantity: `1 ${food.unit}`,
    });
    onClose();
  };

  const handleManualSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setIsSearching(true);
    const result = await searchFoodCalories(searchTerm);
    if (result) {
      onAddRecord({
        name: result.name,
        calories: result.calories,
        mealType: MealType.SNACK,
        quantity: `1 ${result.unit || '份'}`,
      });
      onClose();
    } else {
      alert("抱歉，未能找到该食物的信息。请尝试更具体或手动输入。");
    }
    setLoading(false);
    setIsSearching(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeFoodImage(base64);
      if (result) {
        onAddRecord({
          name: result.name,
          calories: result.calories,
          mealType: MealType.SNACK,
          quantity: '1 份',
        });
        onClose();
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#FDFBF7]/90 backdrop-blur-xl flex flex-col animate-fade-in-up">
      <div className="p-8 flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#4A3E31]">记录饮食</h2>
        <button onClick={onClose} className="p-2.5 glass rounded-full text-[#4A3E31]/40 border-white/60">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-8 pb-32">
        {/* Search Bar */}
        <form onSubmit={handleManualSearch} className="relative">
          <input
            type="text"
            placeholder="搜一搜食物热量..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass rounded-[2rem] py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/30 transition-all font-bold text-[#4A3E31] border-white/80 shadow-sm"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4A3E31]/30" size={22} />
          {searchTerm && (
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#BC8A5F] text-white p-2.5 rounded-full shadow-lg shadow-[#BC8A5F]/20"
            >
              <Plus size={18} />
            </button>
          )}
        </form>

        {/* Entry Points */}
        <div className="grid grid-cols-2 gap-5">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.97] bg-white/40 border-white/80 hover:bg-white/60"
          >
            <div className="p-4.5 bg-[#BC8A5F]/10 rounded-2xl text-[#BC8A5F]">
              <Camera size={32} />
            </div>
            <span className="font-black text-sm text-[#4A3E31]">拍照识别</span>
          </button>
          <button
            onClick={handleManualSearch}
            className="glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.97] bg-white/40 border-white/80 hover:bg-white/60"
          >
            <div className="p-4.5 bg-[#D4A373]/10 rounded-2xl text-[#D4A373]">
              <Sparkles size={32} />
            </div>
            <span className="font-black text-sm text-[#4A3E31]">AI 快速分析</span>
          </button>
        </div>

        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
        />

        {loading && (
          <div className="flex flex-col items-center gap-4 py-12 glass rounded-[2.5rem] animate-pulse border-white/60">
            <Loader2 className="animate-spin text-[#BC8A5F]" size={40} />
            <p className="text-sm font-black text-[#4A3E31]/40 tracking-tight">
              {isSearching ? '正在搜索全球数据...' : 'AI 正在努力识别图片...'}
            </p>
          </div>
        )}

        {/* Quick Selections */}
        {!loading && (
          <div className="space-y-4">
            <h3 className="font-black text-lg text-[#4A3E31] px-1">常用食物</h3>
            <div className="grid grid-cols-1 gap-3.5">
              {QUICK_FOODS.filter(f => f.name.includes(searchTerm)).map((food, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAdd(food)}
                  className="flex items-center justify-between p-5 glass rounded-[2rem] hover:bg-white/90 transition-all border-white/60 shadow-sm active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1rem] bg-[#FDFBF7] flex items-center justify-center text-xl shadow-inner">
                      {food.name.includes('咖啡') ? '☕️' : food.name.includes('奶茶') ? '🧋' : '🥪'}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-[15px] text-[#4A3E31]">{food.name}</p>
                      <p className="text-[10px] text-[#4A3E31]/40 font-black uppercase tracking-widest mt-0.5">{food.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#BC8A5F] text-base">{food.calories} <span className="text-[10px]">kcal</span></p>
                    <p className="text-[10px] text-[#4A3E31]/30 font-bold uppercase tracking-tighter mt-0.5">1 {food.unit}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="glass-dark rounded-[2rem] p-6 text-center text-[#4A3E31]/40 text-xs font-bold leading-relaxed border-white/40">
          "健康不是数字的加减，而是身心的和谐。今天也要开心吃饭哦 ✨"
        </div>
      </div>
    </div>
  );
};

export default RecordFood;