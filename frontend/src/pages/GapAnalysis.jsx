import { useState } from 'react';
import CompetencyRadar from '../components/CompetencyRadar';
import GapCard from '../components/GapCard';
import { Filter, Sparkles } from 'lucide-react';

const mockRadarData = [
  { subject: 'Data Analysis', current: 3, required: 5 },
  { subject: 'Project Mgmt', current: 4, required: 4 },
  { subject: 'Leadership', current: 2, required: 4 },
  { subject: 'Digital Lit', current: 4, required: 3 },
  { subject: 'Public Policy', current: 3, required: 5 },
];

const mockGaps = [
  { id: 1, competency: 'Public Policy Analysis', current: 3, required: 5, severity: 'Critical' },
  { id: 2, competency: 'Leadership & Team Management', current: 2, required: 4, severity: 'High' },
  { id: 3, competency: 'Data-Driven Decision Making', current: 3, required: 5, severity: 'Medium' },
  { id: 4, competency: 'E-Governance Implementation', current: 3, required: 4, severity: 'Low' },
];

const GapAnalysis = () => {
  const [filter, setFilter] = useState('All');

  const filteredGaps = filter === 'All' 
    ? mockGaps 
    : mockGaps.filter(g => g.severity === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Gap Analysis</h1>
        <p className="text-slate-600 mt-1">Detailed breakdown of your current competencies vs. required levels for your role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Competency Map</h3>
          <CompetencyRadar data={mockRadarData} />
        </div>

        <div className="bg-gov-50 p-6 rounded-xl border border-gov-100 flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="text-gov-600" size={24} />
            <h3 className="text-lg font-bold text-gov-900">AI Insights</h3>
          </div>
          <div className="prose prose-slate text-sm">
            <p className="text-gov-800 leading-relaxed mb-4">
              Based on your recent assessments and role requirements, your largest gap is in <strong>Public Policy Analysis</strong>. You are currently at Level 3, but a Level 5 is mandated for an Under Secretary position.
            </p>
            <p className="text-gov-800 leading-relaxed">
              Additionally, to prepare for future leadership roles, focus on bridging the gap in <strong>Leadership & Team Management</strong>. We recommend taking the advanced LBSNAA modules to address this quickly.
            </p>
          </div>
          <button className="mt-6 bg-white border border-gov-200 text-gov-700 px-4 py-2 rounded-lg font-medium hover:bg-gov-100 self-start transition-colors">
            Generate Development Plan
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Identified Gaps</h2>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-slate-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-gov-500 outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGaps.map(gap => (
            <GapCard key={gap.id} {...gap} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GapAnalysis;
