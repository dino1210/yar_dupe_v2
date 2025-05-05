


interface ProjectStats {
    total: number;
    ongoing: number;
    completed: number;
    upcoming: number;
    cancelled: number;
  }
  
  const ProjectSummaryTable = ({ stats }: { stats: ProjectStats }) => {
    return (
      <div className="bg-[#0F172A] p-4 rounded-xl shadow-md text-white">
        <h2 className="text-lg font-semibold mb-3">Project Overview</h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-800 text-gray-300">
            <tr>
              <th className="px-4 py-2">Project Type</th>
              <th className="px-4 py-2">Total Count</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr className="border-b border-slate-700">
              <td className="px-4 py-2">Total Projects</td>
              <td className="px-4 py-2">{stats.total}</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="px-4 py-2">Ongoing</td>
              <td className="px-4 py-2">{stats.ongoing}</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="px-4 py-2">Completed</td>
              <td className="px-4 py-2">{stats.completed}</td>
            </tr>
            <tr className="border-b border-slate-700">
              <td className="px-4 py-2">Upcoming</td>
              <td className="px-4 py-2">{stats.upcoming}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Cancelled</td>
              <td className="px-4 py-2">{stats.cancelled}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ProjectSummaryTable;
  
