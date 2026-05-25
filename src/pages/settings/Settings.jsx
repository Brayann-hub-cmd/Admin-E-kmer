import {
  FaLock,
  FaBell,
  FaStore,
  FaMoneyBillWave,
  FaGlobe,
} from "react-icons/fa";

export default function Settings() {

  return (
<div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Paramètres
        </h1>

        <p className="text-gray-500 mt-2">
          Configuration générale de la marketplace
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* GENERAL */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <FaGlobe className="text-orange-500 text-xl" />

            <h2 className="text-xl font-bold">
              Général
            </h2>

          </div>

          <div className="space-y-5">

            <div>

              <label className="text-sm text-gray-500">
                Nom plateforme
              </label>

              <input
                type="text"
                defaultValue="E-Kmer"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">
                Email support
              </label>

              <input
                type="email"
                defaultValue="support@ekmer.com"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

          </div>

        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <FaLock className="text-red-500 text-xl" />

            <h2 className="text-xl font-bold">
              Sécurité
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span>
                Double authentification
              </span>

              <input type="checkbox" />

            </div>

            <div className="flex items-center justify-between">

              <span>
                Validation admin obligatoire
              </span>

              <input type="checkbox" defaultChecked />

            </div>

          </div>

        </div>

        {/* MARKETPLACE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <FaStore className="text-blue-500 text-xl" />

            <h2 className="text-xl font-bold">
              Marketplace
            </h2>

          </div>

          <div className="space-y-5">

            <div>

              <label className="text-sm text-gray-500">
                Commission (%)
              </label>

              <input
                type="number"
                defaultValue="5"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">
                Images max par annonce
              </label>

              <input
                type="number"
                defaultValue="10"
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

          </div>

        </div>

        {/* PAYMENTS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <FaMoneyBillWave className="text-green-500 text-xl" />

            <h2 className="text-xl font-bold">
              Paiements
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span>
                Orange Money
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex items-center justify-between">

              <span>
                MTN Mobile Money
              </span>

              <input type="checkbox" defaultChecked />

            </div>

            <div className="flex items-center justify-between">

              <span>
                Carte bancaire
              </span>

              <input type="checkbox" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}