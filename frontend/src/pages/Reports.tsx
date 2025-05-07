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

export default function Reports() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "tools" | "consumables" | "vehicles"
  >("all");
  const [activeSection, setActiveSection] = useState<
    "none" | "inventory" | "mostUsed" | "projects"
  >("none");

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
          <div className="max-w-7xl mx-auto mt-11 flex flex-col lg:flex-row gap-8 items-start lg:items-start">
            <div className="space-y-5 flex-1">
              <div
                onClick={() => setActiveSection("inventory")}
                className="cursor-pointer flex items-center gap-8 rounded-3xl border-2 border-blue-600 bg-white dark:bg-black px-10 py-8 shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <FileBarChart2 className="text-blue-600" size={32} />
                <div>
                  <h2 className="text-lg font-bold text-black dark:text-white">
                    Inventory Report
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    View reports for tools, consumables, and vehicles.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("projects")}
                className="cursor-pointer flex items-center gap-8 rounded-3xl border-2 border-blue-600 bg-white dark:bg-black px-10 py-8 shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <LayoutDashboard className="text-blue-600" size={32} />
                <div>
                  <h2 className="text-lg font-bold text-black dark:text-white">
                    Projects Report
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Equipment usage per project.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[500px] lg:mt-[-28px]">
              <ResourceUsageDistribution
                style={{ width: "100%", height: "300px" }}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-10">
            <MostUsedItemsReport />
          </div>
        </>
      )}
    </div>
  );
}
