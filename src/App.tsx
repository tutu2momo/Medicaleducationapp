import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import MyCoursesPage from './pages/MyCoursesPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import LiveRoomPage from './pages/LiveRoomPage';
import LiveCalendarPage from './pages/LiveCalendarPage';
import ExamPage from './pages/ExamPage';

import RecordedCoursesPage from './pages/RecordedCoursesPage';

import ExamCenterPage from './pages/ExamCenterPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/recorded-courses" element={<RecordedCoursesPage />} />
          <Route path="/exam-center" element={<ExamCenterPage />} />
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/live" element={<LiveRoomPage />} />
          <Route path="/live-calendar" element={<LiveCalendarPage />} />
          <Route path="/exam/:id" element={<ExamPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Medicaleducationapp">
      <div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl overflow-hidden relative">
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
