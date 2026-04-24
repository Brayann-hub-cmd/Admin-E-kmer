import { NavLink } from "react-router-dom";
import { FaChartBar, FaUsers, FaBox, FaShoppingCart, FaProductHunt, FaCartPlus } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 shadow py-3 rounded-lg transition-all";

  const activeClass = "bg-orange-100 text-orange-500 font-semibold";
  const inactiveClass = "text-gray-700 hover:bg-gray-100";

  return (
    <div className="w-64 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>

      <div className="flex flex-col gap-2">
        
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaUsers />
          Utilisateurs
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaBoxArchive/>
          Produits
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaCartPlus/>
          Commandes
        </NavLink>

      </div>
    </div>
  );
}