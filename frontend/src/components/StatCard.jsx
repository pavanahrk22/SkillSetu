import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center", colorClass || "bg-gov-100 text-gov-600")}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={clsx(
            "flex items-center text-sm font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
          )}>
            {trend === 'up' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
};

export default StatCard;
