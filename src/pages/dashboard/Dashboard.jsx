import StatsCards from "../../components/dashboard/StatsCards";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentOrders from "../../components/dashboard/RecentOrders";
import TopProducts from "../../components/dashboard/TopProducts";
import RecentActivities from "../../components/dashboard/RecentActivities";
import SalesByCategory from "../../components/dashboard/SalesByCategory";

export default function Dashboard() {
  return (
    <>
      {/* STATS */}
      <StatsCards />

      {/* CHART + ORDERS */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">

        <SalesChart />

        <RecentOrders />

      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  <TopProducts />

  <SalesByCategory />

  <RecentActivities />

</div>
    </>
  );
}