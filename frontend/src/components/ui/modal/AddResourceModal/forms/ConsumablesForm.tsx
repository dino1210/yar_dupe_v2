// ToolForm.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"
import "react-datepicker/dist/react-datepicker.css";
import { Upload } from "lucide-react";

type ConsumableFormProps = {
  onClose: () => void;
  onAddSuccess: () => void;
};

type Category = {
  id: number;
  name: string;
};

interface ConsumableFormData {
  picture: string;
  tag: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  location: string;
  date: string;
  qr: string;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({
  onClose,
  onAddSuccess,
}) => {
  const [formData, setFormData] = useState<ConsumableFormData>({
    picture: " ",
    tag: " ",
    name: " ",
    category: " ",
    quantity: 0,
    minStock: 0,
    unit: " ",
    location: " ",
    date: " ",
    qr: " ",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/consumables`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    
          if (response.ok) {
            toast.success("Consumable added successfully!");
            onAddSuccess();
            onClose();
          } else {
            toast.error("Failed to add consumable");
          }
        } catch (error) {
          console.error("Error adding consumable", error);
          toast.error("Error adding consumable");
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
          Item Name
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

      {/* Tag/Code */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Tag/Code
        </label>
        <input
          type="text"
          name="tag"
          value={formData.tag || ""}
          required
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

      {/* Quantity */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity || ""}
          required
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Minimum Stock */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Min. Stock
        </label>
        <input
          type="number"
          name="minStock"
          value={formData.minStock || ""}
          required
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Unit */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Unit
        </label>
        <select
          name="unit"
          value={formData.unit || ""}
          onChange={handleInputChange}
          className="border rounded-md p-2 bg-white text-xs text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="ml">ml</option>
          <option value="pcs">pcs</option>
          <option value="tubes">tubes</option>
          <option value="rolls">rolls</option>
          <option value="box">box</option>
          <option value="pairs">pairs</option>
          <option value="bottles">bottles</option>
          <option value="packs">packs</option>
          <option value="sets">sets</option>
        </select>
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location || ""}
          required
          onChange={handleInputChange}
          className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Image*/}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Image
        </label>
        <label className="cursor-pointer border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 text-center">
          <Upload className="w-4 h-4 absolute" />
          Upload Image
          <input
            type="file"
            name="image"
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

export default ConsumableForm;
