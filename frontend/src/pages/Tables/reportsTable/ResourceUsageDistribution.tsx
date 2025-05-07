import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"];

interface ProjectType {
  tools: string;
  consumables: string;
  vehicles: string;
}

const ResourceUsageDistribution = () => {
  const [toolCount, setToolCount] = useState(0);
  const [consumableCount, setConsumableCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects`
        );
        const projects: ProjectType[] = res.data.map((p: any) => ({
          tools: p.tools_equipment_used,
          consumables: p.consumables_used,
          vehicles: p.vehicles_used,
        }));

        const countItems = (items: string[]): number => {
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
          return Object.values(countMap).reduce((a, b) => a + b, 0);
        };

        setToolCount(countItems(projects.map((p) => p.tools)));
        setConsumableCount(countItems(projects.map((p) => p.consumables)));
        setVehicleCount(countItems(projects.map((p) => p.vehicles)));
      } catch (err) {
        console.error("Failed to fetch project data:", err);
      }
    };

    fetchProjects();
  }, []);

  const pieData = [
    { name: "Tools", value: toolCount },
    { name: "Consumables", value: consumableCount },
    { name: "Vehicles", value: vehicleCount },
  ];

  return (
    <div className="p-4 rounded-2xl border border-white-200 dark:border-white-700 bg-white-50 dark:bg-white-800 shadow-md mt-6">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <ResponsiveContainer width={250} height={225}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {entry.name}: {entry.value} uses
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceUsageDistribution;
