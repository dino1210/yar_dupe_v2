import axios from "axios";

import { useEffect, useState } from "react";
import RecentOrders from "../../components/dashboardcontents/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import TotalResources from "../../components/dashboardcontents/TotalResoures";
import ProjectHistoryTable from "../../components/dashboardcontents/ProjectHistoryTable";

import LowStock from "../../components/dashboardcontents/LowStock";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [projectStats, setProjectStats] = useState({
    total: 0,
    ongoing: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/projects/stats`)
      .then((res) => setProjectStats(res.data))
      .catch((err) => console.error("Error fetching project stats:", err));
  }, []);

  return (
    <>
      <PageMeta title="Dashboard" description="" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <TotalResources />
          <ProjectHistoryTable />
          <LowStock />
        </div>

        <div className="col-span-12 xl:col-span-5 max-h-full">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
