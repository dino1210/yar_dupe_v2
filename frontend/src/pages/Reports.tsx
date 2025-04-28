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
        <div className="w-full max-w-6xl mx-auto rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-md p-12 shadow-2xl dark:border-gray-700 dark:bg-gray-900/80 transition-all">
          <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800 dark:text-white tracking-tight">
            Reports Dashboard
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 text-lg">
            Select a report category below to view detailed analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card Button Template */}
            {[
              { label: "Tools", icon: Drill, type: "tools" },
              { label: "Consumables", icon: FlaskConical, type: "consumables" },
              { label: "Vehicles", icon: Car, type: "vehicles" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedReport(item.type as any)}
                className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-10 text-gray-700 hover:scale-105 hover:shadow-xl dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-transform duration-300"
              >
                <div className="p-5 rounded-full bg-gray-200 dark:bg-gray-700">
                  <item.icon size={40} className="text-black dark:text-white" />
                </div>
                <span className="font-semibold text-xl">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-6xl mx-auto rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-md p-10 shadow-2xl dark:border-gray-700 dark:bg-gray-900/80 transition-all">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setSelectedReport(null)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all"
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
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Tools & Equipment Report
              </h2>
              <ReportToolTable />
            </>
          )}
          {selectedReport === "consumables" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Consumables Report
              </h2>
              <ReportConsumableTable />
            </>
          )}
          {selectedReport === "vehicles" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Vehicles Report
              </h2>
              <ReportVehicleTable />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 py-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black min-h-screen">
      <PageMeta
        title="Reports"
        description="Generated reports of system activities"
      />
      <PageBreadcrumb pageTitle="Reports" />
      {renderContent()}
    </div>
  );
}
