import { Share2, PlayCircle, FileText, MessageSquare, CheckCircle, Clock, ChevronDown, GraduationCap, XCircle, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import RatingSheet from './RatingSheet';

export default function CourseDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('details');
  const [showRating, setShowRating] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  
  // Mock state for course status
  const [status, setStatus] = useState(location.state?.status || 'not_registered');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignUp = () => {
    setStatus('pending_start');
    // In a real app, this would update the backend
  };

  const handleStartLearning = () => {
    setIsSignedIn(true);
    setStatus('in_progress');
    navigate('/video/1');
  };

  const handleCancelRegistration = () => {
    if (window.confirm('确定要取消报名吗？')) {
      setStatus('not_registered');
      setIsSignedIn(false);
    }
  };

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Media Area */}
      <div className="relative aspect-video bg-gray-900 w-full">
        <img 
          src="https://picsum.photos/seed/med2/800/450" 
          alt="Course Cover" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white opacity-80" />
        </div>
        <button className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md rounded-full text-white">
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur-md rounded-full text-white"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
        </button>
      </div>

      {/* Course Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-bold text-gray-900 leading-tight flex-1">
            2026年临床抗生素使用指南
          </h1>
          <Badge variant="outline" className="text-medical-600 border-medical-200 bg-medical-50 shrink-0 mt-1">
            <GraduationCap className="w-3 h-3 mr-1" />
            需考试
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium text-gray-900">James Wilson 博士</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>主任医师</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>综合医院</span>
        </div>

        {status === 'pending_start' && !isSignedIn && (
           <div className="bg-orange-50 text-orange-700 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
             <Clock className="w-4 h-4" />
             <span>课程待开始，请签到后开始学习</span>
           </div>
        )}
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex px-4">
          {['details', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-sm font-medium relative",
                activeTab === tab ? "text-medical-600" : "text-gray-500"
              )}
            >
              {tab === 'details' ? '课程详情' : '用户评价'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-medical-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'details' && (
           <div className="space-y-6">
             <div className="prose prose-sm text-gray-600">
               <h3 className="text-gray-900 font-bold mb-2">课程简介</h3>
               <p className="leading-relaxed">
                 本课程全面讲解临床环境中抗生素的合理使用，涵盖最新的耐药性模式和治疗方案。课程内容包括抗生素分类、药代动力学、药效学以及针对不同感染类型的最佳实践指南。
               </p>
               
               <h3 className="text-gray-900 font-bold mt-4 mb-2">学习目标</h3>
               <ul className="list-disc pl-4 space-y-1">
                 <li>掌握各类抗生素的作用机制</li>
                 <li>了解细菌耐药性的产生与预防</li>
                 <li>熟悉常见感染性疾病的抗生素选择原则</li>
               </ul>
             </div>

             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-600">
                   <PlayCircle className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-gray-900 text-sm">单节精讲课程</h4>
                   <p className="text-xs text-gray-500 mt-0.5">时长：45分钟 • 高清视频</p>
                 </div>
               </div>
             </div>
           </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-4 text-center py-10">
             {hasRated ? (
               <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                 <h3 className="font-bold text-green-800 mb-1">评价已提交</h3>
                 <p className="text-sm text-green-600">感谢您的反馈，您的评价对我们很重要。</p>
                 <div className="mt-4 pt-4 border-t border-green-200 grid grid-cols-3 gap-2 text-center">
                   <div>
                     <div className="text-xs text-green-600 mb-1">内容</div>
                     <div className="font-bold text-green-800">5.0</div>
                   </div>
                   <div>
                     <div className="text-xs text-green-600 mb-1">安排</div>
                     <div className="font-bold text-green-800">5.0</div>
                   </div>
                   <div>
                     <div className="text-xs text-green-600 mb-1">教师</div>
                     <div className="font-bold text-green-800">5.0</div>
                   </div>
                 </div>
               </div>
             ) : (
               <>
                 <p className="text-gray-500 mb-4">暂无评价</p>
                 <Button variant="outline" onClick={() => setShowRating(true)}>写评价</Button>
               </>
             )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          {status === 'not_registered' ? (
            <Button 
              className="w-full text-base font-semibold shadow-lg shadow-medical-600/20" 
              size="lg" 
              onClick={handleSignUp}
            >
              报名学习
            </Button>
          ) : !isSignedIn ? (
            <>
              <Button 
                variant="outline" 
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" 
                size="lg" 
                onClick={handleCancelRegistration}
              >
                <XCircle className="w-4 h-4 mr-2" />
                取消报名
              </Button>
              <Button 
                className="flex-[2] text-base font-semibold shadow-lg shadow-medical-600/20" 
                size="lg" 
                onClick={handleStartLearning}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                开始学习
              </Button>
            </>
          ) : (
            <Button 
              className="w-full text-base font-semibold shadow-lg shadow-medical-600/20" 
              size="lg" 
              onClick={() => navigate('/video/1')}
            >
              开始学习
            </Button>
          )}
        </div>
      </div>

      <RatingSheet 
        open={showRating} 
        onOpenChange={setShowRating} 
        onSubmit={() => {
          setHasRated(true);
          setShowRating(false);
        }}
      />
    </div>
  );
}
