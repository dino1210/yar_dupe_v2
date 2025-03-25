import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the expected structure
interface Item {
  id: number;
  itemCode: string;
  itemName: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
  dateModified: string;
  status: string;
}

// Placeholder for actual data fetching
const fetchItems = async (): Promise<Item[]> => {
  return [
    {
      id: 1,
      itemCode: "CN-001",
      itemName: "PVC Pipe",
      quantity: 50,
      minStock: 10,
      unit: "pcs",
      location: "Warehouse A",
      dateModified: "2025-03-25",
      status: "Available",
    },
    {
      id: 2,
      itemCode: "CN-002",
      itemName: "Cement Bag",
      quantity: 30,
      minStock: 5,
      unit: "bags",
      location: "Warehouse B",
      dateModified: "2025-03-24",
      status: "Low Stock",
    },
    {
      id: 3,
      itemCode: "CN-003",
      itemName: "Steel Rod",
      quantity: 100,
      minStock: 20,
      unit: "meters",
      location: "Warehouse A",
      dateModified: "2025-03-23",
      status: "Available",
    },
    {
      id: 4,
      itemCode: "CN-004",
      itemName: "Electrical Tape",
      quantity: 15,
      minStock: 10,
      unit: "rolls",
      location: "Warehouse C",
      dateModified: "2025-03-22",
      status: "Reorder Needed",
    },
  ];
};

export default function ConsumablesTable() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                "Item Code",
                "Item Name",
                "Quantity",
                "Minimum Stock",
                "Unit",
                "Location",
                "Date Modified",
                "Status",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start font-medium text-gray-800 dark:text-white/90">
                  {item.itemCode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.itemName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.quantity}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.minStock}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.unit}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.location}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start dark:text-gray-400">
                  {item.dateModified}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={
                      item.status === "Available"
                        ? "success"
                        : item.status === "Low Stock"
                        ? "warning"
                        : "error"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
