import { FaExclamationTriangle } from "react-icons/fa";

export default function Reports() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-950">Signalements</h1>
        <p className="text-gray-500 mt-2">Gestion des abus et fraudes marketplace</p>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 mx-auto flex items-center justify-center text-2xl">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-xl font-semibold mt-5 text-gray-950">Module non connecté</h2>
        <p className="text-gray-500 mt-2">
          Aucun endpoint backend n'est encore disponible pour les signalements.
        </p>
      </div>
    </div>
  );
}
