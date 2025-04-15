// ToolForm.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

interface VehicleFormData {
  picture: string;
  name: string;
  brand: string;
  plate_no: string;
  category: string;
  fuel_type: string;
  location: string;
  acquisition_date: string;
  warranty: string;
  maintenance_due: string;
  remarks: string;
  assigned_driver: string;
}

const VehicleForm: React.FC<ToolFormProps> = ({ onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState<VehicleFormData>({
    picture: "",
    name: "",
    brand: "",
    plate_no: "",
    category: "",
    fuel_type: "",
    location: "",
    acquisition_date: "",
    warranty: "",
    maintenance_due: "",
    remarks: "",
    assigned_driver: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/vehicles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Vehicle added successfully!");
        onAddSuccess();
        onClose();
      } else {
        toast.error("Failed to add Vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle", error);
      toast.error("Error adding vehicle");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/categories`
        );
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
          required
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
          required
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Plate No. */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Brand
        </label>
        <input
          type="text"
          name="plate_no"
          value={formData.plate_no || ""}
          onChange={handleInputChange}
          required
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
          required
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

      {/* Fuel Type */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Fuel Type
        </label>
        <input
          type="text"
          name="fuel_type"
          value={formData.fuel_type || ""}
          required
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          type="text"
          name="description"
          value={formData.location || ""}
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Acquisition Date */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Acquisition Date
        </label>
        <DatePicker
          selected={formData.acquisition_date ? new Date(formData.acquisition_date) : null}
          onChange={(date: Date | null) =>
            setFormData((prevData) => ({
              ...prevData,
              warranty: date ? date.toISOString().split("T")[0] : "",
            }))
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full "
          calendarClassName="dark:bg-gray-700 dark:text-black"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
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
          required
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full "
          calendarClassName="dark:bg-gray-700 dark:text-black"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      {/* Maintenance Due */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Maintenance Due
        </label>
        <DatePicker
          selected={
            formData.maintenance_due ? new Date(formData.maintenance_due) : null
          }
          onChange={(date: Date | null) =>
            setFormData((prevData) => ({
              ...prevData,
              warranty: date ? date.toISOString().split("T")[0] : "",
            }))
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full "
          calendarClassName="dark:bg-gray-700 dark:text-black"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      {/* Remarks */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          name="remarks"
          value={formData.remarks || ""}
          onChange={handleInputChange}
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="Available">Available</option>
        </select>
      </div>

      {/* Assigned Driver */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Assigned Driver
        </label>
        <input
          type="text"
          name="assigned_driver"
          value={formData.assigned_driver || ""}
          required
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Image */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Image
        </label>
        <label className="cursor-pointer border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 text-center">
          <Upload className="w-4 h-4 absolute" />
          Upload Image
          <input
            type="file"
            name="Image"
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
          className="px-5 py-2 mr-2 bg-blue-800 text-white text-xs rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 text-xs bg-red-800 dark:text-white rounded-md hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
