import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Label,
} from "recharts";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

interface ProjectType {
  tools: string;
  consumables: string;
  vehicles: string;
}

interface ItemFrequency {
  name: string;
  count: number;
  category?: string;
  exported_at?: string;
}

const MostUsedItemsReport = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [topTools, setTopTools] = useState<ItemFrequency[]>([]);
  const [topConsumables, setTopConsumables] = useState<ItemFrequency[]>([]);
  const [topVehicles, setTopVehicles] = useState<ItemFrequency[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects`
        );
        const formatted: ProjectType[] = res.data.map((p: any) => ({
          tools: p.tools_equipment_used,
          consumables: p.consumables_used,
          vehicles: p.vehicles_used,
        }));
        setProjects(formatted);
      } catch (err) {
        console.error("Failed to fetch project data:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const countItems = (items: string[]): ItemFrequency[] => {
      const countMap: Record<string, number> = {};
      items.forEach((entry) => {
        entry
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item)
          .forEach((item) => {
            countMap[item] = (countMap[item] || 0) + 1;
          });
      });
      return Object.entries(countMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    };

    setTopTools(countItems(projects.map((p) => p.tools)));
    setTopConsumables(countItems(projects.map((p) => p.consumables)));
    setTopVehicles(countItems(projects.map((p) => p.vehicles)));
  }, [projects]);

  const renderList = (items: ItemFrequency[]) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-1"
        >
          <span className="text-gray-700 dark:text-white">{item.name}</span>
          <span className="text-gray-500 dark:text-gray-400">
            {item.count} {item.count === 1 ? "use" : "uses"}
          </span>
        </li>
      ))}
    </ul>
  );

  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };

  const combinedData: ItemFrequency[] = [
    ...topTools.map((item) => ({
      ...item,
      category: "Tool",
      exported_at: getCurrentDateTime(),
    })),
    ...topConsumables.map((item) => ({
      ...item,
      category: "Consumable",
      exported_at: getCurrentDateTime(),
    })),
    ...topVehicles.map((item) => ({
      ...item,
      category: "Vehicle",
      exported_at: getCurrentDateTime(),
    })),
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const dateTime = getCurrentDateTime();

    doc.text("Most Used Items Report", 14, 16);
    doc.setFontSize(10);
    doc.text(`Exported on: ${dateTime}`, 14, 24);

    autoTable(doc, {
      head: [["Category", "Item Name", "Usage Count"]],
      body: combinedData.map((item) => [
        item.category,
        item.name,
        item.count.toString(),
      ]),
      startY: 30,
    });

    doc.save("most-used-items-report.pdf");
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(combinedData, {
      columns: ["category", "name", "count", "exported_at"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "most-used-items-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-10 border border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Most Used Items Report
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overview of the 10 most frequently used tools, consumables, and
            vehicles across projects.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleExportPDF}
            className="text-sm px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 flex items-center"
          >
            <FaDownload className="mr-2" />
            Export PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="text-sm px-4 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 flex items-center"
          >
            <FaDownload className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Top Tools
          </h3>
          {topTools.length > 0 ? (
            renderList(topTools)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No tool data available.
            </p>
          )}
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Top Consumables
          </h3>
          {topConsumables.length > 0 ? (
            renderList(topConsumables)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No consumables data available.
            </p>
          )}
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Top Vehicles
          </h3>
          {topVehicles.length > 0 ? (
            renderList(topVehicles)
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No vehicle data available.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Usage Statistics Overview
        </h3>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={combinedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" angle={-25} textAnchor="end">
                <Label value="Item Name" offset={45} position="bottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Usage Count"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MostUsedItemsReport;
