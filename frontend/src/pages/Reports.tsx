import { useState } from "react";
import { Drill, FlaskConical, Car } from "lucide-react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportConsumableTable from "../pages/Tables/reportsTable/reportConsumable_Table";
import ReportToolTable from "../pages/Tables/reportsTable/reportTools_Table";
import ReportVehicleTable from "../pages/Tables/reportsTable/reportVehicles_Table";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<
    null | "tools" | "consumables" | "vehicles"
  >(null);

  const renderContent = () => {
    if (!selectedReport) {
      return (
        <div className="w-full max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-900 transition-all">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Reports
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            Select a category below to generate and view detailed reports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tools Report */}
            <button
              onClick={() => setSelectedReport("tools")}
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-8 text-gray-700 hover:bg-gray-100 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                <Drill size={36} className="text-black dark:text-white" />
              </div>
              <span className="font-semibold text-lg">Tools</span>
            </button>

            {/* Consumables Report */}
            <button
              onClick={() => setSelectedReport("consumables")}
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-8 text-gray-700 hover:bg-gray-100 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                <FlaskConical
                  size={36}
                  className="text-black dark:text-white"
                />
              </div>
              <span className="font-semibold text-lg">Consumables</span>
            </button>

            {/* Vehicles Report */}
            <button
              onClick={() => setSelectedReport("vehicles")}
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-8 text-gray-700 hover:bg-gray-100 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                <Car size={36} className="text-black dark:text-white" />
              </div>
              <span className="font-semibold text-lg">Vehicles</span>
            </button>
          </div>
        </div>
      );
    }

    // Detailed Report View
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-900 transition-all">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedReport(null)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        <div>
          {selectedReport === "tools" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Tools & Equipments Report
              </h2>
              <ReportToolTable />
            </div>
          )}
          {selectedReport === "consumables" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Consumables Report
              </h2>
              <ReportConsumableTable />
            </div>
          )}
          {selectedReport === "vehicles" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Vehicles Report
              </h2>
              <ReportVehicleTable />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-8">
      <PageMeta
        title="Reports"
        description="Generated reports of system activities"
      />
      <PageBreadcrumb pageTitle="Reports" />
      {renderContent()}
    </div>
  );
}
