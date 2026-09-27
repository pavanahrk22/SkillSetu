import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const GapCard = ({ competency, current, required, severity }) => {
  const severityColors = {
    Low: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Critical: 'bg-red-100 text-red-700 border-red-200',
  };

  const gap = required - current;
  const percentage = (current / required) * 100;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-slate-800">{competency}</h3>
          <p className="text-sm text-slate-500 mt-1">Gap: {gap.toFixed(1)} points</p>
        </div>
        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium border", severityColors[severity] || severityColors.Medium)}>
          {severity}
        </span>
      </div>

      <div className="space-y-3 mb-5">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Current Level ({current})</span>
            <span className="text-slate-600">Required ({required})</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gov-600 rounded-full"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Link 
        to={`/courses?skill=${encodeURIComponent(competency)}`}
        className="flex items-center text-sm font-medium text-gov-600 hover:text-gov-800 transition-colors"
      >
        View Recommended Courses <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default GapCard;
