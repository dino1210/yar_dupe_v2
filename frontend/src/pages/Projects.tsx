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

interface Tool {
  name: string;
  tag: string;
  category: string;
  remarks: string;
}

interface ProjectType {
  id: number;
  title: string;
  manager: string;
  personInCharge?: string;
  tools: string;
  consumables: string;
  vehicles: string;
  startDate: string;
  location: string;
  endDate: string;
  status?: string;
}

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00`;
};

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

const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
console.log("LOGGED-IN USER:", loggedInUser);

// Main Component
export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showToolSearchTable, setShowToolSearchTable] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );

  const [loggedInUser, setLoggedInUser] = useState<{ name?: string }>({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setLoggedInUser(storedUser);
  }, []);

  const [toolsList, setToolsList] = useState<string[]>([]);
  const [consumablesList, setConsumablesList] = useState<string[]>([]);
  const [vehiclesList, setVehiclesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTool, setSelectedTool] = useState<string>("");
  const [selectedConsumable, setSelectedConsumable] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const [searchText, setSearchText] = useState("");
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [consumablesListDetails, setConsumablesListDetails] = useState<any[]>(
    []
  );
  const [searchConsumable, setSearchConsumable] = useState("");
  const [showConsumableSearchTable, setShowConsumableSearchTable] =
    useState(false);
  const [selectedConsumablesCount, setSelectedConsumablesCount] = useState<{
    [name: string]: number;
  }>({});

  const filteredConsumables = consumablesListDetails.filter((item) =>
    item.name.toLowerCase().includes(searchConsumable.toLowerCase())
  );

  const [vehiclesListDetails, setVehiclesListDetails] = useState<any[]>([]);
  const [searchVehicle, setSearchVehicle] = useState("");
  const [showVehicleSearchTable, setShowVehicleSearchTable] = useState(false);

  const filteredVehicles = vehiclesListDetails.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchVehicle.toLowerCase())
  );

  const [formData, setFormData] = useState<ProjectType>({
    id: 0,
    title: "",
    manager: "",
    personInCharge: "",
    tools: "",
    consumables: "",
    vehicles: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  // Fetch Data
  useEffect(() => {
    fetchProjects();
    fetchResources();
  }, []);

  useEffect(() => {
    fetchAllTools();
  }, []);

  // Auto-close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const toolTable = document.querySelector(".tool-table");
      const toolInput = document.querySelector(
        "input[placeholder='Search tool name...']"
      );

      if (
        toolTable &&
        !toolTable.contains(e.target as Node) &&
        toolInput &&
        !toolInput.contains(e.target as Node)
      ) {
        setShowToolSearchTable(false);
      }

      const consumableTable = document.querySelector(".consumable-table");
      const consumableInput = document.querySelector(
        "input[placeholder='Search consumable name...']"
      );

      if (
        consumableTable &&
        !consumableTable.contains(e.target as Node) &&
        consumableInput &&
        !consumableInput.contains(e.target as Node)
      ) {
        setShowConsumableSearchTable(false);
      }

      const vehicleTable = document.querySelector(".vehicle-table");
      const vehicleInput = document.querySelector(
        "input[placeholder='Search vehicle name...']"
      );

      if (
        vehicleTable &&
        !vehicleTable.contains(e.target as Node) &&
        vehicleInput &&
        !vehicleInput.contains(e.target as Node)
      ) {
        setShowVehicleSearchTable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchAllTools = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tools`
      );
      setAllTools(Array.isArray(res.data) ? res.data : res.data.tools || []);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    }
  };

  const filteredTools = allTools.filter((tool: Tool) =>
    tool.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/projects`
      );

      const today = new Date().toISOString().split("T")[0];

      const formatted = await Promise.all(
        res.data.map(async (p: any) => {
          let autoStatus = p.status;

          //  Only auto-update if NOT Completed or Cancelled
          if (
            !["Cancelled", "Completed"].includes(p.status) &&
            p.status === "Upcoming" &&
            p.start_date <= today
          ) {
            autoStatus = "Ongoing";

            try {
              await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/projects/${p.id}`,
                {
                  ...p,
                  status: autoStatus,
                }
              );
            } catch (err) {
              console.error("Failed to auto-update project status:", err);
            }
          }

          return {
            id: p.id,
            title: p.title,
            manager: p.manager,
            personInCharge: p.person_in_charge,
            location: p.location,
            tools: p.tools_equipment_used,
            consumables: p.consumables_used,
            vehicles: p.vehicles_used,
            startDate: p.start_date,
            endDate: p.end_date,
            status: autoStatus,
          };
        })
      );

      setProjects(formatted);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Error loading projects!");
    }
  };

  const fetchResources = async () => {
    try {
      const [toolsRes, consumablesRes, vehiclesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tools/select/all`),
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/consumables/select/details`
        ),
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/vehicles/select/details`
        ),
      ]);

      console.log("CONSUMABLES RESPONSE:", consumablesRes.data);

      // Set Available Tools
      if (Array.isArray(toolsRes.data)) {
        setToolsList(toolsRes.data.map((tool) => tool.name));
      }

      // Set Available Consumables
      if (Array.isArray(consumablesRes.data)) {
        setConsumablesListDetails(consumablesRes.data); // <-- full objects for table
        setConsumablesList(consumablesRes.data.map((c) => c.name)); // names only
      }

      // Set Available Vehicles
      if (Array.isArray(vehiclesRes.data)) {
        setVehiclesListDetails(vehiclesRes.data);
        setVehiclesList(vehiclesRes.data.map((vehicle) => vehicle.name));
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Error loading resources!");
    }
  };

  const handleViewDetails = (project: ProjectType) => {
    setSelectedProject(project);
    setViewModalOpen(true);
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
        manager: loggedInUser.name || "", // auto-fill from logged in user
        personInCharge: "",
        tools: "",
        consumables: "",
        vehicles: "",
        location: "",
        startDate: "",
        endDate: "",
        status: "",
      });

      setSelectedTool("");
      setSelectedConsumable("");
      setSelectedVehicle("");
      setSelectedConsumablesCount({});
    }
    setIsModalOpen(true);
  };
  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!formData.manager.trim()) {
      toast.error("Manager is required.");
      return;
    }

    if (!formData.personInCharge?.trim()) {
      toast.error("Person In Charge is required.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!formData.startDate) {
      toast.error("Start date is required.");
      return;
    }

    if (!formData.endDate) {
      toast.error("End date is required.");
      return;
    }

    if (!formData.tools.trim()) {
      toast.error("Please select at least one tool.");
      return;
    }

    if (!formData.consumables.trim()) {
      toast.error("Please select at least one consumable.");
      return;
    }

    if (!formData.vehicles.trim()) {
      toast.error("Please select at least one vehicle.");
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        const today = new Date().toISOString().split("T")[0];
        let updatedEndDate = formData.endDate;

        if (
          formData.status === "Completed" ||
          formData.status === "Cancelled"
        ) {
          updatedEndDate = today;
        }

        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects/return-resources`,
          {
            tools: formData.tools.split(",").filter(Boolean),
            consumables: formData.consumables.split(",").filter(Boolean),
            vehicles: formData.vehicles.split(",").filter(Boolean),
          }
        );

        const updatedData = {
          ...formData,
          startDate: formData.startDate,
          endDate: updatedEndDate,
        };

        const prevStatus = projects.find((p) => p.id === formData.id)?.status;

        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects/${formData.id}`,
          updatedData
        );

        // Only issue if changed from something else to Ongoing
        if (prevStatus !== "Ongoing" && formData.status === "Ongoing") {
          console.log(">>> CALLING issue-resources for Ongoing project");

          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/projects/issue-resources`,
            {
              tools: formData.tools.split(",").filter(Boolean),
              consumables: formData.consumables.split(",").filter(Boolean),
              vehicles: formData.vehicles.split(",").filter(Boolean),
              personInCharge: formData.personInCharge,
            }
          );
        }

        toast.success("Project updated successfully!");
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(formData.startDate);
        startDate.setHours(0, 0, 0, 0);

        const autoStatus = startDate <= today ? "Ongoing" : "Upcoming";

        const updatedFormData = {
          ...formData,
          status: autoStatus,
        };

        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/projects`,
          updatedFormData
        );

        if (autoStatus === "Ongoing") {
          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/projects/issue-resources`,
            {
              tools: formData.tools.split(",").filter(Boolean),
              consumables: formData.consumables.split(",").filter(Boolean),
              vehicles: formData.vehicles.split(",").filter(Boolean),
            }
          );
        }

        toast.success(" Project added successfully!");

        // Reset form
        setFormData({
          id: 0,
          title: "",
          manager: loggedInUser.name || "",
          personInCharge: "",
          tools: "",
          consumables: "",
          vehicles: "",
          location: "",
          startDate: "",
          endDate: "",
          status: "",
        });

        setSelectedTool("");
        setSelectedConsumable("");
        setSelectedVehicle("");

        setIsModalOpen(false);
      }

      await fetchProjects();
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

                {/* Only show Edit if not Completed or Cancelled */}
                {!["Completed", "Cancelled"].includes(proj.status || "") && (
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
                  readOnly={isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter title"
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
                  readOnly={isEditing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personInCharge: e.target.value,
                    })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter PIC"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  readOnly={isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder="Enter Location"
                />
              </div>

              {/* Status (editable only when editing) */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Status
                </label>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      const today = new Date().toISOString().split("T")[0];

                      const updatedForm = {
                        ...formData,
                        status: newStatus,
                      };

                      if (
                        newStatus === "Completed" ||
                        newStatus === "Cancelled"
                      ) {
                        updatedForm.endDate = today;
                      }

                      setFormData(updatedForm);
                    }}
                    className="p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  >
                    <option value="" disabled>
                      -- Select Status --
                    </option>

                    {/* Always show current status */}
                    {![
                      "Upcoming",
                      "Ongoing",
                      "Completed",
                      "Cancelled",
                    ].includes(formData.status || "") && (
                      <option value={formData.status}>{formData.status}</option>
                    )}

                    {formData.status === "Upcoming" && (
                      <>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Cancelled">Cancelled</option>
                      </>
                    )}

                    {formData.status === "Ongoing" && (
                      <>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </>
                    )}

                    {formData.status === "Completed" && (
                      <option value="Completed">Completed</option>
                    )}

                    {formData.status === "Cancelled" && (
                      <option value="Cancelled">Cancelled</option>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.status}
                    readOnly
                    className="p-2 rounded border bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                )}
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
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
                        startDate: formatDateToYYYYMMDD(date),
                      })
                    }
                    minDate={new Date()} // Prevent past dates
                    className="w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>

                {/* Expected End Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Expected End Date
                  </label>
                  <DatePicker
                    selected={
                      formData.endDate ? new Date(formData.endDate) : null
                    }
                    onChange={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        endDate: formatDateToYYYYMMDD(
                          new Date(
                            date.getTime() +
                              Math.abs(date.getTimezoneOffset() * 60000)
                          )
                        ),
                      })
                    }
                    minDate={
                      formData.startDate
                        ? new Date(
                            new Date(formData.startDate).getTime() + 86400000
                          )
                        : new Date()
                    } // Prevent same or earlier than start date
                    className="w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    placeholderText="Expected End Date"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-col col-span-2">
                {/* Selected Badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tools
                    ?.split(",")
                    .filter(Boolean)
                    .map((tool, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                      >
                        {tool}
                        <button
                          onClick={() => {
                            const updatedTools = formData.tools
                              .split(",")
                              .filter((t) => t !== tool)
                              .join(",");
                            setFormData({ ...formData, tools: updatedTools });
                            setShowToolSearchTable(false);
                            toast.success(`${tool} removed`);
                          }}
                          className="ml-1 text-red-600 dark:text-red-300 hover:underline"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Tool
                  </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setShowToolSearchTable(true)}
                    onBlur={(e) => {
                      setTimeout(() => {
                        const focused = document.activeElement as HTMLElement;
                        const toolTable = document.querySelector(".tool-table");

                        if (
                          !toolTable ||
                          (focused &&
                            !toolTable.contains(focused) &&
                            focused.tagName !== "BUTTON")
                        ) {
                          setShowToolSearchTable(false);
                        }
                      }, 100);
                    }}
                    placeholder="Search tool name..."
                    className="mt-1 w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>

                {/* Tool Table */}
                {showToolSearchTable && (
                  <div className="mt-3 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto tool-table">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Tag</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2">Remarks</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                        {filteredTools
                          .filter(
                            (tool) =>
                              tool.status === "Available" &&
                              !formData.tools.split(",").includes(tool.name)
                          )
                          .map((tool, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {tool.name}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {tool.tag}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {tool.category}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {tool.remarks}
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  onClick={() => {
                                    const selected = [
                                      ...formData.tools.split(","),
                                      tool.name,
                                    ]
                                      .filter(Boolean)
                                      .join(",");
                                    setFormData({
                                      ...formData,
                                      tools: selected,
                                    });
                                    toast.success(`${tool.name} selected`);
                                  }}
                                  className="text-blue-600 hover:underline"
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Consumables */}
              <div className="flex flex-col col-span-2">
                {/* Selected Badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(selectedConsumablesCount).map(
                    ([name, count]) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs"
                      >
                        <span className="font-semibold">
                          {name} ({count})
                        </span>
                        <button
                          onClick={() => {
                            const updatedCount = {
                              ...selectedConsumablesCount,
                            };
                            if (updatedCount[name] > 1) {
                              updatedCount[name] -= 1;
                            } else {
                              delete updatedCount[name];
                            }

                            setSelectedConsumablesCount(updatedCount);

                            const allNames = Object.entries(updatedCount)
                              .flatMap(([n, c]) => Array(c).fill(n))
                              .join(",");

                            setFormData({ ...formData, consumables: allNames });
                            toast.success(`${name} removed`);

                            setShowConsumableSearchTable(false);
                          }}
                          className="ml-1 text-red-600 dark:text-red-300 hover:underline"
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Consumable
                  </label>
                  <input
                    type="text"
                    value={searchConsumable}
                    onChange={(e) => setSearchConsumable(e.target.value)}
                    onFocus={() => setShowConsumableSearchTable(true)}
                    onBlur={(e) => {
                      setTimeout(() => {
                        const related = document.activeElement;
                        const table =
                          document.querySelector(".consumable-table");
                        if (
                          related !== e.currentTarget && // not the input
                          table &&
                          !table.contains(related) // not clicking inside the table
                        ) {
                          setShowConsumableSearchTable(false);
                        }
                      }, 200);
                    }}
                    placeholder="Search consumable name..."
                    className="mt-1 w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>

                {/* Consumable Table */}
                {showConsumableSearchTable && (
                  <div className="mt-3 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto consumable-table">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                        <tr>
                          <th className="px-4 py-2">Item Name</th>
                          <th className="px-4 py-2">Tag/Code</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2">Quantity</th>
                          <th className="px-4 py-2">Unit</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                        {consumablesListDetails
                          .filter(
                            (item: any) =>
                              item.name
                                .toLowerCase()
                                .includes(searchConsumable.toLowerCase()) &&
                              Number(item.quantity) -
                                (selectedConsumablesCount[item.name] || 0) >
                                0
                          )
                          .map((item: any, index: number) => {
                            const available =
                              Number(item.quantity) -
                              (selectedConsumablesCount[item.name] || 0);

                            return (
                              <tr key={index}>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                  {item.name}
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                  {item.tag}
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                  {item.category}
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                  {available}
                                </td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                  {item.unit}
                                </td>
                                <td className="px-4 py-2">
                                  <button
                                    onClick={() => {
                                      const current =
                                        selectedConsumablesCount[item.name] ||
                                        0;
                                      if (current < Number(item.quantity)) {
                                        const newCount = {
                                          ...selectedConsumablesCount,
                                        };
                                        newCount[item.name] = current + 1;

                                        setSelectedConsumablesCount(newCount);

                                        const allNames = Object.entries(
                                          newCount
                                        )
                                          .flatMap(([name, count]) =>
                                            Array(count).fill(name)
                                          )
                                          .join(",");

                                        setFormData({
                                          ...formData,
                                          consumables: allNames,
                                        });
                                        toast.success(`${item.name} selected`);
                                      }
                                    }}
                                    className="text-green-600 hover:underline"
                                  >
                                    Select
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Vehicles */}
              <div className="flex flex-col col-span-2">
                {/* Selected Badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.vehicles
                    ?.split(",")
                    .filter(Boolean)
                    .map((vehicle, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-xs"
                      >
                        {vehicle}
                        <button
                          onClick={() => {
                            const updatedVehicles = formData.vehicles
                              .split(",")
                              .filter((v) => v !== vehicle)
                              .join(",");
                            setFormData({
                              ...formData,
                              vehicles: updatedVehicles,
                            });
                          }}
                          className="ml-1 text-red-600 dark:text-red-300 hover:underline"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Vehicle
                  </label>
                  <input
                    type="text"
                    value={searchVehicle}
                    onChange={(e) => setSearchVehicle(e.target.value)}
                    onFocus={() => setShowVehicleSearchTable(true)}
                    onBlur={(e) => {
                      setTimeout(() => {
                        const related = document.activeElement;
                        const table = document.querySelector(".vehicle-table");
                        if (
                          related !== e.currentTarget &&
                          table &&
                          !table.contains(related)
                        ) {
                          setShowVehicleSearchTable(false);
                        }
                      }, 200);
                    }}
                    placeholder="Search vehicle name..."
                    className="mt-1 w-full p-2 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>

                {/* Vehicle Table */}
                {showVehicleSearchTable && (
                  <div className="mt-3 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto vehicle-table">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Plate No</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2">Driver</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                        {filteredVehicles
                          .filter(
                            (item) =>
                              !formData.vehicles
                                .split(",")
                                .includes(item.name) &&
                              item.name
                                .toLowerCase()
                                .includes(searchVehicle.toLowerCase())
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {item.name}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {item.plate_no}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {item.category}
                              </td>
                              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                                {item.assigned_driver}
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  onClick={() => {
                                    const updated = [
                                      ...formData.vehicles.split(","),
                                      item.name,
                                    ]
                                      .filter(Boolean)
                                      .join(",");
                                    setFormData({
                                      ...formData,
                                      vehicles: updated,
                                    });
                                    toast.success(`${item.name} selected`);
                                  }}
                                  className="text-purple-600 hover:underline"
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                      <CheckCircle2 className="w-5 h-5" />{" "}
                      <strong>Location:</strong> {selectedProject.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />{" "}
                      <strong>Expected Date:</strong>{" "}
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
