import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define Consumable structure
interface Vehicles {
  id: number;
  picture: string;
  name: string;
  brand: string;
  category: string;
  plate_no: string;
  status: string;
  location: string;
  remarks: string;
  qr: string;
}

export default function VehiclesTable() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dataLimit, setDataLimit] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data based on search and status
  const filteredConsumables = vehicles.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? item.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredConsumables.length / dataLimit);
  const currentConsumables = filteredConsumables.slice(
    (currentPage - 1) * dataLimit,
    currentPage * dataLimit
  );

  const handleEdit = (consumablesId: number) => {
    console.log("Edit user with ID:", consumablesId);
  };

  const handleDelete = (consumablesId: number) => {
    console.log("Delete user with ID:", consumablesId);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Search and Filters */}
        <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by name or tag"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 text-xs rounded-md w-full sm:w-1/3 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border text-xs p-2 rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
          </select>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="border-b text-sm border-gray-100 dark:border-gray-700">
            <TableRow>
              {[
                "Image",
                "Name",
                "Brand",
                "Category",
                "Plate Number",
                "Status",
                "Location",
                "Remarks",
                "QR Code",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-theme-xs text-gray-500 dark:text-gray-50 text-start"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
            {currentConsumables.length > 0 ? (
              currentConsumables.map((vehicles) => (
                <TableRow key={vehicles.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <img
                      src={vehicles.picture}
                      alt={`${vehicles.name} Image`}
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-white/70">
                    {vehicles.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    {vehicles.brand}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    {vehicles.category}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    {vehicles.plate_no}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={vehicles.status === "Available" ? "success" : "warning"}
                    >
                      {vehicles.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    {vehicles.location}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                    {vehicles.remarks}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs text-gray-800 dark:text-gray-400">
                  <img
                      src={vehicles.qr}
                      alt={`${vehicles.name}'s Profile`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="px-8 py-3 text-xs text-gray-500 dark:text-gray-400 text-start flex flex-auto">
                    <button
                      onClick={() => handleEdit(vehicles.id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicles.id)}
                      className="ml-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                  No consumables found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="px-5 py-3 flex justify-between items-center">
  {/* Data Limit Selector */}
  <select
    value={dataLimit}
    onChange={(e) => setDataLimit(Number(e.target.value))}
    className="border p-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
  >
    <option value={5}>5 Items</option>
    <option value={10}>10 Items</option>
    <option value={20}>20 Items</option>
  </select>

  {/* Pagination Controls */}
  <div className="flex items-center space-x-2">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      &lt;
    </button>
    
    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-2 text-xs font-medium ${currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-white text-blue-700"} rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`}
      >
        {index + 1}
      </button>
    ))}
    
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      &gt;
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
