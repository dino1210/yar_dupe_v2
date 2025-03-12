import AvailableTools from "../../components/ecommerce/AvailableTools";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";

import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description=""
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <AvailableTools />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
