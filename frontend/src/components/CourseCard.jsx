import { Clock, BarChart, ExternalLink, Bookmark } from 'lucide-react';
import { clsx } from 'clsx';

const CourseCard = ({ title, provider, duration, difficulty, matchScore, tags }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-all group">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold px-2 py-1 bg-gov-100 text-gov-700 rounded text-uppercase tracking-wider">
            {provider}
          </span>
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
            <span>{matchScore}% Match</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-gov-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <BarChart size={14} className="mr-1" />
            {difficulty}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map(tag => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-between items-center">
        <button className="text-slate-400 hover:text-gov-600 transition-colors">
          <Bookmark size={20} />
        </button>
        <button className="flex items-center bg-gov-600 hover:bg-gov-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Start Course <ExternalLink size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
