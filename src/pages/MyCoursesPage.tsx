import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowLeft, Clock, GraduationCap, Video, PlayCircle } from 'lucide-react';

// Mock Data
const MOCK_MY_COURSES = [
  {
    id: '1',
    title: '临床抗生素使用指南',
    instructor: 'James Wilson 博士',
    startTime: '2026-03-01 14:00',
    type: 'recorded',
    status: 'in_progress',
    hasExam: true,
    progress: 75,
    image: 'https://picsum.photos/seed/med2/200/200'
  },
  {
    id: '2',
    title: '急诊医学前沿更新',
    instructor: '张伟 主任医师',
    startTime: '2026-03-05 09:00',
    type: 'recorded',
    status: 'pending_exam',
    hasExam: true,
    progress: 100,
    image: 'https://picsum.photos/seed/med3/200/200'
  },
  {
    id: '3',
    title: '儿科护理基础',
    instructor: '李娜 副主任',
    startTime: '2026-03-10 10:00',
    type: 'live',
    status: 'pending_start',
    hasExam: false,
    progress: 0,
    image: 'https://picsum.photos/seed/med4/200/200'
  },
  {
    id: '4',
    title: '心血管疾病诊疗规范',
    instructor: '王强 教授',
    startTime: '2026-02-20 15:00',
    type: 'recorded',
    status: 'completed',
    hasExam: true,
    progress: 100,
    image: 'https://picsum.photos/seed/med5/200/200'
  },
  {
    id: '5',
    title: '医学影像学导论',
    instructor: '赵敏 教授',
    startTime: '2026-03-15 08:00',
    type: 'recorded',
    status: 'pending_start',
    hasExam: true,
    progress: 0,
    image: 'https://picsum.photos/seed/med6/200/200'
  }
];

export default function MyCoursesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('pending_start');

  // Check if we navigated here from "Exam Center" button
  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state]);

  const tabs = [
    { id: 'pending_start', label: '待开始' },
    { id: 'in_progress', label: '进行中' },
    { id: 'pending_exam', label: '待考试' },
    { id: 'completed', label: '已完成' },
  ];

  const filteredCourses = MOCK_MY_COURSES.filter(course => course.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">我的课程</h1>
        </div>
        
        {/* Scrollable Tabs */}
        <div className="flex overflow-x-auto px-4 pb-0 hide-scrollbar gap-6 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors px-2",
                activeTab === tab.id 
                  ? "border-medical-600 text-medical-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="p-4 space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <MyCourseCard 
              key={course.id}
              course={course}
              onClick={() => {
                if (course.status === 'pending_exam') {
                  navigate(`/exam/${course.id}`);
                } else if (course.type === 'live' && course.status === 'pending_start') {
                   // For live courses pending start, maybe go to details or live room if close
                   navigate('/live-calendar'); // Or specific live detail
                } else {
                  navigate(`/course/${course.id}`, { state: { status: course.status } });
                }
              }}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>暂无相关课程</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface MyCourseCardProps {
  course: typeof MOCK_MY_COURSES[0];
  onClick: () => void;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({ course, onClick }) => {
  const isCompleted = course.status === 'completed';
  
  return (
    <div onClick={onClick} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 cursor-pointer active:scale-[0.99] transition-transform relative overflow-hidden">
      {/* Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className={cn(
          "absolute top-0 left-0 text-white text-[10px] px-1.5 py-0.5 rounded-br-lg backdrop-blur-sm",
          course.type === 'live' ? "bg-orange-500/90" : "bg-medical-600/90"
        )}>
          {course.type === 'live' ? '直播' : '录播'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">
              {course.title}
            </h3>
            {course.hasExam && (
              <Badge variant="outline" className="text-[10px] px-1.5 h-5 text-medical-600 border-medical-200 bg-medical-50 shrink-0 whitespace-nowrap">
                需考试
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.instructor}</p>
        </div>
        
        <div className="mt-2">
          {course.status === 'pending_start' ? (
            <div className="flex items-center gap-1 text-xs text-medical-600 font-medium">
              <Clock className="w-3 h-3" />
              <span>{course.startTime} 开课</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>学习进度</span>
                <span className="font-medium text-medical-600">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
