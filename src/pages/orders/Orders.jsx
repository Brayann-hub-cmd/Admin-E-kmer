import { useEffect, useState } from "react";
import { getSales } from "../../services/sales.service";

const normalizeStatus = (status) => {
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

  useEffect(() => {
    getSales()
      .then(setOrders)
      .catch((error) => {
        console.error(error);
        setOrders([]);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-950">Commandes</h1>
        <p className="text-gray-500 mt-1">Gérez les commandes clients</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm px-7 py-6">
        {orders.length ? (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => {
              const status = normalizeStatus(order.statut || order.status);
              return (
                <div key={order.code} className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-gray-950">{order.code}</p>
                    <p className="text-gray-500 mt-1">{order.acheteur_nom || "Client"}</p>
                  </div>
                  <span className={`px-5 py-3 rounded-full text-sm ${statusClass[status]}`}>{status}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500">Aucune commande trouvée.</p>
        )}
      </div>
    </div>
  );
}
