
import React from 'react';

const AIAssistant: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
      <div className="w-24 h-24 bg-[#BC8A5F]/10 rounded-full flex items-center justify-center text-4xl mb-6">⏳</div>
      <h1 className="text-2xl font-black text-[#4A3E31]">AI 小助即将上线</h1>
      <p className="text-sm text-[#4A3E31]/50 mt-2">目前仅支持手动健康管理功能，敬请期待！</p>
    </div>
  );
};

export default AIAssistant;
