import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, Maximize, CheckCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VideoPlayerPage() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Video Player Area */}
      <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center group">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 p-2 bg-black/40 rounded-full text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <img 
          src="https://picsum.photos/seed/med2/800/450" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          alt="Video"
        />
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="text-white text-xs font-mono">04:20</span>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-medical-500"></div>
            </div>
            <span className="text-white text-xs font-mono">15:00</span>
            <Maximize className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-4 relative z-10 p-6 flex flex-col">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-2">02. 青霉素与头孢菌素</h2>
        <p className="text-gray-500 text-sm mb-8">
          详细解析作用机制、抗菌谱及常见临床适应症。
        </p>

        {/* Sign-in Card */}
        <AnimatePresence>
          {!signedIn ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-auto mx-auto w-full max-w-sm"
            >
              <div className="bg-white border border-medical-100 rounded-2xl p-6 shadow-xl shadow-medical-100/50 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-medical-400 to-medical-600"></div>
                <h3 className="font-semibold text-gray-900 mb-1">首次观看请签到</h3>
                <p className="text-xs text-gray-500 mb-4">签到以记录您的学习进度</p>
                <Button 
                  className="w-full shadow-lg shadow-medical-500/20" 
                  onClick={() => setSignedIn(true)}
                >
                  立即签到
                </Button>
              </div>
            </motion.div>
          ) : (
             <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-auto mx-auto w-full max-w-sm bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-center gap-2 text-green-700 font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              <span>签到成功</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
