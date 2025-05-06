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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredLowStock = lowStock.filter((item) =>
    [item.name, item.tag, item.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-black min-h-screen px-4 py-6 transition-all">
      <PageMeta
        title="Reports"
        description="Generated reports of system activities"
      />
      <PageBreadcrumb pageTitle="Reports" />

      {activeSection === "none" && (
        <div className="max-w-6xl mx-auto mt-6 mb-6 space-y-4">
          {/* Inventory Report */}
          <div
            onClick={() => setActiveSection("inventory")}
            className="cursor-pointer rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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

          {/* Most Used */}
          <div
            onClick={() => setActiveSection("mostUsed")}
            className="cursor-pointer rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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

          {/* Projects Report */}
          <div
            onClick={() => setActiveSection("projects")}
            className="cursor-pointer rounded-xl border border-blue-500 bg-white dark:bg-black px-6 py-4 shadow-md flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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

          {/* Low Stock Consumables Section */}
          <div className="rounded-xl border border-gray-300 bg-white dark:bg-gray-900/70 p-6 shadow-md mt-6">
            <FileBarChart2
              size={24}
              className="mx-auto text-blue-600 dark:text-blue-400 mb-2"
            />
            <h2 className="text-xl font-semibold text-center text-black dark:text-white mb-4">
              Low Stock Consumables
            </h2>

            <input
              type="text"
              placeholder="Search by name, tag, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            />

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-3 py-2 text-left">Item Name</th>
                    <th className="px-3 py-2 text-left">Tag/Code</th>
                    <th className="px-3 py-2 text-left">Category</th>
                    <th className="px-3 py-2 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredLowStock.length > 0 ? (
                    filteredLowStock.map((item, index) => (
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-3 text-center text-gray-500 dark:text-gray-400"
                      >
                        No low or out-of-stock consumables.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Section */}
      {activeSection === "inventory" && (
        <>
          <div className="w-full max-w-6xl mx-auto mt-4 px-4 flex justify-start">
            <button
              onClick={() => setActiveSection("none")}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft size={20} />
              Back to Inventory Report
            </button>
          </div>

          <div className="w-full max-w-6xl mx-auto mt-6 mb-8 px-4 flex flex-wrap gap-4 justify-center sm:justify-end">
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

          <div className="w-full max-w-6xl mx-auto px-4 space-y-12 pb-16">
            {(selectedFilter === "all" || selectedFilter === "consumables") && (
              <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-lg p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900/80 transition-all">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                  <FlaskConical
                    size={30}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  Consumables Report
                </h2>
                <ReportConsumableTable />
              </div>
            )}

            {(selectedFilter === "all" || selectedFilter === "tools") && (
              <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-lg p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900/80 transition-all">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                  <Drill
                    size={30}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  Tools & Equipment Report
                </h2>
                <ReportToolTable />
              </div>
            )}

            {(selectedFilter === "all" || selectedFilter === "vehicles") && (
              <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-lg p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900/80 transition-all">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                  <Car size={30} className="text-gray-600 dark:text-gray-300" />
                  Vehicles Report
                </h2>
                <ReportVehicleTable />
              </div>
            )}
          </div>
        </>
      )}

      {/* Most Used Section */}
      {activeSection === "mostUsed" && (
        <div className="w-full max-w-6xl mx-auto mt-6 px-4 pb-20">
          <button
            onClick={() => setActiveSection("none")}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft size={20} />
            Back to Most Used
          </button>

          <div className="rounded-3xl border border-blue-300 bg-white/80 dark:bg-gray-900/70 p-10 shadow-2xl text-center">
            <Flame
              size={36}
              className="mx-auto text-blue-600 dark:text-blue-400 mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Most Used Items
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300">
              This section highlights the frequently accessed or utilized tools,
              consumables, or vehicles across various operations.
            </p>
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeSection === "projects" && (
        <div className="w-full max-w-6xl mx-auto mt-6 px-4 pb-20">
          <button
            onClick={() => setActiveSection("none")}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft size={20} />
            Back to Projects Report
          </button>

          <div className="rounded-3xl border border-blue-300 bg-white/80 dark:bg-gray-900/70 p-10 shadow-2xl text-center">
            <LayoutDashboard
              size={36}
              className="mx-auto text-blue-600 dark:text-blue-400 mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Projects Report
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300">
              This section will show reports related to project-based resource
              usage, active vs. completed projects, and equipment distribution
              per project.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
