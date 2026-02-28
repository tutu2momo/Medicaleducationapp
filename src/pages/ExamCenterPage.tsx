import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, CheckCircle, XCircle, RotateCcw, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock Data for Exams
interface Exam {
  id: string;
  title: string;
  courseName: string;
  duration: string;
  totalScore: number;
  passScore: number;
  status: string;
  score: number | null;
  examTime: string | null;
}

const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: '临床抗生素使用规范考核',
    courseName: '临床抗生素使用指南',
    duration: '45分钟',
    totalScore: 100,
    passScore: 60,
    status: 'pending', // pending, passed, failed
    score: null,
    examTime: null,
  },
  {
    id: '2',
    title: '急诊医学基础测试',
    courseName: '急诊医学前沿更新',
    duration: '30分钟',
    totalScore: 100,
    passScore: 60,
    status: 'passed',
    score: 85,
    examTime: '2026-02-25 14:30',
  },
  {
    id: '3',
    title: '心血管介入治疗考核',
    courseName: '心血管介入治疗研讨',
    duration: '60分钟',
    totalScore: 100,
    passScore: 60,
    status: 'failed',
    score: 45,
    examTime: '2026-02-20 09:00',
  }
];

export default function ExamCenterPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  const pendingExams = MOCK_EXAMS.filter(exam => exam.status === 'pending');
  const completedExams = MOCK_EXAMS.filter(exam => exam.status !== 'pending');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">考试中心</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex px-4 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('pending')}
            className={cn(
              "flex-1 pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'pending' 
                ? "border-medical-600 text-medical-600" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            待参加 ({pendingExams.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'completed' 
                ? "border-medical-600 text-medical-600" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            已完成 ({completedExams.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'pending' ? (
          pendingExams.length > 0 ? (
            pendingExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))
          ) : (
            <EmptyState message="暂无待参加的考试" />
          )
        ) : (
          completedExams.length > 0 ? (
            completedExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} isCompleted />
            ))
          ) : (
            <EmptyState message="暂无已完成的考试" />
          )
        )}
      </div>
    </div>
  );
}

interface ExamCardProps {
  exam: Exam;
  isCompleted?: boolean;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, isCompleted }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-gray-900 line-clamp-1">{exam.title}</h3>
          <p className="text-xs text-gray-500 mt-1">关联课程：{exam.courseName}</p>
        </div>
        {isCompleted && (
          <Badge 
            variant={exam.status === 'passed' ? 'default' : 'destructive'}
            className={cn(
              "shrink-0",
              exam.status === 'passed' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"
            )}
          >
            {exam.status === 'passed' ? (
              <><CheckCircle className="w-3 h-3 mr-1" /> 通过</>
            ) : (
              <><XCircle className="w-3 h-3 mr-1" /> 未通过</>
            )}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 my-3 bg-gray-50 p-2 rounded-lg">
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          <span>总分: {exam.totalScore}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>时长: {exam.duration}</span>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1 font-medium text-gray-900 ml-auto">
            <span>得分: <span className={exam.status === 'passed' ? 'text-green-600' : 'text-red-600'}>{exam.score}</span></span>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {isCompleted ? (
          <>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              查看详情
            </Button>
            <Button 
              size="sm" 
              className="h-8 text-xs bg-medical-600 hover:bg-medical-700"
              onClick={() => navigate(`/exam/${exam.id}`)}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              重新考试
            </Button>
          </>
        ) : (
          <Button 
            className="w-full bg-medical-600 hover:bg-medical-700 h-9"
            onClick={() => navigate(`/exam/${exam.id}`)}
          >
            开始考试
          </Button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        <GraduationCap className="w-8 h-8 text-gray-300" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
