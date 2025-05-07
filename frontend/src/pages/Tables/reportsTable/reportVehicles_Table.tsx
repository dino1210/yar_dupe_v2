import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import axios from "axios";
import AddResourceModal from "../../../components/ui/modal/AddResourceModal/AddResourceModal";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Vehicles {
  id: number;
  picture: string;
  name: string;
  brand: string;
  plate_no: string;
  category: string;
  fuel_type: string;
  location: string;
  acquisition_date: string;
  warranty: string;
  status: string;
  remarks: string;
  maintenance_due: string;
  assigned_driver: string;
  attachment: string;
  qr: string;
}

export default function VehiclesTable() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLimit, setDataLimit] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchVehicles = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/vehicles`)
      .then((response) => {
        setVehicles(response.data.vehicles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading)
    return <p className="text-center py-4 dark:text-white">Loading...</p>;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.plate_no.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? vehicle.category === categoryFilter
      : true;
    const matchesStatus = statusFilter ? vehicle.status === statusFilter : true;
    const matchesLocation = locationFilter
      ? vehicle.location === locationFilter
      : true;

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const totalPages = Math.ceil(filteredVehicles.length / dataLimit);
  const currentVehicles = filteredVehicles.slice(
    (currentPage - 1) * dataLimit,
    currentPage * dataLimit
  );

  const handleAddSuccess = () => {
    fetchVehicles();
    setIsModalOpen(false);
  };

  const uniqueCategories = Array.from(new Set(vehicles.map((v) => v.category)));
  const uniqueStatuses = Array.from(new Set(vehicles.map((v) => v.status)));
  const uniqueLocations = Array.from(new Set(vehicles.map((v) => v.location)));

  const getCurrentDateTime = () => {
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

  const getCurrentDateTimeReadable = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  const formatValue = (value: string | null | undefined) => {
    if (!value || value.trim() === "") return "-";
    return value.includes(",") ? `"${value}"` : value;
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Brand",
      "Plate No.",
      "Category",
      "Status",
      "Fuel Type",
      "Location",
      "Acquisition Date",
      "Warranty",
      "Remarks",
      "Maintenance Due",
      "Assigned Driver",
    ];

    const rows = filteredVehicles.map((vehicle) => [
      formatValue(vehicle.name),
      formatValue(vehicle.brand),
      formatValue(vehicle.plate_no),
      formatValue(vehicle.category),
      formatValue(vehicle.status),
      formatValue(vehicle.fuel_type),
      formatValue(vehicle.location),
      new Date(vehicle.acquisition_date).toLocaleDateString(),
      new Date(vehicle.warranty).toLocaleDateString(),
      formatValue(vehicle.remarks),
      formatValue(vehicle.maintenance_due),
      formatValue(vehicle.assigned_driver),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `vehicles_report_${getCurrentDateTime()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const dateTime = getCurrentDateTimeReadable();
    doc.setFontSize(16);
    doc.text(`Vehicles Report  ${dateTime}`, 14, 15);

    const tableColumn = [
      "Name",
      "Brand",
      "Plate No.",
      "Category",
      "Status",
      "Fuel Type",
      "Location",
      "Acquisition Date",
      "Warranty",
      "Remarks",
      "Maintenance Due",
      "Assigned Driver",
    ];

    const tableRows = filteredVehicles.map((vehicle) => [
      vehicle.name,
      vehicle.brand,
      vehicle.plate_no,
      vehicle.category,
      vehicle.status,
      vehicle.fuel_type,
      vehicle.location,
      new Date(vehicle.acquisition_date).toLocaleDateString(),
      new Date(vehicle.warranty).toLocaleDateString(),
      vehicle.remarks,
      vehicle.maintenance_due,
      vehicle.assigned_driver,
    ]);

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`vehicles_report_${getCurrentDateTime()}.pdf`);
  };

  return (
    <div className="overflow-y-hidden rounded-xl border w-full border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-sm">
      <div className="px-5 py-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Plate No."
            className="border p-2 text-xs w-full sm:w-64 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 text-xs w-48 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 text-xs w-48 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Status</option>
            {uniqueStatuses.map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border p-2 text-xs w-48 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDownloadOpen(!isDownloadOpen)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition"
            title="Download"
          >
            <Download className="w-6 h-6" />
          </button>

          {isDownloadOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  handleExportCSV();
                  setIsDownloadOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Export CSV
              </button>
              <button
                onClick={() => {
                  handleExportPDF();
                  setIsDownloadOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Export PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-t text-xs border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
            <TableRow>
              {[
                "Name",
                "Brand",
                "Category",
                "Status",
                "Plate No.",
                "Fuel Type",
                "Location",
                "Acquisition Date",
                "Warranty",
                "Remarks",
                "Maintenance Due",
                "Assigned Driver",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-10 py-3 font-bold text-gray-800 dark:text-gray-200 text-center text-xs whitespace-nowrap"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentVehicles.length > 0 ? (
              currentVehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {[
                    vehicle.name,
                    vehicle.brand,
                    vehicle.category,
                    vehicle.status,
                    vehicle.plate_no,
                    vehicle.fuel_type,
                    vehicle.location,
                    new Date(vehicle.acquisition_date).toLocaleDateString(),
                    new Date(vehicle.warranty).toLocaleDateString(),
                    vehicle.remarks || "-",
                    vehicle.maintenance_due,
                    vehicle.assigned_driver || "-",
                  ].map((value, index) => (
                    <TableCell
                      key={index}
                      className="px-5 py-4 sm:px-6 text-center text-xs dark:text-gray-300"
                    >
                      {index === 3 ? (
                        <Badge
                          size="sm"
                          color={
                            value === "Available"
                              ? "success"
                              : value === "Issued Out"
                              ? "warning"
                              : value === "Not Available"
                              ? "error"
                              : "default"
                          }
                          className="whitespace-nowrap"
                        >
                          {value}
                        </Badge>
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td
                  colSpan={12}
                  className="px-5 py-4 text-center text-gray-500 text-xs dark:text-gray-400"
                >
                  No Vehicles found
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-5 py-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800">
        <select
          value={dataLimit}
          onChange={(e) => setDataLimit(Number(e.target.value))}
          className="border p-2 w-20 text-xs rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          <option value={10}>10 Items</option>
          <option value={20}>20 Items</option>
          <option value={50}>50 Items</option>
          <option value={9999}>All Items</option>
        </select>

        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border px-3 py-2 text-xs rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`border px-3 py-2 text-xs rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border px-3 py-2 text-xs rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      <AddResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={handleAddSuccess}
        resourceType="Vehicle"
      />
    </div>
  );
}
