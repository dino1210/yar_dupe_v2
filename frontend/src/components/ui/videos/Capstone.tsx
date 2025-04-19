import { useEffect, useState } from "react";
import PageMeta from "../../common/PageMeta";
import { Link } from "react-router";
import { toast } from "react-toastify";

// Replace this with your PNG path or import
const rainImg = "/images/gesture.png"; // Make sure it's in your `public/images` folder

function RainDrop({ left, delay, size }) {
  return (
    <img
      src={rainImg}
      className="pointer-events-none fixed top-0 z-50 animate-rain"
      style={{
        left: `${left}%`,
        animationDuration: `${5 + Math.random() * 3}s`,
        animationDelay: `${delay}s`,
        width: size,
        height: size,
      }}
      alt=""
    />
  );
}
export default function Capstone() {
  const [drops, setDrops] = useState([]);

  toast.warning("Pakyu ka sir .|.")
  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: `${40 + Math.random() * 40}px`,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <PageMeta title="Easter Egg" description="" />
      {drops.map((drop, index) => (
        <RainDrop
          key={index}
          left={drop.left}
          delay={drop.delay}
          size={drop.size}
        />
      ))}

      <div className="rounded-2xl border border-gray-200 m-10 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 relative z-10">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-3">
            <iframe
              src="https://www.youtube.com/embed/6tsKvVYziyY"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            ./. Pakshet Kayo Lahat .\.
          </h3>
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
