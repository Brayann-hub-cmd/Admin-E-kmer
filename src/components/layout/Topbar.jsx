import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const formatRole = (role) => {
  if (!role) return "Super Admin";
  return role === "admin" ? "Super Admin" : role;
};

export default function Topbar() {
  const user = getStoredUser();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm w-[452px] max-w-full border border-gray-100">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="outline-none w-full text-gray-600 placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-5">
        <Link to="/notifications" className="relative hover:text-orange-500 transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>

        <Link to="/profile" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
          <FaUserCircle className="text-4xl" />
          <div>
            <p className="text-sm font-semibold">{user.username || "Admin"}</p>
            <span className="text-xs text-gray-500">{formatRole(user.role)}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
