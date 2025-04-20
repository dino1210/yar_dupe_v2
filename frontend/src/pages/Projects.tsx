import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import {
  Search,
  CircleCheck,
  CheckCircle2,
  CalendarDays,
  User2,
  UserRoundCheck,
  Construction,
  Clock,
  XCircle,
} from "lucide-react";

interface ProjectType {
  id: number;
  title: string;
  manager: string;
  personInCharge?: string;
  tools: string;
  startDate: string;
  endDate: string;
  status?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const statusStyles: Record<string, string> = {
  Ongoing: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Upcoming: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons: Record<string, ReactNode> = {
  Ongoing: <CheckCircle2 className="w-4 h-4" />,
  Completed: <CircleCheck className="w-4 h-4" />,
  Upcoming: <Clock className="w-4 h-4" />,
  Cancelled: <XCircle className="w-4 h-4" />,
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const filteredProjects = projects.filter((proj) => {
    const matchSearch = proj.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "All" || proj.status === filter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Projects</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project title..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((proj) => {
          const status = proj.status || "Ongoing";
          const toolsList = proj.tools.replace(/\[|\]|"/g, "").split(",").map((t) => t.trim());
          const visibleTools = toolsList.slice(0, 4);
          const remainingTools = toolsList.length - visibleTools.length;

          return (
            <div
              key={proj.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 p-6 transition-all hover:shadow-lg hover:scale-[1.01] ${
                status === "Ongoing"
                  ? "border-green-500"
                  : status === "Completed"
                  ? "border-blue-500"
                  : status === "Upcoming"
                  ? "border-yellow-500"
                  : "border-red-500"
              }`}
            >
              <div className="flex flex-col gap-4">
                {/* Project Info */}
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 truncate">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User2 className="w-5 h-5" />
                    <span>
                      <span className="text-gray-500">Manager:</span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">{proj.manager}</span>
                    </span>
                  </p>

                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <UserRoundCheck className="w-5 h-5" />
                    <span>
                      <span className="text-gray-500">Person in Charge:</span>{" "}
                      <span className={
                        proj.personInCharge
                          ? "font-medium text-gray-900 dark:text-white"
                          : "text-red-500 italic"
                      }>
                        {proj.personInCharge || "Not Assigned"}
                      </span>
                    </span>
                  </p>

                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    {formatDate(proj.startDate)} — {formatDate(proj.endDate)}
                  </p>
                </div>

                {/* Tools / Equipment */}
                <div className="text-sm">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1 flex items-center gap-2">
                    <Construction className="w-5 h-5" /> Tools / Equipment Used
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 list-disc ml-4 text-gray-700 dark:text-gray-300">
                    {visibleTools.map((tool, i) => (
                      <li key={i}>{tool}</li>
                    ))}
                    {remainingTools > 0 && (
                      <li className="italic text-gray-500">+{remainingTools} more...</li>
                    )}
                  </ul>
                </div>

                {/* Status */}
                <div className="flex justify-end text-sm">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${statusStyles[status]}`}
                  >
                    {statusIcons[status]} {status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
