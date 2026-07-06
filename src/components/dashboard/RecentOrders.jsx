import { Link } from "react-router-dom";

const statusClass = {
  Livrée: "bg-green-100 text-green-600",
  "En livraison": "bg-blue-100 text-blue-600",
  "En attente": "bg-orange-100 text-orange-600",
};

export default function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full xl:w-[420px]">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-950">Commandes récentes</h2>
        <Link to="/commandes" className="text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors">
          Voir tout
        </Link>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-950">{order.id}</h3>
              <p className="text-gray-500 text-sm">{order.client}</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{order.total}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${statusClass[order.statut] || statusClass["En attente"]}`}>
                {order.statut}
              </span>
            </div>
          </div>
        ))}
        {!orders.length && <p className="text-center text-gray-500 py-8">Aucune commande récente.</p>}
      </div>
    </div>
  );
}
