import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

type AddResourceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resourceType: string; // This could be 'tools', 'consumables', etc.
};

type Category = {
  id: number;
  name: string;
};

interface ToolFormData {
  picture: string;
  name: string;
  brand: string;
  category: string;
  tag: string;
  description: string;
  purchase_date: string;
  warranty: string;
  status: string;
  remarks: string;
  qr: string;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  resourceType,
}) => {
  const [formData, setFormData] = useState<ToolFormData>({
    picture: "",
    name: "",
    brand: "",
    category: "",
    tag: "",
    description: "",
    purchase_date: "",
    warranty: "",
    status: "",
    remarks: "",
    qr: "",
  }); // Store form data generically

  const [categories, setCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Tool added successfully!");
        onClose();
      } else {
        alert("Failed to add tool");
      }
    } catch (error) {
      console.error("Error adding tool", error);
      alert("Error adding tool");
    }
  };
  // Fetch categories once the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once on mount

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(formData.category?.toLowerCase() || "")
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySelect = (category: Category) => {
    setFormData({
      ...formData,
      category: category.name,
    });
    setShowSuggestions(false); // Close suggestions after selecting
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl w-auto max-w-4xl shadow-2xl relative text-sm m-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 text-start">
          Add {resourceType}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {resourceType === "Tool" && (
            <>
              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Brand */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
                {showSuggestions && filteredCategories.length > 0 && (
                  <ul className="border mt-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white text-xs max-h-40 overflow-y-auto">
                    {filteredCategories.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tag/Code */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Tag/Code
                </label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Date of Purchase */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Date of Purchase
                </label>
                <input
                  type="date"
                  name="dateOfPurchase"
                  value={formData.purchase_date || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Warranty */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Warranty
                </label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Remarks */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Remarks
                </label>
                <input
                  type="text"
                  name="Remarks"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Tag/Code Image (File Upload) */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Image
                </label>
                <label className="cursor-pointer border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 text-center">
                  <Upload className="w-4 h-4 absolute" />
                  Upload Image
                  <input
                    type="file"
                    name="tagImage"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </>

          )}

          {resourceType === "Consumables" && (
            <>
              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Brand */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
                {showSuggestions && filteredCategories.length > 0 && (
                  <ul className="border mt-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white text-xs max-h-40 overflow-y-auto">
                    {filteredCategories.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tag/Code */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Tag/Code
                </label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Date of Purchase */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Date of Purchase
                </label>
                <input
                  type="date"
                  name="dateOfPurchase"
                  value={formData.purchase_date || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Warranty */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Warranty
                </label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Tag/Code Image (File Upload) */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
                  Image
                </label>
                <label className="cursor-pointer border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 text-center">
                  <Upload className="w-4 h-4 absolute" />
                  Upload Image
                  <input
                    type="file"
                    name="tagImage"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="col-span-3 flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
            >
              Add {resourceType}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 text-xs dark:bg-red-600 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;
