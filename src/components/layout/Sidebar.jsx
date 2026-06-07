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
  FaBell,
  FaFlag,
} from "react-icons/fa";

import { FaDartLang } from "react-icons/fa6";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-4
    px-5 py-4
    rounded-2xl
    transition-all duration-200
    font-medium text-[17px]
    ${
      isActive
        ? "bg-orange-100 text-orange-500 shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }
  `;

  return (
    <aside
      className="
      w-[300px]
      h-screen
      bg-white
      border-r
      border-gray-200
      flex
      flex-col
      justify-between
      overflow-y-auto
      sticky
      top-0
      shadow-sm
    "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="h-15 flex items-center px-6 border-b">

          <img
            src="/logo 2 1.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />

          <h1 className="text-2xl font-semibold">

            <span className="text-orange-500">
              Admin
            </span>

          </h1>

        </div>
        

        {/* MENU */}
        <div className="px-1 py-2 flex flex-col gap-2">

           {/* D */}
          <NavLink to="/admin" className={linkClass}>
            <FaDartLang className="text-[20px]" />
            Dashboard
          </NavLink>

          {/* A */}
          <NavLink to="/achats" className={linkClass}>
            <FaWallet className="text-[20px]" />
            Achats
          </NavLink>

          <NavLink to="/analytics" className={linkClass}>
            <FaChartBar className="text-[20px]" />
            Analytics
          </NavLink>

          {/* C */}
          <NavLink to="/categories" className={linkClass}>
            <FaTags className="text-[20px]" />
            Catégories
          </NavLink>

          <NavLink to="/commandes" className={linkClass}>
            <FaShoppingCart className="text-[20px]" />
            Commandes
          </NavLink>

          {/* N */}
          <NavLink to="/notifications" className={linkClass}>
            <FaBell className="text-[20px]" />
            Notifications
          </NavLink>

          {/* P */}
          <NavLink to="/parametres" className={linkClass}>
            <FaCog className="text-[20px]" />
            Paramètres
          </NavLink>

          <NavLink to="/produits" className={linkClass}>
            <FaBoxOpen className="text-[20px]" />
            Produits
          </NavLink>

          {/* S */}
          <NavLink to="/reports" className={linkClass}>
            <FaFlag className="text-[20px]" />
            Signalements
          </NavLink>

          {/* U */}
          <NavLink to="/utilisateurs" className={linkClass}>
            <FaUserCircle className="text-[20px]" />
            Utilisateurs
          </NavLink>

          {/* V */}
          <NavLink to="/ventes" className={linkClass}>
            <FaStore className="text-[20px]" />
            Ventes
          </NavLink>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="p-2 border-t border-gray-100">

        <button
          onClick={handleLogout}
          className="
          w-full
          flex items-center gap-4
          px-5 py-4
          rounded-2xl
          text-red-500
          hover:bg-red-50
          transition-all
          text-[17px]
          font-medium
        "
        >

          <FaSignOutAlt className="text-[20px]" />

          Déconnexion

        </button>

      </div>

    </aside>
  );
}