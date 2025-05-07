import { useEffect, useState } from "react";

interface Consumable {
  name: string;
  tag: string;
  category: string;
  quantity: number;
}

export default function LowStock() {
  const [data, setData] = useState<Consumable[]>([]);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/consumables/status/low-and-no-stock`
    )
      .then((res) => res.json())
      .then((data) => setData(data.consumables || []))
      .catch((err) => console.error("Failed to fetch low stock data:", err));
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Low Stock Consumables
      </h2>
      <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Item Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Tag/Code
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Category
                </th>
                <th className="px-4 py-2 text-right font-medium text-gray-600 dark:text-gray-300">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data.length > 0 ? (
                data.map((item, index) => (
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
                    <td className="px-4 py-2 text-right text-gray-800 dark:text-gray-200">
                      {item.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No low or out-of-stock consumables.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
