import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const formatRole = (role, t) => {
  if (!role) return "Super Admin";
  if (role === "admin") return "Super Admin";
  const roleMap = {
    vendeur: t("users.roleSeller"),
    seller: t("users.roleSeller"),
    user: t("users.roleBuyer"),
    buyer: t("users.roleBuyer"),
    acheteur: t("users.roleBuyer"),
    boutique: t("users.roleBoutique"),
    store: t("users.roleBoutique"),
    livreur: t("users.roleDriver"),
    driver: t("users.roleDriver"),
  };
  return roleMap[role] || role;
};

export default function Topbar() {
  const { t } = useTranslation();
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    const handleStorageChange = () => setUser(getStoredUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
      <div className="bg-white rounded-xl px-4 py-2.5 sm:py-3 flex items-center gap-3 shadow-sm w-full sm:w-auto sm:flex-1 sm:max-w-[452px] border border-gray-100">
        <FaSearch className="text-gray-400 shrink-0" />
        <input type="text" placeholder={t("topbar.search")} className="outline-none w-full text-gray-600 placeholder:text-gray-400 text-sm sm:text-base" />
      </div>
      <div className="flex items-center gap-5">
        <Link to="/profile" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-orange-500/20" />
          ) : (
            <FaUserCircle className="text-3xl sm:text-4xl text-gray-400" />
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{user.username || t("topbar.admin")}</p>
            <span className="text-xs text-gray-500">{formatRole(user.role, t)}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
