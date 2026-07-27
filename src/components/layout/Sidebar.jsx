import { useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: t("sidebar.dashboard"), icon: <FaChartBar /> },
    { to: "/achats", label: t("sidebar.purchases"), icon: <FaWallet /> },
    { to: "/analytics", label: t("sidebar.analytics"), icon: <FaChartBar /> },
    { to: "/categories", label: t("sidebar.categories"), icon: <FaTags /> },
    { to: "/commandes", label: t("sidebar.commandes"), icon: <FaShoppingCart /> },
    { to: "/livreurs", label: t("sidebar.deliveryPartners"), icon: <FaTruck /> },
    { to: "/parametres", label: t("sidebar.settings"), icon: <FaCog /> },
    { to: "/produits", label: t("sidebar.products"), icon: <FaBoxOpen /> },
    { to: "/utilisateurs", label: t("sidebar.users"), icon: <FaUserCircle /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const toggleLanguage = () => {
    const next = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(next);
    localStorage.setItem("admin-language", next);
  };

  const closeMobile = () => setMobileOpen(false);

  const linkClass = ({ isActive }) =>
    [
      "relative flex items-center rounded-xl transition-all duration-200 text-base font-medium group",
      "justify-center w-12 h-12 mx-auto",
      "lg:justify-start lg:w-auto lg:h-auto lg:mx-0 lg:gap-4 lg:px-5 lg:py-3.5",
      isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100",
    ].join(" ");

  const renderNavLinks = (isMobileOverlay = false) =>
    navItems.map((item) =>
      isMobileOverlay ? (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={closeMobile}
          className={({ isActive }) =>
            ["flex items-center gap-4 px-5 py-3.5 rounded-xl transition-colors text-base font-medium", isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100"].join(" ")
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ) : (
        <NavLink key={item.to} to={item.to} className={linkClass}>
          <span className="text-lg shrink-0">{item.icon}</span>
          <span className="hidden lg:inline">{item.label}</span>
          <span className="sidebar-tooltip">{item.label}</span>
        </NavLink>
      )
    );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-xl w-11 h-11 flex items-center justify-center text-gray-700 hover:text-orange-600 transition-colors border border-gray-100" aria-label="Menu">
        <FaBars className="text-lg" />
      </button>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm" onClick={closeMobile} />
          <aside className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden shadow-2xl flex flex-col justify-between sidebar-slide-in overflow-y-auto">
            <div>
              <div className="h-20 flex items-center justify-between px-5">
                <div className="flex items-center gap-3">
                  <img src="/logo 2 1.png" alt="E-Kmer" className="w-12 h-12 object-contain" />
                  <h1 className="text-lg font-semibold text-gray-950">{t("sidebar.administrator")}</h1>
                </div>
                <button onClick={closeMobile} className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Close">
                  <FaTimes />
                </button>
              </div>
              <nav className="px-3 pb-4 flex flex-col gap-1.5">{renderNavLinks(true)}</nav>
            </div>
            <div className="p-3 border-t border-gray-100 space-y-1">
              <button onClick={toggleLanguage} className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium">
                {i18n.language === "fr" ? "English" : "Français"}
              </button>
              <button onClick={() => { handleLogout(); closeMobile(); }} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-base font-medium">
                <FaSignOutAlt />
                {t("sidebar.logout")}
              </button>
            </div>
          </aside>
        </>
      )}

      <aside className="sidebar-desktop hidden md:flex lg:flex flex-col justify-between sticky top-0 h-screen bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 w-[72px] lg:w-[260px]">
        <div>
          <div className="h-20 flex items-center gap-3 px-3 lg:px-5 justify-center lg:justify-start">
            <img src="/logo 2 1.png" alt="E-Kmer" className="w-10 h-10 lg:w-12 lg:h-12 object-contain shrink-0" />
            <h1 className="hidden lg:block text-lg font-semibold text-gray-950 truncate">{t("sidebar.administrator")}</h1>
          </div>
          <nav className="px-2 lg:px-3 pb-4 flex flex-col gap-1.5">{renderNavLinks(false)}</nav>
        </div>
        <div className="p-2 lg:p-3 border-t border-gray-100 space-y-1">
          <button onClick={toggleLanguage} className="relative flex items-center rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 text-base font-medium group justify-center w-12 h-12 mx-auto lg:justify-start lg:w-auto lg:h-auto lg:mx-0 lg:gap-4 lg:px-5 lg:py-3">
            <span className="shrink-0 text-sm">{i18n.language === "fr" ? "EN" : "FR"}</span>
            <span className="hidden lg:inline">{i18n.language === "fr" ? "English" : "Français"}</span>
            <span className="sidebar-tooltip">{i18n.language === "fr" ? "English" : "Français"}</span>
          </button>
          <button onClick={handleLogout} className="relative flex items-center rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 text-base font-medium group justify-center w-12 h-12 mx-auto lg:justify-start lg:w-auto lg:h-auto lg:mx-0 lg:gap-4 lg:px-5 lg:py-3.5">
            <FaSignOutAlt className="shrink-0" />
            <span className="hidden lg:inline">{t("sidebar.logout")}</span>
            <span className="sidebar-tooltip">{t("sidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
