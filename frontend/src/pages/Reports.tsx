import { useEffect, useState } from "react";
import {
  Drill,
  FlaskConical,
  Car,
  FileBarChart2,
  ArrowLeft,
  Flame,
  LayoutDashboard,
} from "lucide-react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportConsumableTable from "../pages/Tables/reportsTable/reportConsumable_Table";
import ReportToolTable from "../pages/Tables/reportsTable/reportTools_Table";
import ReportVehicleTable from "../pages/Tables/reportsTable/reportVehicles_Table";
import ProjectTableView from "../pages/Tables/reportsTable/ProjectTableView";
import MostUsedItemsReport from "../pages/Tables/reportsTable/MostUsedItemsReport";
import ResourceUsageDistribution from "../pages/Tables/reportsTable/ResourceUsageDistribution";

interface Consumable {
  name: string;
  tag: string;
  category: string;
  quantity: number;
}

export default function Reports() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "tools" | "consumables" | "vehicles"
  >("all");

  const [activeSection, setActiveSection] = useState<
    "none" | "inventory" | "mostUsed" | "projects"
  >("none");

  const [lowStock, setLowStock] = useState<Consumable[]>([]);
  const [showAllLowStock, setShowAllLowStock] = useState(false);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/consumables/status/low-and-no-stock`
    )
      .then((res) => res.json())
      .then((data) =>
        setLowStock(
          (data.consumables || []).sort((a, b) => a.quantity - b.quantity)
        )
      )
      .catch((err) => console.error("Failed to fetch low stock data:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen px-4 py-6 transition-all">
      <PageMeta
        title="Reports"
        description="Generated reports of system activities"
      />
      <PageBreadcrumb pageTitle="Reports" />

      {activeSection === "inventory" && (
        <>
          <div className="sticky top-[4.5rem] z-50 bg-white dark:bg-black py-4 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <button
                onClick={() => setActiveSection("none")}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ArrowLeft size={20} />
                Back to Inventory Report
              </button>
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {["all", "tools", "consumables", "vehicles"].map((type) => {
                  const icons = {
                    all: "📊",
                    tools: <Drill size={18} />,
                    consumables: <FlaskConical size={18} />,
                    vehicles: <Car size={18} />,
                  };
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedFilter(type as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        selectedFilter === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {icons[type as keyof typeof icons]}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 space-y-10 pb-16 pt-6">
            {(selectedFilter === "all" || selectedFilter === "consumables") && (
              <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow dark:border-gray-700 dark:bg-gray-900 transition-all">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FlaskConical className="text-blue-500" />
                  Consumables Report
                </h2>
                <ReportConsumableTable />
              </div>
            )}
            {(selectedFilter === "all" || selectedFilter === "tools") && (
              <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow dark:border-gray-700 dark:bg-gray-900 transition-all">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Drill className="text-blue-500" />
                  Tools & Equipment Report
                </h2>
                <ReportToolTable />
              </div>
            )}
            {(selectedFilter === "all" || selectedFilter === "vehicles") && (
              <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow dark:border-gray-700 dark:bg-gray-900 transition-all">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Car className="text-blue-500" />
                  Vehicles Report
                </h2>
                <ReportVehicleTable />
              </div>
            )}
          </div>
        </>
      )}

      {activeSection === "mostUsed" && (
        <div className="w-full max-w-6xl mx-auto mt-6 px-4 pb-20">
          <button
            onClick={() => setActiveSection("none")}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft size={20} />
            Back to Most Used
          </button>
          <MostUsedItemsReport />
        </div>
      )}

      {activeSection === "projects" && (
        <div className="w-full max-w-6xl mx-auto mt-6 px-4 pb-20">
          <button
            onClick={() => setActiveSection("none")}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft size={20} />
            Back to Projects Report
          </button>
          <ProjectTableView />
        </div>
      )}

      {activeSection === "none" && (
        <>
          <div className="max-w-7xl mx-auto mt-6 flex flex-col lg:flex-row gap-6 items-start lg:items-start">
            <div className="space-y-6 flex-1">
              <div
                onClick={() => setActiveSection("inventory")}
                className="cursor-pointer flex items-center gap-4 rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FileBarChart2 className="text-blue-600" size={26} />
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">
                    Inventory Report
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    View reports for tools, consumables, and vehicles.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("projects")}
                className="cursor-pointer flex items-center gap-4 rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <LayoutDashboard className="text-blue-600" size={26} />
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">
                    Projects Report
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Equipment usage per project.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("mostUsed")}
                className="cursor-pointer flex items-center gap-4 rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <Flame className="text-blue-600" size={26} />
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">
                    Most Used
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Frequently used or low stock items.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[420px] lg:mt-[-28px]">
              <ResourceUsageDistribution />
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-10">
            <div className="rounded-xl border border-gray-300 bg-white dark:bg-gray-900/70 p-6 shadow-md">
              <FlaskConical
                size={24}
                className="mx-auto text-blue-600 dark:text-blue-400 mb-2"
              />
              <h2 className="text-xl font-semibold text-center text-black dark:text-white mb-4">
                Low Stock Consumables
              </h2>
              <div className="overflow-y-auto max-h-[290px]">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left">Item Name</th>
                      <th className="px-3 py-2 text-left">Tag/Code</th>
                      <th className="px-3 py-2 text-left">Category</th>
                      <th className="px-3 py-2 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {(showAllLowStock ? lowStock : lowStock.slice(0, 6)).map(
                      (item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                            {item.name}
                          </td>
                          <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                            {item.tag}
                          </td>
                          <td className="px-3 py-2 text-gray-800 dark:text-gray-200">
                            {item.category}
                          </td>
                          <td className="px-3 py-2 text-right text-gray-800 dark:text-gray-200">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.quantity === 0
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  : item.quantity < 10
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              }`}
                            >
                              {item.quantity === 0
                                ? "Out of Stock"
                                : item.quantity}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {lowStock.length > 6 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAllLowStock((prev) => !prev)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium underline hover:no-underline"
                  >
                    {showAllLowStock ? "Show Less" : "View All"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
