import { FaGlobe, FaLock, FaMoneyBillWave, FaStore } from "react-icons/fa";

export default function Settings() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-950">Paramètres</h1>
        <p className="text-gray-500 mt-1">Configuration générale et préférences de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaGlobe className="text-orange-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">Général</h2>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="text-gray-500">Nom plateforme</span>
              <input defaultValue="E-Kmer" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-500">Email support</span>
              <input defaultValue="support@ekmer.com" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaLock className="text-red-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">Sécurité</h2>
          </div>

          <div className="space-y-6 text-lg">
            <label className="flex items-center justify-between">
              <span>Double authentification</span>
              <input type="checkbox" />
            </label>
            <label className="flex items-center justify-between">
              <span>Validation admin obligatoire</span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaStore className="text-blue-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">Marketplace</h2>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="text-gray-500">Commission (%)</span>
              <input type="number" defaultValue="5" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-500">Images max par annonce</span>
              <input type="number" defaultValue="10" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaMoneyBillWave className="text-green-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">Paiements</h2>
          </div>

          <div className="space-y-6 text-lg">
            <label className="flex items-center justify-between">
              <span>Orange Money</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>MTN Mobile Money</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>Carte bancaire</span>
              <input type="checkbox" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
