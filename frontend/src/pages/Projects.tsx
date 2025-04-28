import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  CircleCheck,
  CheckCircle2,
  CalendarDays,
  User2,
  UserRoundCheck,
  Construction,
  Clock,
  XCircle,
  Plus,
  Pencil,
  PackageCheck,
  Truck,
} from "lucide-react";

import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Interfaces
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
  status?: string;
}

// Utils
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const statusStyles: Record<string, string> = {
  Ongoing: "border-green-500",
  Completed: "border-blue-500",
  Upcoming: "border-yellow-500",
  Cancelled: "border-red-500",
};

const statusIcons: Record<string, ReactNode> = {
  Ongoing: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  Completed: <CircleCheck className="w-4 h-4 text-blue-500" />,
  Upcoming: <Clock className="w-4 h-4 text-yellow-500" />,
  Cancelled: <XCircle className="w-4 h-4 text-red-500" />,
};

// Main Component
export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [toolsList, setToolsList] = useState<string[]>([]);
  const [consumablesList, setConsumablesList] = useState<string[]>([]);
  const [vehiclesList, setVehiclesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTool, setSelectedTool] = useState<string>("");
  const [selectedConsumable, setSelectedConsumable] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const [formData, setFormData] = useState<ProjectType>({
    id: 0,
    title: "",
    manager: "",
    personInCharge: "",
    tools: "",
    consumables: "",
    vehicles: "",
    startDate: "",
    endDate: "",
    status: "Ongoing",
  });

  // Fetch Data
  useEffect(() => {
    fetchProjects();
    fetchResources();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
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
        status: p.status,
      }));
      setProjects(formatted);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Error loading projects!");
    }
  };

  const fetchResources = async () => {
    try {
      const [toolsRes, consumablesRes, vehiclesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/tools/select/all"),
        axios.get("http://localhost:5000/api/consumables/select/all"),
        axios.get("http://localhost:5000/api/vehicles/select/all"),
      ]);

      if (Array.isArray(toolsRes.data))
        setToolsList(toolsRes.data.map((item) => item.name));
      if (Array.isArray(consumablesRes.data))
        setConsumablesList(consumablesRes.data.map((item) => item.name));
      if (Array.isArray(vehiclesRes.data))
        setVehiclesList(vehiclesRes.data.map((item) => item.name));
    } catch (err) {
      console.error("Error fetching resources:", err);
      toast.error("Error loading resources!");
    }
  };

  const handleOpenModal = (project?: ProjectType) => {
    if (project) {
      setIsEditing(true);
      setFormData(project);
    } else {
      setIsEditing(false);
      setFormData({
        id: 0,
        title: "",
        manager: "",
        personInCharge: "",
        tools: "",
        consumables: "",
        vehicles: "",
        startDate: "",
        endDate: "",
        status: "Ongoing",
      });
    }
    setIsModalOpen(true);
  };

  const handleViewDetails = (project: ProjectType) => {
    setSelectedProject(project);
    setViewModalOpen(true);
  };

  const handleSave = async () => {
    if (
      !formData.title ||
      !formData.manager ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }
    try {
      setLoading(true);
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/projects/${formData.id}`,
          formData
        );
        toast.success("Project updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/projects", formData);
        toast.success("Project added successfully!");
      }
      fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving project:", err);
      toast.error("Error saving. Check your data and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects
    .filter((proj) => {
      const matchSearch = (proj.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = filter === "All" || proj.status === filter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (a.status === "Completed" && b.status !== "Completed") return -1;
      if (a.status !== "Completed" && b.status === "Completed") return 1;
      return a.id - b.id;
    });

  return (
    <div className="p-6 relative">
      <Toaster position="top-center" />

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Projects
      </h2>

      {/* ADD BUTTON */}
      <button
        onClick={() => handleOpenModal()}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project title..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-sm"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-md border-l-4 p-6 transition-all hover:shadow-lg hover:scale-[1.01] ${
              statusStyles[proj.status || "Upcoming"]
            }`}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold truncate">{proj.title}</h3>
              <p className="flex items-center gap-2">
                {statusIcons[proj.status || "Upcoming"]} Status: {proj.status}
              </p>
              <p className="flex items-center gap-2">
                <User2 className="w-5 h-5" /> Manager: {proj.manager}
              </p>
              <p className="flex items-center gap-2">
                <UserRoundCheck className="w-5 h-5" /> PIC:{" "}
                {proj.personInCharge || "Not Assigned"}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />{" "}
                {formatDate(proj.startDate)} — {formatDate(proj.endDate)}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleViewDetails(proj)}
                  className="text-green-600 hover:underline flex items-center gap-1"
                >
                  <Search className="w-4 h-4" /> View
                </button>
                {/* Hide Edit button for Completed projects */}
                {proj.status !== "Completed" && (
                  <button
                    onClick={() => handleOpenModal(proj)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT PROJECT MODAL */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isEditing ? "Edit Project" : "Add Project"}
            </Dialog.Title>

            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter title"
                />
              </div>

              {/* Manager */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Manager
                </label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) =>
                    setFormData({ ...formData, manager: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter manager"
                />
              </div>

              {/* PIC */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Person In Charge
                </label>
                <input
                  type="text"
                  value={formData.personInCharge}
                  onChange={(e) =>
                    setFormData({ ...formData, personInCharge: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter PIC"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <DatePicker
                  selected={
                    formData.startDate ? new Date(formData.startDate) : null
                  }
                  onChange={(date) =>
                    date &&
                    setFormData({
                      ...formData,
                      startDate: date.toISOString().split("T")[0],
                    })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholderText="Start Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <DatePicker
                  selected={
                    formData.endDate ? new Date(formData.endDate) : null
                  }
                  onChange={(date) =>
                    date &&
                    setFormData({
                      ...formData,
                      endDate: date.toISOString().split("T")[0],
                    })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholderText="End Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* Tools */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Tools
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    className="flex-1 p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    <option value="">Select Tool</option>
                    {toolsList.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (
                        selectedTool &&
                        !formData.tools.split(",").includes(selectedTool)
                      ) {
                        setFormData({
                          ...formData,
                          tools: [...formData.tools.split(","), selectedTool]
                            .filter(Boolean)
                            .join(","),
                        });
                        setSelectedTool("");
                      }
                    }}
                    className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    + Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tools
                    ?.split(",")
                    .filter(Boolean)
                    .map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                </div>
              </div>

              {/* Consumables */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Consumables
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedConsumable}
                    onChange={(e) => setSelectedConsumable(e.target.value)}
                    className="flex-1 p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    <option value="">Select Consumable</option>
                    {consumablesList.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (
                        selectedConsumable &&
                        !formData.consumables
                          .split(",")
                          .includes(selectedConsumable)
                      ) {
                        setFormData({
                          ...formData,
                          consumables: [
                            ...formData.consumables.split(","),
                            selectedConsumable,
                          ]
                            .filter(Boolean)
                            .join(","),
                        });
                        setSelectedConsumable("");
                      }
                    }}
                    className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    + Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.consumables
                    ?.split(",")
                    .filter(Boolean)
                    .map((consumable, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs"
                      >
                        {consumable}
                      </span>
                    ))}
                </div>
              </div>

              {/* Vehicles */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Vehicles
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="flex-1 p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    <option value="">Select Vehicle</option>
                    {vehiclesList.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (
                        selectedVehicle &&
                        !formData.vehicles.split(",").includes(selectedVehicle)
                      ) {
                        setFormData({
                          ...formData,
                          vehicles: [
                            ...formData.vehicles.split(","),
                            selectedVehicle,
                          ]
                            .filter(Boolean)
                            .join(","),
                        });
                        setSelectedVehicle("");
                      }
                    }}
                    className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    + Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.vehicles
                    ?.split(",")
                    .filter(Boolean)
                    .map((vehicle, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-xs"
                      >
                        {vehicle}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Save / Cancel Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Update" : "Save"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Details Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl w-full space-y-6">
            <div className="text-center">
              <Dialog.Title className="text-3xl font-bold text-gray-900 dark:text-white">
                Project Information
              </Dialog.Title>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed overview of the project
              </p>
            </div>

            {selectedProject && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-white">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <User2 className="w-5 h-5" /> <strong>Title:</strong>{" "}
                      {selectedProject.title}
                    </p>
                    <p className="flex items-center gap-2">
                      <UserRoundCheck className="w-5 h-5" />{" "}
                      <strong>PIC:</strong> {selectedProject.personInCharge}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />{" "}
                      <strong>Start Date:</strong>{" "}
                      {formatDate(selectedProject.startDate)}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <User2 className="w-5 h-5" /> <strong>Manager:</strong>{" "}
                      {selectedProject.manager}
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />{" "}
                      <strong>Status:</strong> {selectedProject.status}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />{" "}
                      <strong>End Date:</strong>{" "}
                      {formatDate(selectedProject.endDate)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                    <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center gap-2">
                      <Construction className="w-5 h-5" /> Tools Table
                    </p>
                    <div className="space-y-1">
                      {selectedProject.tools ? (
                        selectedProject.tools.split(",").map((item, idx) => (
                          <p
                            key={idx}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {item.trim()}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">
                          No data available
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center justify-center gap-2">
                      <PackageCheck className="w-5 h-5" /> Consumables Table
                    </p>
                    <div className="space-y-1">
                      {selectedProject.consumables &&
                      selectedProject.consumables.trim() !== "" ? (
                        selectedProject.consumables
                          .split(",")
                          .map((item, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {item.trim()}
                            </p>
                          ))
                      ) : (
                        <p className="text-gray-400 italic">
                          No consumable assigned yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                    <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center justify-center gap-2">
                      <Truck className="w-5 h-5" /> Vehicles Table
                    </p>
                    <div className="space-y-1">
                      {selectedProject.vehicles &&
                      selectedProject.vehicles.trim() !== "" ? (
                        selectedProject.vehicles.split(",").map((item, idx) => (
                          <p
                            key={idx}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {item.trim()}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">
                          No vehicle assigned yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
