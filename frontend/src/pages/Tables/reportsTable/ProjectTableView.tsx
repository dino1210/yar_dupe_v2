import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { LayoutDashboard, Download } from "lucide-react";

interface ProjectType {
  id: number;
  title: string;
  manager: string;
  personInCharge?: string;
  tools: string;
  consumables: string;
  vehicles: string;
  startDate: string;
  endDate: string;
  location: string;
  status?: string;
}

const ProjectTableView = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects`
        );
        const formatted = res.data.map((p: any) => ({
          id: p.id,
          title: p.title,
          manager: p.manager,
          personInCharge: p.person_in_charge,
          tools: p.tools_equipment_used,
          consumables: p.consumables_used,
          vehicles: p.vehicles_used,
          startDate: p.start_date,
          endDate: p.end_date,
          location: p.location,
          status: p.status,
        }));
        setProjects(formatted);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const getDateTimeString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}_${String(
      now.getHours()
    ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
  };

  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Manager", key: "manager" },
    { label: "PIC", key: "personInCharge" },
    { label: "Location", key: "location" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Status", key: "status" },
    { label: "Tools", key: "tools" },
    { label: "Consumables", key: "consumables" },
    { label: "Vehicles", key: "vehicles" },
  ];

  const generateCSVData = () => {
    const dateTime = getDateTimeString().replace(/_/g, " ").replace(/-/g, ":");
    const generatedRow = {
      title: `Generated on: ${dateTime}`,
      manager: "",
      personInCharge: "",
      location: "",
      startDate: "",
      endDate: "",
      status: "",
      tools: "",
      consumables: "",
      vehicles: "",
    };
    return [generatedRow, ...projects];
  };

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "pt", "a4");
    const dateTimeString = getDateTimeString()
      .replace(/_/g, " ")
      .replace(/-/g, ":");

    doc.setFontSize(14);
    doc.text("Project Resource Summary", 40, 40);
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${dateTimeString}`,
      doc.internal.pageSize.getWidth() - 200,
      40
    );

    autoTable(doc, {
      startY: 60,
      head: [csvHeaders.map((h) => h.label)],
      body: projects.map((p) => [
        p.title,
        p.manager,
        p.personInCharge,
        p.location,
        p.startDate,
        p.endDate,
        p.status,
        p.tools,
        p.consumables,
        p.vehicles,
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      theme: "grid",
      margin: { top: 60, left: 40, right: 40, bottom: 40 },
      tableWidth: "auto",
    });

    doc.save("Project_Report.pdf");
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-6">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-blue-600" size={26} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Project Resource Summary Table
            </h2>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Download
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                <CSVLink
                  data={generateCSVData()}
                  headers={csvHeaders}
                  filename={`Project_Report_${getDateTimeString()}.csv`}
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Export CSV
                </CSVLink>
                <button
                  onClick={() => {
                    generatePDF();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Export PDF
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] table-auto text-sm text-left border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                {csvHeaders.map((h) => (
                  <th
                    key={h.key}
                    className="px-4 py-3 whitespace-nowrap font-semibold"
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.title}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.manager}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.personInCharge}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.location}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.startDate}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {project.endDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : project.status === "Ongoing"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {project.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 truncate text-gray-800 dark:text-gray-200">
                      {project.tools}
                    </td>
                    <td className="px-4 py-3 truncate text-gray-800 dark:text-gray-200">
                      {project.consumables}
                    </td>
                    <td className="px-4 py-3 truncate text-gray-800 dark:text-gray-200">
                      {project.vehicles}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                  >
                    No project data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200"
          >
            {[10, 25, 50, projects.length].map((num) => (
              <option key={num} value={num}>
                {num === projects.length ? "All" : `${num} Items`}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200"
            >
              &lt;
            </button>
            <span className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTableView;
