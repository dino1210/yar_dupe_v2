import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import jsQR from "jsqr";

const MobileScannerHome = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [resourceType, setResourceType] = useState<"tool" | "vehicle" | null>(
    null
  );

  const handleCreateProjectClick = () => {
    navigate("/create-project");
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      fetchScannedData(code.data);
    }
  };

  const fetchScannedData = async (qrCode: string) => {
    try {
      // Try tool endpoint first
      let response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tools/qr/${encodeURIComponent(
          qrCode
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setScannedData(data);
        setResourceType("tool");
        setShowModal(true);
        return;
      }

      // If not found, try vehicle endpoint
      response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/vehicles/qr/${encodeURIComponent(qrCode)}`
      );
      if (response.ok) {
        const data = await response.json();
        setScannedData(data);
        setResourceType("vehicle");
        setShowModal(true);
        return;
      }

      throw new Error("Resource not found");
    } catch (err) {
      console.error("QR Scan error:", err);
    }
  };

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
      audio: false,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
      });

    const interval = setInterval(scanQRCode, 800);

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col h-[85vh] rounded-2xl border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-6 text-center font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl bg-blue-100 dark:bg-gray-800 px-4 py-2 rounded-lg w-fit mx-auto">
        Scan to View Info
      </h3>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm aspect-square border-4 border-gray-500 shadow-2xl rounded-2xl overflow-hidden relative">
          <video ref={videoRef} className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>

      <nav className="relative mt-6 border flex items-center justify-center gap-0 border-gray-200 bg-white px-5 py-8 dark:border-gray-800 dark:bg-white/[0.03] rounded-xl">
        <button
          onClick={handleCreateProjectClick}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-5 rounded-lg shadow-xl transition"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Create Project</span>
        </button>
      </nav>

      {/* Modal */}
      {showModal && scannedData && (
        <div className="fixed inset-0 bg-black/50 flex text-white text-xs items-center justify-center z-50">
          <div className="rounded-2xl border border-gray-200 bg-white px-10 py-9 dark:border-gray-800 dark:bg-gray-800 space-y-1 max-h-[90vh] overflow-y-auto">
            {scannedData.picture && (
              <img
                src={`${
                  import.meta.env.VITE_API_BASE_URL
                }/assets/images/tools/${scannedData.picture}`}
                alt="Tool"
                className="w-20 h-20 object-cover mx-auto rounded-full border mb-4"
              />
            )}
            <p className="text-center">
              <strong>{scannedData.name}</strong> 
            </p>

            {resourceType === "tool" && (
              <>
                <p>
                  <strong>Tag:</strong> {scannedData.tag}
                </p>
                <p>
                  <strong>Brand:</strong> {scannedData.brand}
                </p>
                <p>
                  <strong>Category:</strong> {scannedData.category}
                </p>
                <p>
                  <strong>Status:</strong> {scannedData.status}
                </p>
                <p>
                  <strong>Description:</strong> {scannedData.description}
                </p>
                <p>
                  <strong>Purchase Date:</strong>{" "}
                  {scannedData.purchase_date
                    ? new Date(scannedData.purchase_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "-"}
                </p>
                <p>
                  <strong>Warranty:</strong>{" "}
                  {scannedData.warranty
                    ? new Date(scannedData.warranty).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "-"}
                </p>
                <p>
                  <strong>Remarks:</strong> {scannedData.remarks}
                </p>
              </>
            )}

            {resourceType === "vehicle" && (
              <>
                <p>
                  <strong>Plate Number:</strong> {scannedData.plate}
                </p>
                <p>
                  <strong>Type:</strong> {scannedData.type}
                </p>
                <p>
                  <strong>Brand:</strong> {scannedData.brand}
                </p>
                <p>
                  <strong>Status:</strong> {scannedData.status}
                </p>
                <p>
                  <strong>Model:</strong> {scannedData.model}
                </p>
                <p>
                  <strong>Year:</strong> {scannedData.year}
                </p>
                <p>
                  <strong>Remarks:</strong> {scannedData.remarks}
                </p>
              </>
            )}

            {/* History Table below details */}
            {scannedData.history && scannedData.history.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 border">Date</th>
                        <th className="px-3 py-2 border">Project</th>
                        <th className="px-3 py-2 border">Action</th>
                        <th className="px-3 py-2 border">By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scannedData.history.map((entry, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-50"
                        >
                          <td className="px-3 py-2 border">{entry.date}</td>
                          <td className="px-3 py-2 border">
                            {entry.project || "-"}
                          </td>
                          <td className="px-3 py-2 border">{entry.action}</td>
                          <td className="px-3 py-2 border">{entry.user}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileScannerHome;
