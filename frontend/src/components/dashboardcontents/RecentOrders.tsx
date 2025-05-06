import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

interface RecentItem {
  item: string;
  tag: string;
  added_by: string;
  date: string;
}

export default function RecentOrders() {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/metrics/recent-additions`)
      .then((res) => setRecentItems(res.data))
      .catch((err) => console.error("Failed to fetch recent items:", err));
  }, []);

  return (
    <div className="overflow-hidden h-full rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            Recently Added
          </h3>
        </div>
        <div className="flex items-center gap-3"></div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-2 text-xs font-medium text-gray-500 text-start dark:text-gray-400"
              >
                Item
              </TableCell>
              <TableCell
                isHeader
                className="py-2 text-xs font-medium text-gray-500 text-start dark:text-gray-400"
              >
                Tag
              </TableCell>
              <TableCell
                isHeader
                className="py-2 text-xs font-medium text-gray-500 text-start dark:text-gray-400"
              >
                Added By
              </TableCell>
              <TableCell
                isHeader
                className="py-2 text-xs font-medium text-gray-500 text-start dark:text-gray-400"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-2 text-xs text-gray-700 dark:text-white/80">
                  {item.item}
                </TableCell>
                <TableCell className="py-2 text-xs text-gray-700 dark:text-white/80">
                  {item.tag}
                </TableCell>
                <TableCell className="py-2 text-xs text-gray-700 dark:text-white/80">
                  {item.added_by}
                </TableCell>
                <TableCell className="py-2 text-xs text-gray-700 dark:text-white/80">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
