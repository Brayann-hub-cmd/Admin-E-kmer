import { FaBell, FaSearch } from "react-icons/fa";

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
        <div className="relative cursor-pointer">
          <FaBell className="text-2xl text-gray-700" />

          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            5
          </span>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Administrateur
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}