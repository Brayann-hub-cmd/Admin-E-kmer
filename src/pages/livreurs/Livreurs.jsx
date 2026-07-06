import { useEffect, useState } from "react";
import {
  FaBicycle,
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";
import api from "../../services/api";

const vehicleIcon = {
  moto: <FaMotorcycle />,
  vélo: <FaBicycle />,
  bicyclette: <FaBicycle />,
  voiture: <FaCar />,
  camion: <FaTruck />,
};

const statusConfig = {
  disponible: { label: "Disponible", className: "bg-green-100 text-green-700" },
  occupé: { label: "Occupé", className: "bg-orange-100 text-orange-700" },
  busy: { label: "Occupé", className: "bg-orange-100 text-orange-700" },
  "hors ligne": { label: "Hors ligne", className: "bg-gray-100 text-gray-600" },
  offline: { label: "Hors ligne", className: "bg-gray-100 text-gray-600" },
  available: { label: "Disponible", className: "bg-green-100 text-green-700" },
};

const validationConfig = {
  true: { label: "Validé", className: "bg-green-100 text-green-700", icon: <FaCheckCircle /> },
  false: { label: "En attente", className: "bg-yellow-100 text-yellow-700", icon: <FaClock /> },
};

const avatarColors = ["bg-blue-100", "bg-green-100", "bg-orange-100", "bg-purple-100", "bg-pink-100"];

export default function Livreurs() {
  const [livreurs, setLivreurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("tous");

  useEffect(() => {
    loadLivreurs();
  }, []);

  const loadLivreurs = async () => {
    setLoading(true);
    try {
      const response = await api.get("livreurs/");
      const data = Array.isArray(response.data) ? response.data : [];
      setLivreurs(data);
    } catch (error) {
      console.error("Erreur chargement livreurs :", error);
      // Données de démonstration si l'endpoint n'existe pas encore
      setLivreurs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id) => {
    try {
      await api.patch(`livreurs/${id}/`, { is_validated: true });
      loadLivreurs();
    } catch (error) {
      console.error("Erreur validation livreur :", error);
    }
  };

  const handleSuspend = async (id) => {
    try {
      await api.patch(`livreurs/${id}/`, { is_active: false });
      loadLivreurs();
    } catch (error) {
      console.error("Erreur suspension livreur :", error);
    }
  };

  const counts = {
    tous: livreurs.length,
    disponible: livreurs.filter((l) => String(l.statut || l.status || "").toLowerCase() === "disponible" || l.statut === "available").length,
    occupé: livreurs.filter((l) => String(l.statut || l.status || "").toLowerCase().includes("occup") || l.statut === "busy").length,
    "hors ligne": livreurs.filter((l) => String(l.statut || l.status || "").toLowerCase().includes("hors") || l.statut === "offline").length,
  };

  const filtered = filter === "tous"
    ? livreurs
    : livreurs.filter((l) => {
        const statut = String(l.statut || l.status || "").toLowerCase();
        if (filter === "disponible") return statut === "disponible" || statut === "available";
        if (filter === "occupé") return statut.includes("occup") || statut === "busy";
        if (filter === "hors ligne") return statut.includes("hors") || statut === "offline";
        return true;
      });

  return (
    <div>
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Livreurs</h1>
          <p className="text-gray-500 mt-1">Gestion de la flotte de livraison</p>
        </div>
        <button
          onClick={loadLivreurs}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <FaUserCheck />
          Actualiser
        </button>
      </div>

      {/* Filtres de statut */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["tous", "disponible", "occupé", "hors ligne"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-xl font-medium capitalize transition-colors ${
              filter === f
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f === "tous" ? "Tous" : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-2 text-sm opacity-75">({counts[f] ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">Livreur</th>
              <th className="text-left p-5">Véhicule</th>
              <th className="text-left p-5">Permis / Plaque</th>
              <th className="text-left p-5">Statut</th>
              <th className="text-left p-5">Validation</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400">
                  Chargement...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400">
                  Aucun livreur trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((livreur, index) => {
                const statut = String(livreur.statut || livreur.status || "hors ligne").toLowerCase();
                const statusCfg = statusConfig[statut] || statusConfig["hors ligne"];
                const vehicleType = String(livreur.type_vehicule || livreur.vehicule || "moto").toLowerCase();
                const icon = vehicleIcon[vehicleType] || vehicleIcon.moto;
                const isValidated = livreur.is_validated === true;
                const valCfg = validationConfig[String(isValidated)];

                return (
                  <tr key={livreur.id || index} className="border-b border-gray-200 last:border-b-0">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-xl text-gray-600`}>
                          {livreur.avatar ? (
                            <img src={livreur.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <FaMotorcycle />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-950">
                            {livreur.user?.username || livreur.username || livreur.nom || "Livreur"}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {livreur.user?.email || livreur.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-2 text-gray-700 font-medium">
                        <span className="text-orange-500">{icon}</span>
                        <span className="capitalize">{vehicleType}</span>
                      </span>
                    </td>
                    <td className="p-5 text-gray-600">
                      <p className="text-sm">{livreur.num_permis || livreur.permis || "—"}</p>
                      <p className="text-sm text-gray-400">{livreur.num_plaque || livreur.plaque || ""}</p>
                    </td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusCfg.className}`}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${valCfg.className}`}>
                        {valCfg.icon}
                        {valCfg.label}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        {!isValidated && (
                          <button
                            onClick={() => handleValidate(livreur.id)}
                            className="px-4 py-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 text-sm font-medium flex items-center gap-2"
                          >
                            <FaCheckCircle />
                            Valider
                          </button>
                        )}
                        <button
                          onClick={() => handleSuspend(livreur.id)}
                          className="px-4 py-2 rounded-xl bg-red-100 text-red-500 hover:bg-red-200 text-sm font-medium flex items-center gap-2"
                        >
                          <FaTimesCircle />
                          Suspendre
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
