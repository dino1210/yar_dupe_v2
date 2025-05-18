import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import {
  Pencil,
  Trash2,
  RotateCcw,
  ArrowDownAZ,
  ArrowUpAZ,
  Plus,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import AddResourceModal from "../../components/ui/modal/AddResourceModal/AddResourceModal";
import DeleteModal from "../../components/ui/modal/DeleteModal";

// Define the expected structure
interface Consumable {
  id: number;
  picture: string;
  tag: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
  date: string;
  status: string;
}

export default function ConsumablesTable() {
  const [consumables, setConsumables] = useState<Consumable[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [dataLimit, setDataLimit] = useState<number>(5); // State for data limit
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isAscending, setIsAscending] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consumableToEdit, setConsumableToEdit] = useState<Consumable | null>(
    null
  );

  //delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const handleOpenModal = () => {
    setConsumableToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id: number) => {
    const selected = consumables.find((c) => c.id === id);
    if (selected) {
      setConsumableToEdit(selected); //  set item to edit
      setIsModalOpen(true);
    }
  };

  const handleOpenDeleteModal = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/consumables/${selectedId}`,
        {
          method: "DELETE",
        }
      );
      // Trigger a refetch or update your state
      setIsDeleteModalOpen(false);
      setSelectedId(null);
      toast.success("Deleted successfully");
      fetchConsumables();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

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

  const currentUser = localStorage.getItem("username") || "Unknown";

  if (loading) return <p>Loading...</p>;

  const handleAddSuccess = () => {
    fetchConsumables();
    setIsModalOpen(false);
  };

  // Filter tools based on search, category, and status
  // Combined: filter, sort, and paginate
  const sortedConsumables = [...consumables]
    .filter((consumable) => {
      const matchesSearch =
        consumable.name.toLowerCase().includes(search.toLowerCase()) ||
        consumable.tag.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter
        ? consumable.category.toLowerCase() === categoryFilter.toLowerCase()
        : true;

      const matchesStatus = statusFilter
        ? consumable.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const totalPages = Math.ceil(sortedConsumables.length / dataLimit);
  const currentConsumables = sortedConsumables.slice(
    (currentPage - 1) * dataLimit,
    currentPage * dataLimit
  );

  return (
    <div className="overflow-y-hidden rounded-xl border w-full border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Filter Controls */}
      <div className="sticky top-0 overflow-x-auto z-10 px-5 py-3 flex flex-col sm:flex-row gap-2 bg-white dark:bg-gray-800 shadow-sm">
        <input
          type="text"
          placeholder="Search by name or tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 text-xs rounded-md w-full sm:w-1/3 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
        {/* Fixed Category Dropdown with 1 Option */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 text-xs rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Category</option>
          <option value="Fasteners & Cutting Tools">
            Fasteners & Cutting Tools
          </option>
          <option value="Pipe & Fitting Accessories">
            Pipe & Fitting Accessories
          </option>
          <option value="Adhesives & Coatings">Adhesives & Coatings</option>
          <option value="Filtration & Drainage">Filtration & Drainage</option>
          <option value="Safety Equipment">Safety Equipment</option>
          <option value="Measuring & Marking Tools">
            Measuring & Marking Tools
          </option>
          <option value="Welding Supplies">Welding Supplies</option>
        </select>

        {/* Fixed Status Dropdown with Correct Values */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 text-xs rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="No Stock">No Stock</option>
        </select>

        <button
          type="button"
          onClick={() => setIsAscending(!isAscending)}
          title="Sort A-Z"
          className="border p-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          {isAscending ? (
            <ArrowDownAZ className="w-auto h-5" />
          ) : (
            <ArrowUpAZ className="w-auto h-5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategoryFilter("");
            setStatusFilter(""); // ← make sure you declare this with useState
            setCurrentPage(1);
            fetchConsumables(); // ← refresh from API
          }}
          title="Reset Filters"
          className="border p-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          <RotateCcw className="w-auto h-5" />
        </button>

        <button
          onClick={handleOpenModal}
          type="button"
          className="flex items-center gap-2 px-2 text-xs rounded-md bg-white dark:bg-blue-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          New
          <Plus className="w-4 h-4" />
        </button>
        <AddResourceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddSuccess={handleAddSuccess}
          resourceType="Consumable"
          addedBy={currentUser}
          consumableToEdit={consumableToEdit}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <Table className="">
            {/* Table Header */}
            <TableHeader className="border-b border-t text-sm border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Image",
                  "Item Name",
                  "Tag/Code",
                  "Category",
                  "Quantity",
                  "Unit",
                  "Min. Stock",
                  "Location",
                  "Status",
                  "Date Modified",
                  "Actions",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-10 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-50 whitespace-nowrap"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentConsumables.length > 0 ? (
                currentConsumables.map((consumable) => (
                  <TableRow key={consumable.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-center">
                      <img
                        src={`${
                          import.meta.env.VITE_API_BASE_URL
                        }/assets/images/consumables/${consumable.picture}`}
                        alt={`${consumable.name}'s Profile`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer border border-gray-300  "
                        onClick={() =>
                          setSelectedImage(
                            `${
                              import.meta.env.VITE_API_BASE_URL
                            }/assets/images/consumables/${consumable.picture}`
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-center">
                      <span className="block font-medium text-gray-800 text-theme-xs dark:text-white/70">
                        {consumable.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-center">
                      <span className="block font-medium text-gray-800 text-theme-xs dark:text-gray-400">
                        {consumable.tag}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      {consumable.category}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      <span className="block font-bold  text-gray-800 text-theme-sm dark:text-white/70">
                        {consumable.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      {consumable.unit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      {consumable.minStock}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      {consumable.location}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      <Badge
                        size="sm"
                        variant="solid"
                        color={
                          consumable.status === "In Stock"
                            ? "success"
                            : consumable.status === "Low Stock"
                            ? "warning"
                            : "error"
                        }
                      >
                        {consumable.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-xs text-center dark:text-gray-400">
                      {new Date(consumable.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="px-8 py-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                      <div className="flex items-center justify-center space-x-2 w-full h-full">
                        <button
                          onClick={() => handleEdit(consumable.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900"
                          title="Edit"
                        >
                          <Pencil className="w-3 h-7" />
                        </button>
                        <button
                          onClick={() =>
                            handleOpenDeleteModal(
                              consumable.id,
                              consumable.name
                            )
                          }
                          className="px-3 py-1 text-xs font-medium text-white bg-red-800 rounded-lg hover:bg-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-7" />
                        </button>
                        {/* <button
                          onClick={() => handleDelete(consumable.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-orange-800 rounded-lg hover:bg-orange-900"
                          title="Disable"
                        >
                          <CircleOff className="w-3 h-7" />
                        </button> */}
                      </div>
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
        </div>
      </div>

      {/* Data Limit Selector */}
      <div className="px-5 py-3 flex space-x-5 items-center">
        <div>
          <select
            value={dataLimit}
            onChange={(e) => setDataLimit(Number(e.target.value))}
            className="border p-2 text-xs rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-800"
          >
            <option value={10}>10 Items</option>
            <option value={20}>20 Items</option>
            <option value={9999}>All Items</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border px-3 py-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-900"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 text-xs font-medium ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-white text-blue-700"
              } border px-3 py-2 text-xs rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-800`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border px-3 py-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-900"
          >
            &gt;
          </button>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center mt-5 justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Full Size"
                className="w-[250px] h-[250px] object-cover rounded-lg"
              />
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 bg-white bg-opacity-20 text-black p-2 rounded-full hover:bg-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedName}
        />
      </div>
    </div>
  );
}
