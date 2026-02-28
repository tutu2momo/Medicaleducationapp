import * as React from "react"
import { X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface RatingSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

export default function RatingSheet({ open, onOpenChange, onSubmit }: RatingSheetProps) {
  const [ratings, setRatings] = React.useState({
    content: 5,
    arrangement: 5,
    teacher: 5
  })

  const handleRating = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }
  
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 safe-area-bottom max-w-md mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">评价本次课程</h3>
              <button 
                onClick={() => onOpenChange(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <RatingRow 
                label="课程内容" 
                value={ratings.content} 
                onChange={(v) => handleRating('content', v)} 
              />
              <RatingRow 
                label="课程安排" 
                value={ratings.arrangement} 
                onChange={(v) => handleRating('arrangement', v)} 
              />
              <RatingRow 
                label="课程教师" 
                value={ratings.teacher} 
                onChange={(v) => handleRating('teacher', v)} 
              />
            </div>

            <div className="space-y-4">
              <Button className="w-full text-base" size="lg" onClick={() => onSubmit?.()}>
                提交评价
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function RatingRow({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform active:scale-90"
          >
            <Star 
              className={cn(
                "w-8 h-8 transition-colors",
                star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
              )} 
            />
          </button>
        ))}
      </div>
    </div>
  )
}
