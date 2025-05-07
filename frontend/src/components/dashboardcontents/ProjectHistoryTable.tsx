import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  manager: string;
  status: "Completed" | "Cancelled" | "Ongoing" | "Upcoming" | string;
  start_date: string;
  end_date: string;
}

export default function ProjectHistoryTable() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/projects/history`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Failed to load project history:", err);
      });
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 font-medium";
      case "Cancelled":
        return "text-red-500 font-medium";
      case "Ongoing":
        return "text-yellow-500 font-medium";
      case "Upcoming":
        return "text-blue-500 font-medium";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Project History
        </h2>
        <div className="overflow-x-auto">
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                <tr className="text-left font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Manager</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">Expected End Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr
                    key={proj.id}
                    className="text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800"
                  >
                    <td className="px-4 py-2">{proj.title}</td>
                    <td className="px-4 py-2">{proj.manager}</td>
                    <td className="px-4 py-2">
                      <span className={getStatusClass(proj.status)}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(proj.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(proj.end_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
