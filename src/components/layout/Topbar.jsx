import {
  FaBell,
  FaUserCircle,FaSearch
} from "react-icons/fa";

import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* SEARCH */}
      <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow w-[400px]">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Rechercher..."
          className="outline-none w-full"
        />
      </div>

      {/* RIGHT */}
<div className="flex items-center gap-5">

  {/* NOTIFICATION */}
  <Link
    to="/notifications"
    className="relative hover:text-orange-500 transition-colors"
  >

    <FaBell className="text-xl" />

    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
      3
    </span>

  </Link>

  {/* PROFIL */}
  <Link
    to="/profile"
    className="flex items-center gap-2 hover:text-orange-500 transition-colors"
  >

    <FaUserCircle className="text-3xl" />

    <div>

      <p className="text-sm font-semibold">
        Admin
      </p>

      <span className="text-xs text-gray-500">
        Super Admin
      </span>

    </div>

  </Link>

</div> 
</div>

       
    
  );
}