
import React, { useState, useRef, useEffect } from 'react';
import GlassCard from './GlassCard';
import { createAIAssistantChat, editImageWithAI } from '../services/gemini';
import { Send, Image as ImageIcon, Camera, Loader2, Sparkles, Wand2, ArrowLeft } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: '你好！我是你的轻享小助。今天有什么我可以帮你的吗？不管是饮食建议还是想魔法修改照片，我都在这里哦。' }
  ]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatRef.current = createAIAssistantChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || chatLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', text: response.text || '对不起，我暂时无法回答。' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: '出了点小差错，请稍后再试。' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditingImage(reader.result as string);
        setShowEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!editingImage || !editPrompt || editLoading) return;
    setEditLoading(true);
    
    const base64 = editingImage.split(',')[1];
    const result = await editImageWithAI(base64, editPrompt);
    
    if (result) {
      setEditingImage(result);
      setEditPrompt('');
      setMessages(prev => [...prev, { role: 'assistant', text: '我已经按照你的要求修改好照片了！你可以长按保存它。' }]);
    } else {
      alert("魔法修改失败，请换个要求试试吧。");
    }
    setEditLoading(false);
  };

  if (showEditor) {
    return (
      <div className="p-6 pb-40 space-y-6 pt-12 animate-fade-in max-w-4xl mx-auto w-full">
        <button 
          onClick={() => setShowEditor(false)} 
          disabled={editLoading}
          className="flex items-center gap-2 text-[#4A3E31]/50 font-bold mb-4 disabled:opacity-30"
        >
          <ArrowLeft size={20} /> 返回对话
        </button>
        <h1 className="text-3xl font-black text-[#4A3E31]">AI 魔法编辑器</h1>
        
        <GlassCard className="aspect-square flex items-center justify-center p-2 bg-white/40 border-white/80 max-w-md mx-auto relative overflow-hidden">
          {editingImage ? (
            <img src={editingImage} className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${editLoading ? 'opacity-50' : 'opacity-100'}`} alt="To Edit" />
          ) : (
            <div className="text-gray-400">请先上传图片</div>
          )}
          {editLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
              <div className="bg-white/90 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-[#BC8A5F]" size={32} />
                <span className="text-xs font-black text-[#BC8A5F] tracking-widest uppercase">魔法施放中...</span>
              </div>
            </div>
          )}
        </GlassCard>

        <div className="space-y-4 max-w-md mx-auto">
          <label className="text-sm font-bold text-[#4A3E31]/60">你想怎么修改？</label>
          <div className="relative">
            <textarea
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              disabled={editLoading}
              placeholder="例如：添加复古滤镜、移除背景的人物..."
              className="w-full glass rounded-2xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#BC8A5F]/50 text-[#4A3E31] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleEditImage}
              disabled={editLoading || !editPrompt}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-[#BC8A5F] to-[#D4A373] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-[#BC8A5F]/20 transition-all active:scale-95"
            >
              {editLoading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
              {editLoading ? '处理中...' : '开始魔法'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] pt-10 max-w-4xl mx-auto w-full">
      <div className="px-6 flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-[#4A3E31]">轻享小助</h1>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={chatLoading}
          className="p-3 glass rounded-2xl text-[#BC8A5F] hover:scale-105 transition-transform shadow-lg border-white/80 disabled:opacity-50 disabled:grayscale"
        >
          <Wand2 size={24} />
        </button>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 space-y-6 pb-44 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm break-words ${
              msg.role === 'user' 
              ? 'bg-gradient-to-br from-[#BC8A5F] to-[#D4A373] text-white rounded-tr-none shadow-[#BC8A5F]/10' 
              : 'glass text-[#4A3E31] rounded-tl-none border-white/60 font-medium'
            }`}>
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {chatLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="glass p-4 rounded-2xl rounded-tl-none border-white/60 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#BC8A5F] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#BC8A5F] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#BC8A5F] rounded-full animate-bounce"></div>
              </div>
              <span className="text-[10px] font-black text-[#BC8A5F]/60 uppercase tracking-widest">思考中</span>
            </div>
          </div>
        )}
      </div>

      <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass rounded-full p-2 flex items-center gap-2 shadow-2xl z-40 border-white/80 group transition-all ${chatLoading ? 'opacity-70 grayscale-[0.5]' : 'focus-within:ring-2 focus-within:ring-[#BC8A5F]/20'}`}>
        <input
          type="text"
          value={input}
          disabled={chatLoading}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={chatLoading ? "正在回复中..." : "问问小助如何吃得更健康..."}
          className="flex-1 bg-transparent px-5 py-3 focus:outline-none font-bold text-sm text-[#4A3E31] disabled:cursor-not-allowed"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || chatLoading}
          className="bg-[#BC8A5F] text-white p-3.5 rounded-full shadow-lg shadow-[#BC8A5F]/20 transition-all active:scale-90 disabled:opacity-50"
        >
          {chatLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
