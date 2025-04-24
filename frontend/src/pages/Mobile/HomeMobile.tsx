import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const MobileScannerHome = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCreateProjectClick = () => {
    navigate("/create-project");
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

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[85vh] rounded-2xl border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <h3 className="mb-6 text-center font-semibold text-gray-800 dark:text-white/90 text-xl sm:text-2xl bg-blue-100 dark:bg-gray-800 px-4 py-2 rounded-lg w-fit mx-auto">
        Scan to View Info
      </h3>

      {/* Camera Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm aspect-square border-4 border-blue-500 rounded-xl overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="relative mt-6 border flex items-center justify-center gap-0 border-gray-200 bg-white px-5 py-8 dark:border-gray-800 dark:bg-white/[0.03] rounded-xl">
        {/* Floating Add Project Button */}

        <button
          onClick={handleCreateProjectClick}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Create Project</span>
        </button>
      </nav>
    </div>
  );
};

export default MobileScannerHome;
