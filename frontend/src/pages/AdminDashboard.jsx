import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import HeatMap from '../components/HeatMap';

const mockHeatMapData = [
  { "Data Analysis": 2, "Leadership": 4, "Public Policy": 3, "Digital Lit": 5, "Project Mgmt": 4 },
  { "Data Analysis": 5, "Leadership": 3, "Public Policy": 4, "Digital Lit": 4, "Project Mgmt": 5 },
  { "Data Analysis": 3, "Leadership": 2, "Public Policy": 5, "Digital Lit": 3, "Project Mgmt": 2 },
  { "Data Analysis": 4, "Leadership": 5, "Public Policy": 4, "Digital Lit": 5, "Project Mgmt": 3 },
];
const mockRows = [
  { name: 'Ministry of Finance' },
  { name: 'Ministry of IT' },
  { name: 'Ministry of Health' },
  { name: 'Ministry of Education' }
];
const mockCols = ["Data Analysis", "Leadership", "Public Policy", "Digital Lit", "Project Mgmt"];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
        <p className="text-slate-600 mt-1">Workforce competency analytics and organizational gaps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value="12,450" icon={Users} colorClass="bg-blue-100 text-blue-600" />
        <StatCard title="Avg Competency Score" value="3.8/5" icon={TrendingUp} trend="up" trendValue="+0.2" colorClass="bg-green-100 text-green-600" />
        <StatCard title="Critical Skill Gaps" value="142" icon={AlertTriangle} trend="down" trendValue="-12%" colorClass="bg-red-100 text-red-600" />
        <StatCard title="Training Completion" value="68%" icon={CheckCircle} colorClass="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Organizational Competency Heatmap</h3>
          <button className="text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded font-medium hover:bg-slate-200">Export Report</button>
        </div>
        <div className="mb-4 text-sm text-slate-500 flex items-center space-x-4">
          <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-sm mr-2"></span> &lt; 2 (Critical)</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-sm mr-2"></span> 2 - 3.5 (Needs Impr.)</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-sm mr-2"></span> &gt; 3.5 (Proficient)</span>
        </div>
        <HeatMap data={mockHeatMapData} columns={mockCols} rows={mockRows} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top Deficient Competencies</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Data Analysis (Level 4 required)</span>
              <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-sm">42% Gap</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Leadership (Level 5 required)</span>
              <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded text-sm">28% Gap</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium text-slate-700">E-Governance (Level 3 required)</span>
              <span className="text-yellow-600 font-bold bg-yellow-50 px-2 py-1 rounded text-sm">15% Gap</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Training Effectiveness</h3>
          <p className="text-slate-600 text-sm mb-4">Impact of recent training interventions on competency scores.</p>
          <div className="h-40 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-slate-400">
            [Line Chart Visualization Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
