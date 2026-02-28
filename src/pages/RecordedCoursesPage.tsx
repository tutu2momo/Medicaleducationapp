import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const RECORDED_COURSES = [
  {
    id: '1',
    title: '临床抗生素使用规范',
    instructor: 'James Wilson 博士 • 主任医师',
    description: '全面讲解临床环境中抗生素的合理使用与耐药性管理。',
    startTime: '2026-03-01',
    image: 'https://picsum.photos/seed/med2/200/200',
    type: '录播',
    hasExam: true
  },
  {
    id: '3',
    title: '儿科护理基础',
    instructor: 'Michael Brown 博士 • 儿科专家',
    description: '针对儿科常见疾病的护理要点与操作规范。',
    startTime: '2026-03-05',
    image: 'https://picsum.photos/seed/med4/200/200',
    type: '录播',
    hasExam: false
  },
  {
    id: '4',
    title: '心血管疾病诊疗规范',
    instructor: '王强 教授 • 心内科',
    description: '心血管常见疾病的诊断标准与治疗流程详解。',
    startTime: '2026-02-20',
    image: 'https://picsum.photos/seed/med5/200/200',
    type: '录播',
    hasExam: true
  },
  {
    id: '5',
    title: '医学影像学导论',
    instructor: '赵敏 教授 • 影像科',
    description: '医学影像学基础理论与常见影像判读技巧。',
    startTime: '2026-03-15',
    image: 'https://picsum.photos/seed/med6/200/200',
    type: '录播',
    hasExam: true
  },
  {
    id: '6',
    title: '神经内科常见病诊治',
    instructor: '刘洋 主任 • 神经内科',
    description: '脑卒中、癫痫等神经内科常见疾病的诊治策略。',
    startTime: '2026-03-20',
    image: 'https://picsum.photos/seed/med7/200/200',
    type: '录播',
    hasExam: false
  }
];

export default function RecordedCoursesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">录播课程</h1>
        </div>
      </div>

      {/* Course List */}
      <div className="p-4 space-y-4">
        {RECORDED_COURSES.map((course) => (
          <CourseCard 
            key={course.id}
            {...course}
            actionLabel="报名"
            actionColor="blue"
            onClick={() => navigate(`/course/${course.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ image, type, title, instructor, description, startTime, actionLabel, actionColor, onClick, hasExam }: any) {
  return (
    <div onClick={onClick} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 active:bg-gray-50 transition-colors cursor-pointer">
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className={cn(
          "absolute top-1 left-1 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded",
          type === '直播' ? 'bg-orange-500/80' : 'bg-medical-600/80'
        )}>
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
        <div className="flex justify-end mt-1">
          <Button 
            size="sm" 
            className={cn(
              "h-7 text-xs px-3",
              actionColor === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-medical-600 hover:bg-medical-700'
            )}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
