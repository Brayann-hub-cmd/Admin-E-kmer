import {
  FaBoxOpen,
  FaChartBar,
  FaCog,
  FaMotorcycle,
  FaShoppingCart,
  FaSignOutAlt,
  FaTags,
  FaTruck,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <FaChartBar /> },
  { to: "/achats", label: "Achats", icon: <FaWallet /> },
  { to: "/analytics", label: "Analytics", icon: <FaChartBar /> },
  { to: "/categories", label: "Catégories", icon: <FaTags /> },
  { to: "/commandes", label: "Commandes", icon: <FaShoppingCart /> },
  { to: "/livreurs", label: "Livreurs", icon: <FaTruck /> },
  { to: "/parametres", label: "Paramètres", icon: <FaCog /> },
  { to: "/produits", label: "Produits", icon: <FaBoxOpen /> },
  { to: "/utilisateurs", label: "Utilisateurs", icon: <FaUserCircle /> },
  // { to: "/notifications", label: "Notifications", icon: <FaBell /> },
  // { to: "/reports", label: "Signalements", icon: <FaExclamationTriangle /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    [
      "flex items-center gap-4 px-5 py-3.5 rounded-xl transition-colors text-base font-medium",
      isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100",
    ].join(" ");

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-gray-200 sticky top-0 overflow-y-auto flex flex-col justify-between">
      <div>
        <div className="h-24 flex items-center gap-3 px-6">
          <img src="/logo 2 1.png" alt="E-Kmer" className="w-14 h-14 object-contain" />
          <h1 className="text-xl font-semibold text-gray-950">Administrateur</h1>
        </div>

        <nav className="px-3 pb-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-base font-medium"
        >
          <FaSignOutAlt />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
