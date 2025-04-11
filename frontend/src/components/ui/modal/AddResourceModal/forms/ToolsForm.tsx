// ToolForm.tsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Upload } from "lucide-react";

type ToolFormProps = {
  onClose: () => void;
  onAddSuccess: () => void;
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

const ToolForm: React.FC<ToolFormProps> = ({ onClose, onAddSuccess }) => {
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
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tools`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Tool added successfully!");
        onAddSuccess();
        onClose();
      } else {
        alert("Failed to add tool");
      }
    } catch (error) {
      console.error("Error adding tool", error);
      alert("Error adding tool");
    }
  };

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
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(formData.category?.toLowerCase() || "")
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category: Category) => {
    setFormData({
      ...formData,
      category: category.name,
    });
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
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
        <DatePicker
          selected={
            formData.purchase_date ? new Date(formData.purchase_date) : null
          }
          onChange={(date: Date | null) =>
            setFormData((prevData) => ({
              ...prevData,
              purchase_date: date ? date.toISOString().split("T")[0] : "",
            }))
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
          calendarClassName="dark:bg-gray-700 dark:text-black"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select" // 'scroll' is also possible
          maxDate={new Date()} // Optional: disable future dates
        />
      </div>

      {/* Warranty */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Warranty
        </label>
        <DatePicker
          selected={formData.warranty ? new Date(formData.warranty) : null}
          onChange={(date: Date | null) =>
            setFormData((prevData) => ({
              ...prevData,
              warranty: date ? date.toISOString().split("T")[0] : "",
            }))
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
          calendarClassName="dark:bg-gray-700 dark:text-black"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
        />
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleInputChange}
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">Select status</option>
          <option value="Available">Available</option>
          <option value="Disabled">Disabled</option>
          <option value="Issued-Out">Issued-Out</option>
        </select>
      </div>

      {/* Remarks */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Remarks
        </label>
        <input
          type="text"
          name="remarks"
          value={formData.remarks || ""}
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

      {/* Submit Button */}
      <div className="col-span-3 text-right mt-4 ">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
        >
          Add
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
  );
};

export default ToolForm;
