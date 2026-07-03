import { useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch,
} from "react-icons/fa";
import api from "../../services/api";

const typeConfig = {
  produit: { label: "Produit non conforme", className: "bg-orange-100 text-orange-700" },
  livraison: { label: "Colis perdu/endommagé", className: "bg-red-100 text-red-700" },
  paiement: { label: "Problème de paiement", className: "bg-purple-100 text-purple-700" },
  fraude: { label: "Fraude signalée", className: "bg-red-200 text-red-800" },
  autre: { label: "Autre litige", className: "bg-gray-100 text-gray-700" },
};

const statusConfig = {
  ouvert: { label: "Ouvert", className: "bg-yellow-100 text-yellow-700", icon: <FaHourglassHalf /> },
  en_cours: { label: "En cours", className: "bg-blue-100 text-blue-700", icon: <FaHourglassHalf /> },
  resolu: { label: "Résolu", className: "bg-green-100 text-green-700", icon: <FaCheckCircle /> },
  ferme: { label: "Fermé", className: "bg-gray-100 text-gray-600", icon: <FaTimesCircle /> },
};

const DEMO_LITIGES = [
  { id: 1, type: "produit", statut: "ouvert", acheteur: "Jean Dupont", vendeur: "Shop Electronique", commande: "#CMD-001", date: "2026-07-01", description: "Produit reçu endommagé, ne correspond pas à la description." },
  { id: 2, type: "livraison", statut: "en_cours", acheteur: "Marie Koné", vendeur: "Mode Yaoundé", commande: "#CMD-002", date: "2026-06-28", description: "Colis jamais reçu 2 semaines après la commande." },
  { id: 3, type: "paiement", statut: "resolu", acheteur: "Paul Mbeki", vendeur: "Tech Store", commande: "#CMD-003", date: "2026-06-20", description: "Remboursement demandé suite à annulation non effective." },
];

export default function Litiges() {
  const [litiges, setLitiges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("tous");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadLitiges();
  }, []);

  const loadLitiges = async () => {
    setLoading(true);
    try {
      const response = await api.get("litiges/");
      const data = Array.isArray(response.data) ? response.data : [];
      setLitiges(data.length ? data : DEMO_LITIGES);
    } catch {
      setLitiges(DEMO_LITIGES);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.patch(`litiges/${id}/`, { statut: "resolu" });
      loadLitiges();
    } catch {
      setLitiges((prev) => prev.map((l) => l.id === id ? { ...l, statut: "resolu" } : l));
    }
    setSelected(null);
  };

  const handleClose = async (id) => {
    try {
      await api.patch(`litiges/${id}/`, { statut: "ferme" });
      loadLitiges();
    } catch {
      setLitiges((prev) => prev.map((l) => l.id === id ? { ...l, statut: "ferme" } : l));
    }
    setSelected(null);
  };

  const filtered = litiges.filter((l) => {
    const matchSearch =
      !search ||
      String(l.acheteur || "").toLowerCase().includes(search.toLowerCase()) ||
      String(l.vendeur || "").toLowerCase().includes(search.toLowerCase()) ||
      String(l.commande || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "tous" || l.statut === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    tous: litiges.length,
    ouvert: litiges.filter((l) => l.statut === "ouvert").length,
    en_cours: litiges.filter((l) => l.statut === "en_cours").length,
    resolu: litiges.filter((l) => l.statut === "resolu").length,
    ferme: litiges.filter((l) => l.statut === "ferme").length,
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Litiges</h1>
          <p className="text-gray-500 mt-1">Gestion des litiges et signalements utilisateurs</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none text-sm w-48"
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["tous", "ouvert", "en_cours", "resolu", "ferme"].map((f) => {
          const labels = { tous: "Tous", ouvert: "Ouverts", en_cours: "En cours", resolu: "Résolus", ferme: "Fermés" };
          return (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
                filterStatus === f ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {labels[f]}
              <span className="ml-2 text-sm opacity-75">({counts[f] ?? 0})</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">Commande</th>
              <th className="text-left p-5">Acheteur</th>
              <th className="text-left p-5">Vendeur</th>
              <th className="text-left p-5">Type</th>
              <th className="text-left p-5">Statut</th>
              <th className="text-left p-5">Date</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-10 text-center text-gray-400">Chargement...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="7" className="p-10 text-center text-gray-400">Aucun litige trouvé.</td></tr>
            ) : (
              filtered.map((litige) => {
                const typeCfg = typeConfig[litige.type] || typeConfig.autre;
                const statusCfg = statusConfig[litige.statut] || statusConfig.ouvert;
                return (
                  <tr key={litige.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(litige)}>
                    <td className="p-5 font-semibold text-gray-950">{litige.commande || `#LIT-${litige.id}`}</td>
                    <td className="p-5 text-gray-700">{litige.acheteur || "—"}</td>
                    <td className="p-5 text-gray-700">{litige.vendeur || "—"}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeCfg.className}`}>{typeCfg.label}</span>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusCfg.className}`}>
                        {statusCfg.icon}
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="p-5 text-gray-500 text-sm">{litige.date || "—"}</td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {litige.statut !== "resolu" && litige.statut !== "ferme" && (
                          <>
                            <button onClick={() => handleResolve(litige.id)} className="px-3 py-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 text-sm font-medium">
                              Résoudre
                            </button>
                            <button onClick={() => handleClose(litige.id)} className="px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium">
                              Fermer
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal détail litige */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white w-[560px] max-w-[92vw] rounded-3xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-950 flex items-center gap-2">
                  <FaExclamationTriangle className="text-orange-500" />
                  Détail du litige
                </h2>
                <p className="text-gray-500 mt-1">{selected.commande}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Acheteur</p>
                  <p className="font-semibold text-gray-800">{selected.acheteur}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Vendeur</p>
                  <p className="font-semibold text-gray-800">{selected.vendeur}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-gray-700">{selected.description || "Aucune description."}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              {selected.statut !== "resolu" && selected.statut !== "ferme" && (
                <>
                  <button onClick={() => handleResolve(selected.id)} className="px-6 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600">Marquer résolu</button>
                  <button onClick={() => handleClose(selected.id)} className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">Fermer le litige</button>
                </>
              )}
              <button onClick={() => setSelected(null)} className="px-6 py-3 rounded-xl border font-medium text-gray-600 hover:bg-gray-50">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
