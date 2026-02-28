import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, User, Heart, X } from 'lucide-react';

export default function LiveRoomPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, user: 'Dr. Smith', text: '欢迎大家来到直播间！' },
    { id: 2, user: 'Student A', text: '请问可以针对考试重点提问吗？' },
    { id: 3, user: 'Nurse Joy', text: '声音很清晰，谢谢老师。' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), user: '我', text: inputValue }]);
    setInputValue('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Live Video Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/med3/400/800" 
          className="w-full h-full object-cover opacity-80"
          alt="Live Stream"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 pt-12 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-white text-xs font-medium">直播中</span>
            <span className="text-white/60 text-xs border-l border-white/20 pl-2 ml-1">1.2k</span>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
             <img src="https://picsum.photos/seed/avatar1/100/100" />
           </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-end p-4 pb-20">
        <div 
          ref={scrollRef}
          className="space-y-3 max-h-[40vh] overflow-y-auto hide-scrollbar mask-gradient-top"
        >
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl rounded-tl-none px-3 py-2 max-w-[80%]">
                <span className="text-medical-300 text-xs font-bold block mb-0.5">{msg.user}</span>
                <p className="text-white text-sm leading-snug">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/10 z-20 safe-area-bottom">
        <div className="flex gap-3 items-center">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="提问..." 
            className="bg-white/10 border-white/10 text-white placeholder:text-white/50 rounded-full h-10 focus-visible:ring-white/20"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="icon" 
            className="rounded-full bg-medical-600 hover:bg-medical-500 shrink-0"
            onClick={handleSend}
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost"
            className="rounded-full text-white hover:bg-white/10 shrink-0"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
