import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import LearningPathTimeline from '../components/LearningPathTimeline';
import { Search, SlidersHorizontal } from 'lucide-react';

const mockCourses = [
  { id: 1, title: 'Advanced Data Analytics in Governance', provider: 'iGOT Karmayogi', duration: '4 weeks', difficulty: 'Intermediate', matchScore: 95, tags: ['Data Analysis', 'E-Gov'] },
  { id: 2, title: 'Leadership for Public Sector Managers', provider: 'LBSNAA', duration: '2 weeks', difficulty: 'Advanced', matchScore: 88, tags: ['Leadership'] },
  { id: 3, title: 'Foundations of Public Policy Formulation', provider: 'IIPA', duration: '6 weeks', difficulty: 'Beginner', matchScore: 92, tags: ['Public Policy'] },
  { id: 4, title: 'Digital Transformation in Govt', provider: 'iGOT Karmayogi', duration: '3 weeks', difficulty: 'Intermediate', matchScore: 80, tags: ['Digital Lit'] },
];

const mockTimelineSteps = [
  { title: 'Foundations of Public Policy', status: 'completed', description: 'Basic principles of policy making.', duration: '2 weeks', targetCompetency: 'Public Policy (L1)' },
  { title: 'Advanced Data Analytics', status: 'in-progress', description: 'Applying analytics to policy.', duration: '4 weeks', targetCompetency: 'Data Analysis (L3)' },
  { title: 'Leadership for Managers', status: 'pending', description: 'Team management strategies.', duration: '2 weeks', targetCompetency: 'Leadership (L4)' },
];

const CourseRecommendations = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Learning Paths & Courses</h1>
        <p className="text-slate-600 mt-1">AI-curated recommendations based on your identified competency gaps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search courses by skill, provider..." 
                className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-gov-500 outline-none"
              />
            </div>
            <button className="flex items-center space-x-2 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <SlidersHorizontal size={18} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit sticky top-24">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Suggested Learning Path</h3>
          <p className="text-sm text-slate-500 mb-6">Follow this sequence to optimally bridge your critical gaps for the Under Secretary role.</p>
          <LearningPathTimeline steps={mockTimelineSteps} />
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
