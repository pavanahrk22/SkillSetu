import { Check, Circle } from 'lucide-react';
import { clsx } from 'clsx';

const LearningPathTimeline = ({ steps }) => {
  return (
    <div className="relative pl-8 border-l-2 border-slate-200 ml-4 space-y-8 py-4">
      {steps.map((step, index) => (
        <div key={index} className="relative group">
          {/* Connector Node */}
          <div className={clsx(
            "absolute -left-[41px] top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-colors",
            step.status === 'completed' ? "bg-green-500" :
            step.status === 'in-progress' ? "bg-gov-500 animate-pulse" : "bg-slate-200"
          )}>
            {step.status === 'completed' ? <Check size={14} className="text-white" /> : 
             step.status === 'in-progress' ? <Circle size={10} className="text-white fill-white" /> : null}
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg text-slate-800">{step.title}</h4>
              <span className={clsx(
                "text-xs px-2 py-1 rounded font-medium",
                step.status === 'completed' ? "bg-green-100 text-green-700" :
                step.status === 'in-progress' ? "bg-gov-100 text-gov-700" : "bg-slate-100 text-slate-600"
              )}>
                {step.status === 'completed' ? 'Completed' :
                 step.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </span>
            </div>
            
            <p className="text-slate-600 text-sm mb-4">{step.description}</p>
            
            <div className="flex items-center space-x-4 text-xs font-medium text-slate-500">
              <span className="bg-slate-50 px-2 py-1 rounded">Est: {step.duration}</span>
              <span className="bg-slate-50 px-2 py-1 rounded">Target: {step.targetCompetency}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPathTimeline;
