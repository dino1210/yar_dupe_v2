import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define user structure
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  date_creation: string;
  profile_picture: string; // Add profile_picture field
}

// Sample user data
const sampleUsers: User[] = [
  { id: 1, name: "Admin", email: "admin@gmail.com", role: "Admin", status: "Active", date_creation: "2024-04-02", profile_picture: "/path/to/profile1.jpg" },
  { id: 2, name: "Project Manager", email: "manager@gmail.com", role: "Manager", status: "Inactive", date_creation: "2024-03-25", profile_picture: "/path/to/profile2.jpg" },
  { id: 3, name: "Staff", email: "staff@gmail.com", role: "Staff", status: "Active", date_creation: "2024-02-10", profile_picture: "/path/to/profile3.jpg" },
  { id: 4, name: "Admin", email: "admin2@gmail.com", role: "Admin", status: "Active", date_creation: "2024-04-02", profile_picture: "/path/to/profile4.jpg" },
  { id: 5, name: "Project Manager", email: "manager2@gmail.com", role: "Manager", status: "Inactive", date_creation: "2024-03-25", profile_picture: "/path/to/profile5.jpg" },
  { id: 6, name: "Staff", email: "staff2@gmail.com", role: "Staff", status: "Active", date_creation: "2024-02-10", profile_picture: "/path/to/profile6.jpg" },
  { id: 7, name: "Admin", email: "admin3@gmail.com", role: "Admin", status: "Active", date_creation: "2024-04-02", profile_picture: "/path/to/profile7.jpg" },
  { id: 8, name: "Project Manager", email: "manager3@gmail.com", role: "Manager", status: "Inactive", date_creation: "2024-03-25", profile_picture: "/path/to/profile8.jpg" },
  { id: 9, name: "Staff", email: "staff3@gmail.com", role: "Staff", status: "Active", date_creation: "2024-02-10", profile_picture: "/path/to/profile9.jpg" },
  { id: 10, name: "Admin", email: "admin4@gmail.com", role: "Admin", status: "Active", date_creation: "2024-04-02", profile_picture: "/path/to/profile10.jpg" },
  { id: 11, name: "Project Manager", email: "manager4@gmail.com", role: "Manager", status: "Inactive", date_creation: "2024-03-25", profile_picture: "/path/to/profile11.jpg" },
  { id: 12, name: "Staff", email: "staff4@gmail.com", role: "Staff", status: "Active", date_creation: "2024-02-10", profile_picture: "/path/to/profile12.jpg" },
];

export default function UserManagementTable() {
  const [users] = useState<User[]>(sampleUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dataLimit, setDataLimit] = useState<number>(5);  // State for data limit
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  // Filter users based on search, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / dataLimit);
  const currentUsers = filteredUsers.slice((currentPage - 1) * dataLimit, currentPage * dataLimit);

  const handleEdit = (userId: number) => {
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = (userId: number) => {
    console.log("Delete user with ID:", userId);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.1] dark:bg-gray-900">
      <div className="max-w-full overflow-x-auto">
        {/* Filter Controls */}
        <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 text-xs rounded-md w-full sm:w-1/3 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border p-2 text-xs rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border text-xs p-2 rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add User
          </button>
        </div>

        {/* Table */}
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b text-sm border-gray-100 dark:border-gray-700">
            <TableRow>
              {["Profile", "Name", "Email", "Role", "Status", "Date Created", "Actions"].map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-semibold text-theme-xs text-gray-500 dark:text-gray-400 text-start"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {/* Profile Picture */}
                    <img
                      src={user.profile_picture}
                      alt={`${user.name}'s Profile`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-xs text-gray-800 dark:text-white">
                      {user.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-start">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-start">
                    {user.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-start">
                    <Badge
                      size="sm"
                      color={user.status === "Active" ? "success" : "error"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-start">
                    {user.date_creation}
                  </TableCell>
                  {/* Actions Column */}
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-start">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Data Limit Selector */}
        <div className="px-5 py-3 flex justify-between items-center">
          <div>
            <select
              value={dataLimit}
              onChange={(e) => setDataLimit(Number(e.target.value))}
              className="border p-2 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
            >
              <option value={10}>10 Items</option>
              <option value={20}>20 Items</option>
              <option value={50}>50 Items</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &lt;
            </button>
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
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
