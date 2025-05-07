interface ProjectStats {
  itemTag: string;
  addedBy: string;
  date: string;
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
            <th className="px-4 py-2 border-r-2 border-blue-500">ItemTag</th>
            <th className="px-4 py-2 border-r-2 border-green-500">Added By</th>
            <th className="px-4 py-2 border-r-2 border-yellow-500">Date</th>
            <th className="px-4 py-2">Project Type</th>
            <th className="px-4 py-2">Total Count</th>
          </tr>
        </thead>
        <tbody className="text-white">
          <tr className="border-b border-slate-700">
            <td className="px-4 py-2">{stats.itemTag}</td>
            <td className="px-4 py-2">{stats.addedBy}</td>
            <td className="px-4 py-2">{stats.date}</td>
            <td className="px-4 py-2">Total Projects</td>
            <td className="px-4 py-2">{stats.total}</td>
          </tr>
          <tr className="border-b border-slate-700">
            <td></td>
            <td></td>
            <td></td>
            <td className="px-4 py-2">Ongoing</td>
            <td className="px-4 py-2">{stats.ongoing}</td>
          </tr>
          <tr className="border-b border-slate-700">
            <td></td>
            <td></td>
            <td></td>
            <td className="px-4 py-2">Completed</td>
            <td className="px-4 py-2">{stats.completed}</td>
          </tr>
          <tr className="border-b border-slate-700">
            <td></td>
            <td></td>
            <td></td>
            <td className="px-4 py-2">Upcoming</td>
            <td className="px-4 py-2">{stats.upcoming}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="px-4 py-2">Cancelled</td>
            <td className="px-4 py-2">{stats.cancelled}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectSummaryTable;
