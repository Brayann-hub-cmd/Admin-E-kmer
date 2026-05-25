import {
  FaChartBar,
  FaShoppingCart,
  FaBoxOpen,
  FaTags,
  FaCog,
  FaWallet,
  FaStore,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
    ${
      isActive
        ? "bg-orange-100 text-orange-500"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-[270px] bg-white h-screen sticky top-0 shadow-md flex flex-col justify-between border-r">

      {/* TOP */}
      <div>

      {/* LOGO */}
<div className="h-20 flex items-center px-6 border-b">
  <img src="/logo 2 1.png" alt="logo" className="w-15 h-10"/>
  <h1 className="text-xl font-semibold">
    <span className="text-orange-500">Admin</span>
  </h1>
</div>

        {/* MENU */}
        <div className="px-4 py-6 flex flex-col gap-2">

          <NavLink to="/admin" className={linkClass}>
            <FaChartBar />
            Dashboard
          </NavLink>

          <NavLink to="/ventes" className={linkClass}>
            <FaStore />
            Ventes
          </NavLink>

          <NavLink to="/achats" className={linkClass}>
            <FaWallet />
            Achats
          </NavLink>

          <NavLink to="/commandes" className={linkClass}>
            <FaShoppingCart />
            Commandes
          </NavLink>


          <NavLink to="/categories" className={linkClass}>
            <FaTags />
            Catégories
          </NavLink>

          <NavLink to="/parametres" className={linkClass}>
            <FaCog />
            Paramètres
          </NavLink>

         <NavLink to="/analytics" className={linkClass}>
          <FaChartBar />
          Analytics
        </NavLink>

          <NavLink to="/utilisateurs" className={linkClass}>
            <FaUserCircle />
            Utilisateurs
          </NavLink>
  
        </div>
     
      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
          <FaSignOutAlt />
          Déconnexion
        </button>

      </div>

    </aside>
  );
}