import { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { getSales, getSaleDetails } from "../../services/sales.service";

const normalizeStatus = (status) => {
  // Harmonise les statuts de vente pour l'affichage des commandes.
  const value = String(status || "").toLowerCase();
  if (value.includes("livr") || value.includes("confirm") || value.includes("pay")) return "Livrée";
  if (value.includes("cours") || value.includes("livraison")) return "En livraison";
  return "En attente";
};

const statusClass = {
  Livrée: "bg-green-100 text-green-700",
  "En livraison": "bg-blue-100 text-blue-700",
  "En attente": "bg-orange-100 text-orange-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    // Les commandes admin sont actuellement representees par les ventes backend.
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getSales();
      setOrders(data);
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  const openOrderDetails = async (order) => {
    setSelectedOrder(order);
    setLoadingDetails(true);
    setOrderDetails(null);
    try {
      // Appel à l'API pour obtenir les détails (y compris les lignes de vente)
      const details = await getSaleDetails(order.code);
      setOrderDetails(details);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la commande", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  const handleUpdateStatus = () => {
    alert("Le changement de statut n'est pas encore géré par le backend actuel.");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-950">Commandes</h1>
        <p className="text-gray-500 mt-1">Gérez les commandes clients</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">N° Commande</th>
              <th className="text-left p-5">Client</th>
              <th className="text-left p-5">Total</th>
              <th className="text-left p-5">Statut</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((order) => {
                const status = normalizeStatus(order.statut || order.status);
                return (
                  <tr key={order.code} className="border-b border-gray-200 last:border-b-0">
                    <td className="p-5 font-semibold text-gray-950">{order.code}</td>
                    <td className="p-5 text-gray-700">{order.acheteur_nom || "Client"}</td>
                    <td className="p-5 font-medium">{Number(order.prix_total || order.total || 0).toLocaleString("fr-FR")} FCFA</td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusClass[status]}`}>{status}</span>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 inline-flex items-center justify-center hover:bg-blue-100 transition-colors"
                        title="Voir les détails"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-500">Aucune commande trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modale de détails de la commande */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-[700px] max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-950">
                  Détails de la commande {selectedOrder.code}
                </h2>
                <p className="text-gray-500 mt-1">Client : {selectedOrder.acheteur_nom || "Non renseigné"}</p>
              </div>
              <button 
                onClick={closeOrderDetails}
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {loadingDetails ? (
                <div className="py-10 text-center text-gray-500">Chargement des détails...</div>
              ) : orderDetails ? (
                <div className="space-y-6">
                  {/* Informations Générales */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date</p>
                      <p className="font-medium text-gray-900">
                        {orderDetails.created_at ? new Date(orderDetails.created_at).toLocaleString('fr-FR') : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mode de paiement</p>
                      <p className="font-medium text-gray-900">{orderDetails.mode_paiement || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Statut actuel</p>
                      <p className="font-medium text-gray-900">{normalizeStatus(orderDetails.statut)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total</p>
                      <p className="font-medium text-gray-900 text-lg text-orange-600">
                        {Number(orderDetails.prix_total || 0).toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                  </div>

                  {/* Lignes de commande */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Articles commandés</h3>
                    {orderDetails.lignes && orderDetails.lignes.length > 0 ? (
                      <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100">
                        {orderDetails.lignes.map((ligne, i) => (
                          <div key={i} className="p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{ligne.annonce_titre || ligne.titre || `Article #${ligne.annonce}`}</p>
                              <p className="text-sm text-gray-500">Prix unitaire : {Number(ligne.prix_unitaire || 0).toLocaleString("fr-FR")} FCFA</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">x{ligne.quantite}</p>
                              <p className="text-sm font-medium text-orange-500 mt-1">
                                {Number((ligne.prix_unitaire || 0) * (ligne.quantite || 1)).toLocaleString("fr-FR")} FCFA
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Aucun article trouvé pour cette commande.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-red-500">Impossible de charger les détails.</div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
              <button onClick={handleUpdateStatus} className="px-6 py-3 rounded-xl border border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50">
                Annuler la commande
              </button>
              <button onClick={handleUpdateStatus} className="px-6 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600">
                Marquer comme livrée
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
