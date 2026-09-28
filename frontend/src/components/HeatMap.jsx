import { clsx } from 'clsx';

const HeatMap = ({ data, columns, rows }) => {
  // Mock simple heatmap renderer
  const getColor = (value) => {
    if (value >= 4.5) return 'bg-green-600';
    if (value >= 4) return 'bg-green-500';
    if (value >= 3) return 'bg-yellow-400';
    if (value >= 2) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-600 font-medium">
          <tr>
            <th className="p-3 border-b">Department / Role</th>
            {columns.map(col => (
              <th key={col} className="p-3 border-b text-center"><span className="rotate-45 inline-block origin-bottom-left text-xs">{col}</span></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className="border-b last:border-0 hover:bg-slate-50">
              <td className="p-3 font-medium text-slate-700">{row.name}</td>
              {columns.map(col => {
                const val = data[i]?.[col] || 0;
                return (
                  <td key={col} className="p-1">
                    <div 
                      className={clsx(
                        "w-full h-8 rounded-md flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-105",
                        getColor(val)
                      )}
                      title={`${row.name} - ${col}: ${val}`}
                    >
                      {val > 0 ? val : '-'}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatMap;
