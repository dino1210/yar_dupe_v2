import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Upload } from "lucide-react";

type ConsumableFormProps = {
  onClose: () => void;
  onAddSuccess: () => void;
  addedBy: string;
  consumableToEdit?: any; // Replace with proper type if available
};

const ConsumableForm: React.FC<ConsumableFormProps> = ({
  onClose,
  onAddSuccess,
  consumableToEdit,
}) => {
  const [formData, setFormData] = useState({
    picture: null as File | null,
    existingPicture: "",
    tag: "",
    name: "",
    category: "",
    quantity: "",
    minStock: "",
    unit: "",
    location: "",
  });

  useEffect(() => {
    if (consumableToEdit) {
      setFormData({
        picture: null,
        existingPicture: consumableToEdit.picture || "",
        tag: consumableToEdit.tag || "",
        name: consumableToEdit.name || "",
        category: consumableToEdit.category || "",
        quantity: consumableToEdit.quantity?.toString() || "",
        minStock: consumableToEdit.minStock?.toString() || "",
        unit: consumableToEdit.unit || "",
        location: consumableToEdit.location || "",
      });
    }
  }, [consumableToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const form = new FormData();
    form.append("tag", formData.tag);
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("quantity", formData.quantity);
    form.append("minStock", formData.minStock);
    form.append("unit", formData.unit);
    form.append("location", formData.location);
    form.append("added_by", user.name);
    form.append("existingPicture", formData.existingPicture);

    if (formData.picture) {
      form.append("picture", formData.picture);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/consumables${
          consumableToEdit ? `/${consumableToEdit.id}` : ""
        }`,
        {
          method: consumableToEdit ? "PUT" : "POST",
          body: form,
        }
      );

      if (response.ok) {
        toast.success(
          consumableToEdit
            ? "Consumable updated successfully!"
            : "Consumable added successfully!"
        );
        onAddSuccess();
        onClose();
      } else {
        toast.error("Failed to save consumable");
      }
    } catch (error) {
      console.error("Error saving consumable", error);
      toast.error("Error saving consumable");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        picture: e.target.files![0],
      }));
    }
  };
  const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    const handleInputChangeCategory = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      setFormData({ ...formData, category: value });
  
      if (value.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
  
      const filtered = categoryList
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
  
      setSuggestions(filtered);
      setShowSuggestions(true);
    };
  
    const handleSuggestionClick = (value: string) => {
      setFormData({ ...formData, category: value });
      setSuggestions([]);
      setShowSuggestions(false);
    };

    const categoryList = [
      "Cutting Disk",
      "Drill Bit",
      "Grinding Disk",
      "Flap Disk",
      "Diamond Cutting Wheel",
      "Cutter Blade",
      "Hacksaw Blade",
      "Cable Tie",
      "Sandpaper",
      "Battery",
      "Tape",
      "Paint Brush",
      "Nail",
      "Tox",
      "Screw",
      "Metal Clamp"
    ]


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
          required
          value={formData.name || ""}
          onChange={handleInputChange}
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

        <div className="relative">
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChangeCategory}
            autoComplete="off"
            required
            className="border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-white text-xs shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-700 z-10">
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
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
          <option value="">Select unit</option>
          <option value="ml">ml</option>
          <option value="kg">kg</option>
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
      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-xs text-gray-700 dark:text-gray-300">
          Image
        </label>
        <label className="cursor-pointer border rounded-md p-2 text-xs bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400 text-center relative">
          <Upload className="w-4 h-4 absolute left-2 top-2" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
          {consumableToEdit ? "Update" : "Add"}
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
