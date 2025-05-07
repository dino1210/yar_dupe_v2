import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

interface Consumable {
  id: number;
  tag: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
  status: string;
}

export default function ConsumablesTable() {
  const [consumables, setConsumables] = useState<Consumable[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLimit, setDataLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const fetchConsumables = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/consumables`)
      .then((response) => {
        setConsumables(response.data.consumables);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching consumables:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchConsumables();
  }, []);

  if (loading)
    return <p className="text-center py-4 dark:text-white">Loading...</p>;

  const filteredConsumables = consumables.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (categoryFilter ? item.category === categoryFilter : true) &&
      (statusFilter ? item.status === statusFilter : true) &&
      (locationFilter ? item.location === locationFilter : true)
    );
  });

  const totalPages = Math.ceil(filteredConsumables.length / dataLimit);

  const currentConsumables = filteredConsumables.slice(
    (currentPage - 1) * dataLimit,
    currentPage * dataLimit
  );

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const now = new Date();
    const formattedDate = now.toLocaleString();

    doc.setFontSize(12);
    doc.text("Consumables Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 14, 22);

    const tableColumn = [
      "Item Name",
      "Tag/Code",
      "Category",
      "Status",
      "Quantity",
      "Unit",
      "Min. Stock",
      "Location",
    ];
    const tableRows: any[] = [];

    filteredConsumables.forEach((item) => {
      const rowData = [
        item.name,
        item.tag,
        item.category,
        item.status,
        item.quantity,
        item.unit,
        item.minStock,
        item.location,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      startY: 28,
    });

    doc.save("consumables_report.pdf");
  };

  const exportCSV = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();

    const headerInfo = [
      "Consumables Report",
      `Generated on: ${formattedDate}`,
      "",
    ];
    const csvHeader = [
      "Item Name,Tag/Code,Category,Status,Quantity,Unit,Min. Stock,Location",
    ];
    const csvRows = filteredConsumables.map((item) =>
      [
        item.name,
        item.tag,
        item.category,
        item.status,
        item.quantity,
        item.unit,
        item.minStock,
        item.location,
      ]
        .map((field) => `"${field}"`)
        .join(",")
    );
    const csvContent = [...headerInfo, ...csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "consumables_report.csv");
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-600";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-600";
      case "Out of Stock":
        return "bg-red-100 text-red-600";
      default:
        return "bg-red-200 text-red-800";
    }
  };

  const uniqueCategories = Array.from(
    new Set(consumables.map((c) => c.category))
  );
  const uniqueStatuses = Array.from(new Set(consumables.map((c) => c.status)));
  const uniqueLocations = Array.from(
    new Set(consumables.map((c) => c.location))
  );

  return (
    <div className="overflow-y-hidden rounded-xl border w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="p-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800 relative">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search Item Name or Tag Code"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded-md text-xs w-full sm:w-64 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded-md text-xs w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded-md text-xs w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map((stat, idx) => (
              <option key={idx} value={stat}>
                {stat}
              </option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded-md text-xs w-48 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowExportDropdown(!showExportDropdown)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition"
          >
            <Download className="w-5 h-5" />
          </button>
          {showExportDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  exportCSV();
                  setShowExportDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Export CSV
              </button>
              <button
                onClick={() => {
                  exportPDF();
                  setShowExportDropdown(false);
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
                "Item Name",
                "Tag/Code",
                "Category",
                "Status",
                "Quantity",
                "Unit",
                "Min. Stock",
                "Location",
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
            {currentConsumables.length > 0 ? (
              currentConsumables.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4 text-center text-xs dark:text-gray-300">
                    {item.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center text-xs dark:text-gray-300">
                    {item.tag}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs dark:text-gray-400">
                    {item.category}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${getStatusStyles(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs dark:text-gray-400">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs dark:text-gray-400">
                    {item.unit}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs dark:text-gray-400">
                    {item.minStock}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-xs dark:text-gray-400">
                    {item.location}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td
                  colSpan={8}
                  className="px-5 py-4 text-center text-gray-500 text-xs dark:text-gray-400"
                >
                  No consumables found
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-5 py-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800">
        <select
          value={dataLimit}
          onChange={(e) => {
            setDataLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
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
    </div>
  );
}
