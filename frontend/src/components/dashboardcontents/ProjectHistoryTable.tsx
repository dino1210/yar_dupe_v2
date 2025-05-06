import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock, Hourglass } from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "Cancelled":
        return <XCircle className="text-red-500" size={16} />;
      case "Ongoing":
        return <Clock className="text-yellow-500" size={16} />;
      case "Upcoming":
        return <Hourglass className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Project History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
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
                  <td className="px-4 py-2 flex items-center gap-2">
                    {proj.status}
                    {getStatusIcon(proj.status)}
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
  );
}
