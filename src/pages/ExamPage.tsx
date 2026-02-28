import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const QUESTIONS = [
  {
    id: 1,
    text: "以下哪项不是第一代头孢菌素的主要适应症？",
    options: [
      { id: 'A', text: "手术预防用药" },
      { id: 'B', text: "皮肤及软组织感染" },
      { id: 'C', text: "脑膜炎" },
      { id: 'D', text: "尿路感染" },
    ],
    correctAnswer: 'C',
    explanation: "第一代头孢菌素不能有效穿过血脑屏障，因此不用于治疗脑膜炎。"
  },
  {
    id: 2,
    text: "关于大环内酯类抗生素，下列说法错误的是？",
    options: [
      { id: 'A', text: "对支原体、衣原体有效" },
      { id: 'B', text: "红霉素是第一代代表药物" },
      { id: 'C', text: "主要副作用是肾毒性" },
      { id: 'D', text: "阿奇霉素半衰期较长" },
    ],
    correctAnswer: 'C',
    explanation: "大环内酯类抗生素的主要副作用是胃肠道反应和肝毒性，而非肾毒性。"
  },
  {
    id: 3,
    text: "下列哪种情况首选青霉素G治疗？",
    options: [
      { id: 'A', text: "金黄色葡萄球菌肺炎" },
      { id: 'B', text: "梅毒" },
      { id: 'C', text: "支原体肺炎" },
      { id: 'D', text: "大肠杆菌尿路感染" },
    ],
    correctAnswer: 'B',
    explanation: "青霉素G至今仍是治疗梅毒的首选药物。"
  }
];

export default function ExamPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: number, optionId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / QUESTIONS.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const allAnswered = QUESTIONS.every(q => answers[q.id]);
  const isPassed = score === 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-gray-900">课程考核</span>
        {isSubmitted ? (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
            isPassed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {isPassed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {isPassed ? "通过" : "未通过"}
          </span>
        ) : (
          <span className="text-xs font-medium text-medical-600 bg-medical-50 px-2 py-1 rounded-full">满分100通过</span>
        )}
      </div>

      {/* Progress/Score Bar */}
      <div className="h-1 bg-gray-200 w-full transition-all duration-500">
        <div 
          className={cn("h-full transition-all duration-500", isSubmitted ? (isPassed ? "bg-green-500" : "bg-red-500") : "bg-medical-600")} 
          style={{ width: isSubmitted ? `${score}%` : `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Result Summary */}
      {isSubmitted && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mx-4 mt-4 p-4 rounded-xl flex items-center justify-between shadow-sm",
            isPassed ? "bg-green-500 text-white" : "bg-white border border-red-100"
          )}
        >
          <div>
            <h2 className={cn("text-lg font-bold", isPassed ? "text-white" : "text-gray-900")}>
              {isPassed ? "恭喜通过考核！" : "考核未通过"}
            </h2>
            <p className={cn("text-xs opacity-90", isPassed ? "text-green-50" : "text-gray-500")}>
              {isPassed ? "您已掌握本课程核心知识点" : "请复习后再次尝试"}
            </p>
          </div>
          <div className="text-right">
            <div className={cn("text-3xl font-bold", isPassed ? "text-white" : "text-red-500")}>{score}</div>
            <div className={cn("text-xs opacity-80", isPassed ? "text-green-100" : "text-gray-400")}>得分</div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto pb-24 space-y-6">
        {QUESTIONS.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          const showResult = isSubmitted;

          return (
            <div key={question.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">
                <span className="text-medical-600 mr-2">{index + 1}.</span>
                {question.text}
              </h3>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = userAnswer === option.id;
                  const isCorrectOption = option.id === question.correctAnswer;
                  
                  let optionStyle = "border-gray-100 bg-white hover:bg-gray-50";
                  let iconStyle = "border-gray-300 text-gray-400";
                  let textStyle = "text-gray-700";

                  if (showResult) {
                    if (isCorrectOption) {
                      optionStyle = "border-green-500 bg-green-50";
                      iconStyle = "border-green-600 text-green-600 bg-green-100";
                      textStyle = "text-green-800 font-medium";
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle = "border-red-500 bg-red-50";
                      iconStyle = "border-red-600 text-red-600 bg-red-100";
                      textStyle = "text-red-800";
                    } else if (isSelected) {
                       // Correctly selected (covered by first if, but just in case)
                       optionStyle = "border-green-500 bg-green-50";
                    }
                  } else {
                    if (isSelected) {
                      optionStyle = "border-medical-600 bg-medical-50";
                      iconStyle = "border-medical-600 text-medical-600";
                      textStyle = "text-medical-700 font-medium";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(question.id, option.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border-2 transition-all relative",
                        optionStyle
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                          iconStyle
                        )}>
                          {option.id}
                        </div>
                        <span className={cn("text-sm transition-colors", textStyle)}>{option.text}</span>
                        
                        {showResult && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-green-500 absolute right-4" />
                        )}
                        {showResult && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-500 absolute right-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && !isCorrect && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>解析</span>
                    </div>
                    <p className="text-sm text-orange-700 leading-relaxed">
                      <span className="font-bold mr-1">正确答案 {question.correctAnswer}：</span>
                      {question.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom z-20">
        <div className="flex gap-3 max-w-md mx-auto">
          {isSubmitted ? (
            <>
              <Button variant="outline" className="flex-1" onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setScore(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>再考一次</Button>
              <Button className="flex-1" onClick={() => navigate(-1)}>返回课程</Button>
            </>
          ) : (
            <Button 
              className="w-full shadow-lg shadow-medical-600/20" 
              disabled={!allAnswered}
              onClick={handleSubmit}
              size="lg"
            >
              提交试卷
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
