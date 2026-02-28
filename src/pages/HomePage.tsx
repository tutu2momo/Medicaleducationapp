import { Search, Play, Video, BookOpen, ChevronRight, ChevronLeft, GraduationCap, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();
  const [reservedCourses, setReservedCourses] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleReserve = (courseId: string) => {
    setReservedCourses(prev => [...prev, courseId]);
    setShowSuccessModal(true);
  };

  const handleCancelReserve = (courseId: string) => {
    setReservedCourses(prev => prev.filter(id => id !== courseId));
  };

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* App Bar */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <button className="p-1 -ml-1 text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">远程医学教育</h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </div>

      {/* Search Area */}
      <div className="px-4 py-3 z-10">
        <div className="relative shadow-sm rounded-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="搜索课程、讲师..." 
            className="pl-9 bg-white border-none shadow-sm"
          />
        </div>
      </div>

      <div className="p-4 space-y-6 pt-0">
        {/* Banner Carousel */}
        <div className="relative overflow-hidden rounded-2xl aspect-video bg-medical-100 shadow-md">
          <img 
            src="https://picsum.photos/seed/medical1/800/450" 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg">2026年临床抗生素使用指南更新</h3>
            <p className="text-white/80 text-xs">Sarah Chen 博士 • 心脏科主任医师</p>
          </div>
        </div>

        {/* Navigation Grid - Updated to 4 buttons */}
        <div className="grid grid-cols-4 gap-2">
          <NavButton 
            icon={<Play className="w-6 h-6 text-medical-600" />} 
            label="录播课程" 
            onClick={() => navigate('/recorded-courses')}
          />
          <NavButton 
            icon={<Video className="w-6 h-6 text-medical-600" />} 
            label="直播课程" 
            onClick={() => navigate('/live-calendar')}
          />
          <NavButton 
            icon={<GraduationCap className="w-6 h-6 text-medical-600" />} 
            label="考试中心" 
            onClick={() => navigate('/exam-center')}
          />
          <NavButton 
            icon={<BookOpen className="w-6 h-6 text-medical-600" />} 
            label="我的课程" 
            onClick={() => navigate('/my-courses')}
          />
        </div>

        {/* Recorded Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-medical-600 pl-2">录播课程推荐</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 h-auto p-0 hover:bg-transparent"
              onClick={() => navigate('/recorded-courses')}
            >
              查看全部 <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            <CourseCard 
              image="https://picsum.photos/seed/med2/200/200"
              type="录播"
              title="临床抗生素使用规范"
              instructor="James Wilson 博士 • 主任医师"
              description="全面讲解临床环境中抗生素的合理使用与耐药性管理。"
              startTime="2026-03-01"
              actionLabel="报名"
              actionColor="blue"
              hasExam={true}
              onClick={() => navigate('/course/1')}
            />
             <CourseCard 
              image="https://picsum.photos/seed/med4/200/200"
              type="录播"
              title="儿科护理基础"
              instructor="Michael Brown 博士 • 儿科专家"
              description="针对儿科常见疾病的护理要点与操作规范。"
              startTime="2026-03-05"
              actionLabel="报名"
              actionColor="blue"
              hasExam={false}
              onClick={() => navigate('/course/3')}
            />
          </div>
        </div>

        {/* Live Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-2">直播课程预告</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 h-auto p-0 hover:bg-transparent"
              onClick={() => navigate('/live-calendar')}
            >
              查看全部 <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            <CourseCard 
              image="https://picsum.photos/seed/med3/200/200"
              type="直播"
              title="急诊医学前沿更新"
              instructor="Emily Zhang 博士 • 副教授"
              description="探讨急诊医学领域的最新研究进展与临床应用。"
              startTime="2026-03-10 19:30"
              actionLabel={reservedCourses.includes('live-1') ? '待开始' : '预约'}
              actionColor="orange"
              hasExam={true}
              isReserved={reservedCourses.includes('live-1')}
              onActionClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleReserve('live-1');
              }}
              onCancelClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleCancelReserve('live-1');
              }}
              onClick={() => navigate('/course/2')}
            />
            <CourseCard 
              image="https://picsum.photos/seed/med5/200/200"
              type="直播"
              title="心血管介入治疗研讨"
              instructor="David Lee 教授 • 心内科"
              description="深入分析复杂心血管病例的介入治疗策略。"
              startTime="2026-03-12 20:00"
              actionLabel={reservedCourses.includes('live-2') ? '待开始' : '预约'}
              actionColor="orange"
              hasExam={false}
              isReserved={reservedCourses.includes('live-2')}
              onActionClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleReserve('live-2');
              }}
              onCancelClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleCancelReserve('live-2');
              }}
              onClick={() => navigate('/live')}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setShowSuccessModal(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 shadow-xl max-w-md mx-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-4 pt-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">预约成功</h3>
                  <p className="text-sm text-gray-500">
                    课程开始前15分钟将通过消息提醒您
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-medical-600 hover:bg-medical-700"
                  onClick={() => setShowSuccessModal(false)}
                >
                  我知道了
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-2 active:scale-95 transition-transform">
      <div className="w-12 h-12 rounded-2xl bg-medical-50 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

function CourseCard({ image, type, title, instructor, description, startTime, actionLabel, actionColor, onClick, hasExam, onActionClick, onCancelClick, isReserved }: any) {
  return (
    <div onClick={onClick} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 active:bg-gray-50 transition-colors cursor-pointer">
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className={`absolute top-1 left-1 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded ${type === '直播' ? 'bg-orange-500/80' : 'bg-medical-600/80'}`}>
          {type}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-gray-900 line-clamp-1 leading-tight mb-1">{title}</h3>
            {hasExam && (
              <Badge variant="outline" className="text-[10px] px-1.5 h-4 text-medical-600 border-medical-200 bg-medical-50 shrink-0 whitespace-nowrap">
                需考试
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-1 line-clamp-1">{instructor}</p>
          <p className="text-xs text-gray-400 line-clamp-1 mb-1">{description}</p>
          <p className="text-xs text-medical-600 bg-medical-50 inline-block px-1.5 py-0.5 rounded">
            开始时间: {startTime}
          </p>
        </div>
        <div className="flex justify-end mt-1 gap-2">
          {isReserved && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-2 text-gray-500 border-gray-200 hover:bg-gray-100"
              onClick={onCancelClick}
            >
              取消预约
            </Button>
          )}
          <Button 
            size="sm" 
            className={`h-7 text-xs px-3 ${
              isReserved 
                ? 'bg-gray-100 text-gray-400 hover:bg-gray-200 shadow-none' 
                : actionColor === 'orange' 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'bg-medical-600 hover:bg-medical-700'
            }`}
            onClick={isReserved ? undefined : onActionClick}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
