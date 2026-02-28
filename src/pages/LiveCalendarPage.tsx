import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Mock Data Generator
const generateDates = (days = 14) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      fullDate: date.toISOString().split('T')[0], // YYYY-MM-DD
      month: `${date.getMonth() + 1}月`,
      day: date.getDate().toString().padStart(2, '0'),
      weekDay: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
    });
  }
  return dates;
};

const MOCK_COURSES = [
  {
    id: '1',
    title: '普通家庭专业院校怎么选更有优势',
    instructor: '任明 教授',
    time: '17:30',
    dayOffset: 0, // Today
    image: 'https://picsum.photos/seed/live1/200/200',
    isReserved: true,
    isLive: true // New property for live status
  },
  {
    id: '2',
    title: '2026年心血管疾病最新诊疗指南解读',
    instructor: '张伟 主任医师',
    time: '19:00',
    dayOffset: 0,
    image: 'https://picsum.photos/seed/live2/200/200',
    isReserved: true,
    isLive: false
  },
  {
    id: '3',
    title: '儿科急诊处理流程规范化培训',
    instructor: '李娜 副主任',
    time: '14:00',
    dayOffset: 1, // Tomorrow
    image: 'https://picsum.photos/seed/live3/200/200',
    isReserved: false
  },
  {
    id: '4',
    title: '医学影像学在早期肺癌筛查中的应用',
    instructor: '王强 教授',
    time: '20:00',
    dayOffset: 2,
    image: 'https://picsum.photos/seed/live4/200/200',
    isReserved: false
  },
  {
    id: '5',
    title: '糖尿病患者的围手术期管理',
    instructor: '赵敏 内分泌科',
    time: '16:30',
    dayOffset: 0,
    image: 'https://picsum.photos/seed/live5/200/200',
    isReserved: false
  }
];

export default function LiveCalendarPage() {
  const navigate = useNavigate();
  const [dates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [courses, setCourses] = useState(MOCK_COURSES);

  const getCoursesForDate = (dateStr: string) => {
    const index = dates.findIndex(d => d.fullDate === dateStr);
    return courses.filter(c => c.dayOffset === index);
  };

  const currentCourses = getCoursesForDate(selectedDate);

  const toggleReservation = (courseId: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return { ...course, isReserved: !course.isReserved };
      }
      return course;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-medical-100/40 to-transparent z-0 pointer-events-none" />

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm bg-white/60">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 hover:bg-black/5 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">直播课程</h1>
        <button className="p-1 -mr-1 text-gray-700 hover:bg-black/5 rounded-full transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Title Section (Optional, to match the feel of the image if needed, but keeping it simple as requested) */}
      <div className="px-4 pt-2 pb-4 relative z-10">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          直播日历
        </h2>
      </div>

      {/* Calendar Strip */}
      <div className="relative z-10">
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-3">
          {dates.map((date, index) => {
            const isSelected = selectedDate === date.fullDate;
            const hasLive = courses.some(c => c.dayOffset === index);
            
            return (
              <button
                key={date.fullDate}
                onClick={() => setSelectedDate(date.fullDate)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[56px] h-[64px] rounded-xl transition-all duration-200 shrink-0 border",
                  isSelected 
                    ? "bg-medical-600 text-white border-medical-600 shadow-md shadow-medical-600/20" 
                    : "bg-white text-gray-500 border-transparent hover:bg-white/80"
                )}
              >
                <span className="text-xs font-medium opacity-80">{date.month}</span>
                <span className="text-lg font-bold leading-none my-0.5">{date.day}</span>
                {hasLive ? (
                  <div className={cn("w-1.5 h-1.5 rounded-full mt-1", isSelected ? "bg-white" : "bg-medical-600")} />
                ) : (
                  <span className="h-1.5 mt-1"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 px-4 pb-8 space-y-4 relative z-10">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 relative overflow-hidden">
              {/* Image */}
              <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                {course.isReserved && (
                  <div className="absolute top-0 left-0 right-0 bg-orange-500/90 text-white text-[10px] font-medium py-0.5 text-center">
                    已预约
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
                
                <div className="flex items-end justify-between mt-3">
                  <div className="text-medical-600 font-bold text-xl flex items-baseline gap-1">
                    <span className="text-sm font-normal text-gray-400">{selectedDate.slice(5)}</span>
                    {course.time}
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      if (course.isLive) {
                        navigate('/live');
                      } else {
                        toggleReservation(course.id);
                      }
                    }}
                    className={cn(
                      "rounded-full px-5 h-8 text-xs font-medium transition-all shadow-none",
                      course.isLive
                        ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                        : course.isReserved 
                          ? "bg-gray-100 text-gray-400 hover:bg-gray-200" 
                          : "bg-medical-50 text-medical-600 hover:bg-medical-100"
                    )}
                  >
                    {course.isLive ? '进入直播' : course.isReserved ? '待开始' : '预约'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white/50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Share2 className="w-8 h-8 text-gray-300" />
            </div>
            <p>该日期暂无直播安排</p>
          </div>
        )}
      </div>
    </div>
  );
}
