// src/pages/ScannerPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

// Types for resources
type Resource = {
  id: string;
  name: string;
  description: string;
  category: string;
  serialNumber: string;
};

const ScannerPage = () => {
  const navigate = useNavigate();

  // State for QR scanning and project cart
  const [scannedItem, setScannedItem] = useState<Resource | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [cart, setCart] = useState<Resource[]>([]); // Cart to hold selected resources

  // Handle QR scan for resource viewing
  const handleScan = (data: any) => {
    if (data) {
      // Simulate fetching resource info from the scanned QR code
      const scannedResource = JSON.parse(data);
      setScannedItem(scannedResource);
    }
  };

  const handleError = (err: any) => {
    console.error("Scanner error:", err);
  };

  // Add resource to project cart
  const addToCart = () => {
    if (scannedItem) {
      setCart((prevCart) => [...prevCart, scannedItem]);
      alert(`${scannedItem.name} added to project cart!`);
      setScannedItem(null); // Clear scanned item after adding to cart
    } else {
      alert("Scan a resource first.");
    }
  };

  // Handle form submission for project creation
  const handleSubmit = () => {
    if (!projectName || !projectDescription || cart.length === 0) {
      alert("Please complete all fields and add at least one resource to the cart.");
      return;
    }

    alert("Project created successfully!");
    // For now, simply navigate after project creation
    navigate("/home"); // Redirect after project creation
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100 dark:bg-[#1a1a1a]">
      <div className="w-full max-w-4xl mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white/90">
            Create a New Project or View Resource
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Scan a resource QR code to view its details or add it to your project cart.
          </p>
        </div>

        {/* QR Code Scanner for Resource Viewing */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">Scan to View Resource</h2>
          <div className="mt-4 text-center">
            {scannedItem ? (
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white/90">
                  Resource Details:
                </h3>
                <p><strong>Name:</strong> {scannedItem.name}</p>
                <p><strong>Description:</strong> {scannedItem.description}</p>
                <p><strong>Category:</strong> {scannedItem.category}</p>
                <p><strong>Serial Number:</strong> {scannedItem.serialNumber}</p>
              </div>
            ) : (
              <p>No resource scanned yet.</p>
            )}
          </div>
        </div>

        {/* Project Creation Form */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">Create Project</h2>
          
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-white">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-white">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={4}
              className="w-full mt-2 p-4 border border-gray-300 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter project description"
            />
          </div>

          {/* Cart */}
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white/90">Project Cart:</h3>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="text-gray-800 dark:text-white/90">
                  {item.name} - {item.category}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={addToCart}
              className="w-48 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Submit Project */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-48 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
