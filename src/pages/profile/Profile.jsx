import {
  FaCamera,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
export default function Profile() {

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Profil Administrateur
        </h1>

        <p className="text-gray-500 mt-2">
          Gérez votre compte administrateur
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/200"
                alt="Admin"
                className="w-32 h-32 rounded-full object-cover"
              />

              <button className="absolute bottom-2 right-2 bg-orange-500 text-white p-3 rounded-full">

                <FaCamera />

              </button>

            </div>

            <h2 className="text-2xl font-bold mt-5">
              Georges Admin
            </h2>

            <p className="text-gray-500">
              Super Administrateur
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Informations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-gray-500">
                Nom complet
              </label>

              <input
                type="text"
                defaultValue="Georges Admin"
                className="w-full border rounded-2xl p-4 mt-2"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">
                Email
              </label>

              <input
                type="email"
                defaultValue="admin@ekmer.com"
                className="w-full border rounded-2xl p-4 mt-2"
              />

            </div>

          </div>

          {/* SECURITY */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Sécurité
            </h2>

            <div className="space-y-5">

              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-5 rounded-2xl transition">

                <div className="flex items-center gap-3">

                  <FaLock className="text-orange-500" />

                  <span>
                    Changer le mot de passe
                  </span>

                </div>

              </button>

              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-5 rounded-2xl transition">

                <div className="flex items-center gap-3">

                  <FaUserShield className="text-orange-500" />

                  <span>
                    Double authentification
                  </span>

                </div>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}