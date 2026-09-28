import { Award, Target, BookOpen, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import CompetencyRadar from '../components/CompetencyRadar';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const mockRadarData = [
  { subject: 'Data Analysis', current: 3, required: 5 },
  { subject: 'Project Mgmt', current: 4, required: 4 },
  { subject: 'Leadership', current: 2, required: 4 },
  { subject: 'Digital Lit', current: 4, required: 3 },
  { subject: 'Public Policy', current: 3, required: 5 },
];

const mockCourses = [
  { id: 1, title: 'Advanced Data Analytics in Governance', provider: 'iGOT Karmayogi', duration: '4 weeks', difficulty: 'Intermediate', matchScore: 92, tags: ['Data Analysis'] },
  { id: 2, title: 'Leadership for Public Sector Managers', provider: 'LBSNAA', duration: '2 weeks', difficulty: 'Advanced', matchScore: 85, tags: ['Leadership'] },
];

const LearnerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name || 'Officer'}</h1>
          <p className="text-slate-600 mt-1">Here is your competency overview and learning progress.</p>
        </div>
        <Link to="/assessment" className="bg-saffron-500 hover:bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          Take Self-Assessment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Score" value="72%" icon={Award} trend="up" trendValue="+5%" colorClass="bg-blue-100 text-blue-600" />
        <StatCard title="Gaps Identified" value="3" icon={Target} colorClass="bg-red-100 text-red-600" />
        <StatCard title="Courses Completed" value="12" icon={BookOpen} colorClass="bg-green-100 text-green-600" />
        <StatCard title="Learning Hours" value="45h" icon={Clock} colorClass="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Competency Profile</h3>
          <div className="h-80">
            <CompetencyRadar data={mockRadarData} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Priority Gaps</h3>
            <Link to="/gaps" className="text-sm text-gov-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex justify-between font-bold text-red-900 mb-2"><span>Public Policy</span> <span>Level 3 / 5</span></div>
              <p className="text-sm text-red-700">Critical gap identified for current designation.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex justify-between font-bold text-orange-900 mb-2"><span>Leadership</span> <span>Level 2 / 4</span></div>
              <p className="text-sm text-orange-700">High priority for upcoming promotion cycle.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Top Recommendations for You</h2>
          <Link to="/courses" className="text-gov-600 font-medium hover:underline">Explore Catalog &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
