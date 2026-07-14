import { useState } from "react";
import {
  FaBars,
  FaBoxOpen,
  FaChartBar,
  FaCog,
  FaMotorcycle,
  FaShoppingCart,
  FaSignOutAlt,
  FaTags,
  FaTimes,
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
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const closeMobile = () => setMobileOpen(false);

  // --- Link classes ---
  // On mobile (sidebar collapsed, icons only): centered icon, no text
  // On mobile overlay (mobileOpen): full link with text
  // On lg+: full link with text
  const linkClass = ({ isActive }) =>
    [
      "relative flex items-center rounded-xl transition-all duration-200 text-base font-medium group",
      // Mobile collapsed: centered icon, square-ish
      "justify-center w-12 h-12 mx-auto",
      // lg+: full width with gap and padding
      "lg:justify-start lg:w-auto lg:h-auto lg:mx-0 lg:gap-4 lg:px-5 lg:py-3.5",
      isActive
        ? "bg-orange-100 text-orange-600"
        : "text-gray-700 hover:bg-gray-100",
    ].join(" ");

  const renderNavLinks = (isMobileOverlay = false) =>
    navItems.map((item) =>
      isMobileOverlay ? (
        // Mobile overlay: full links with text
        <NavLink
          key={item.to}
          to={item.to}
          onClick={closeMobile}
          className={({ isActive }) =>
            [
              "flex items-center gap-4 px-5 py-3.5 rounded-xl transition-colors text-base font-medium",
              isActive
                ? "bg-orange-100 text-orange-600"
                : "text-gray-700 hover:bg-gray-100",
            ].join(" ")
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ) : (
        // Desktop & collapsed mobile: icon + tooltip
        <NavLink key={item.to} to={item.to} className={linkClass}>
          <span className="text-lg shrink-0">{item.icon}</span>
          {/* Label visible only on lg+ */}
          <span className="hidden lg:inline">{item.label}</span>
          {/* Tooltip on hover for collapsed mode (below lg) */}
          <span className="sidebar-tooltip">
            {item.label}
          </span>
        </NavLink>
      )
    );

  return (
    <>
      {/* ========= MOBILE HAMBURGER BUTTON ========= */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-xl w-11 h-11 flex items-center justify-center text-gray-700 hover:text-orange-600 transition-colors border border-gray-100"
        aria-label="Ouvrir le menu"
      >
        <FaBars className="text-lg" />
      </button>

      {/* ========= MOBILE OVERLAY SIDEBAR ========= */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            onClick={closeMobile}
          />
          {/* Slide-in panel */}
          <aside className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden shadow-2xl flex flex-col justify-between sidebar-slide-in overflow-y-auto">
            <div>
              <div className="h-20 flex items-center justify-between px-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo 2 1.png"
                    alt="E-Kmer"
                    className="w-12 h-12 object-contain"
                  />
                  <h1 className="text-lg font-semibold text-gray-950">
                    Administrateur
                  </h1>
                </div>
                <button
                  onClick={closeMobile}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <FaTimes />
                </button>
              </div>

              <nav className="px-3 pb-4 flex flex-col gap-1.5">
                {renderNavLinks(true)}
              </nav>
            </div>

            <div className="p-3 border-t border-gray-100">
              <button
                onClick={() => {
                  handleLogout();
                  closeMobile();
                }}
                className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-base font-medium"
              >
                <FaSignOutAlt />
                Déconnexion
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ========= DESKTOP SIDEBAR ========= */}
      {/* Collapsed on md (icons only), full on lg+ */}
      <aside className="sidebar-desktop hidden md:flex lg:flex flex-col justify-between sticky top-0 h-screen bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 w-[72px] lg:w-[260px]">
        <div>
          {/* Header */}
          <div className="h-20 flex items-center gap-3 px-3 lg:px-5 justify-center lg:justify-start">
            <img
              src="/logo 2 1.png"
              alt="E-Kmer"
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain shrink-0"
            />
            <h1 className="hidden lg:block text-lg font-semibold text-gray-950 truncate">
              Administrateur
            </h1>
          </div>

          {/* Navigation */}
          <nav className="px-2 lg:px-3 pb-4 flex flex-col gap-1.5">
            {renderNavLinks(false)}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-2 lg:p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="relative flex items-center rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 text-base font-medium group justify-center w-12 h-12 mx-auto lg:justify-start lg:w-auto lg:h-auto lg:mx-0 lg:gap-4 lg:px-5 lg:py-3.5"
          >
            <FaSignOutAlt className="shrink-0" />
            <span className="hidden lg:inline">Déconnexion</span>
            {/* Tooltip */}
            <span className="sidebar-tooltip">
              Déconnexion
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
