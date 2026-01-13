
import React, { useState } from 'react';
import { QUICK_FOODS } from '../constants';
import { MealType, FoodRecord } from '../types';
import { Search, X, Plus, Edit3 } from 'lucide-react';

interface RecordFoodProps {
  onAddRecord: (record: Omit<FoodRecord, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

const RecordFood: React.FC<RecordFoodProps> = ({ onAddRecord, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualCalories, setManualCalories] = useState('');
  const [manualMealType, setManualMealType] = useState<MealType>(MealType.SNACK);

  const handleQuickAdd = (food: typeof QUICK_FOODS[0]) => {
    onAddRecord({
      name: food.name,
      calories: food.calories,
      mealType: food.type as MealType,
      quantity: `1 ${food.unit}`,
    });
    onClose();
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualCalories) return;

    onAddRecord({
      name: manualName,
      calories: parseInt(manualCalories),
      mealType: manualMealType,
      quantity: '1 份',
    });
    onClose();
  };

  const filteredQuickFoods = QUICK_FOODS.filter(f => f.name.includes(searchTerm));

  return (
    <div className="fixed inset-0 z-[60] bg-[#FDFBF7]/90 backdrop-blur-xl flex flex-col animate-fade-in-up">
      <div className="p-8 flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#4A3E31]">记录饮食</h2>
        <button onClick={onClose} className="p-2.5 glass rounded-full text-[#4A3E31]/40 border-white/60">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-10 pb-32">
        {/* Search Bar for Quick Selection */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索预设食物..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass rounded-[2rem] py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/30 transition-all font-bold text-[#4A3E31] border-white/80 shadow-sm"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4A3E31]/30" size={22} />
          </div>
          
          {filteredQuickFoods.length > 0 && (
            <div className="grid grid-cols-1 gap-3">
              {filteredQuickFoods.map((food, idx) => (
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
          )}
        </div>

        {/* Manual Entry Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <Edit3 size={18} className="text-[#BC8A5F]" />
            <h3 className="font-black text-xl text-[#4A3E31] tracking-tight">手动录入</h3>
          </div>
          
          <form onSubmit={handleManualAdd} className="glass rounded-[2.5rem] p-8 space-y-6 border-white/80 shadow-md">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#4A3E31]/40 uppercase tracking-[0.2em] ml-2">食物名称</label>
              <input
                type="text"
                required
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="例如：自制燕麦粥"
                className="w-full glass-dark rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/20 font-bold text-[#4A3E31] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4A3E31]/40 uppercase tracking-[0.2em] ml-2">卡路里 (kcal)</label>
                <input
                  type="number"
                  required
                  value={manualCalories}
                  onChange={(e) => setManualCalories(e.target.value)}
                  placeholder="300"
                  className="w-full glass-dark rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/20 font-bold text-[#4A3E31] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#4A3E31]/40 uppercase tracking-[0.2em] ml-2">餐次类型</label>
                <select
                  value={manualMealType}
                  onChange={(e) => setManualMealType(e.target.value as MealType)}
                  className="w-full glass-dark rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/20 font-bold text-[#4A3E31] transition-all appearance-none"
                >
                  {Object.values(MealType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#BC8A5F] to-[#D4A373] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#BC8A5F]/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Plus size={20} />
              确认录入
            </button>
          </form>
        </div>

        <div className="glass-dark rounded-[2rem] p-6 text-center text-[#4A3E31]/40 text-xs font-bold leading-relaxed border-white/40">
          "健康不是数字的加减，而是身心的和谐。今天也要开心吃饭哦 ✨"
        </div>
      </div>
    </div>
  );
};

export default RecordFood;
