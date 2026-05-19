const orders = [
  {
    id: "#ORD-2587",
    client: "Fatou Ndiaye",
    amount: "85,000 FCFA",
    status: "Livrée",
    color: "bg-green-100 text-green-600",
  },

  {
    id: "#ORD-2586",
    client: "Moussa Diop",
    amount: "45,500 FCFA",
    status: "En livraison",
    color: "bg-blue-100 text-blue-600",
  },

  {
    id: "#ORD-2585",
    client: "Awa Sy",
    amount: "120,000 FCFA",
    status: "En attente",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full xl:w-[420px]">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Commandes récentes
        </h2>

        <button className="text-orange-500 font-medium">
          Voir tout
        </button>
      </div>

      <div className="space-y-5">

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">
                {order.id}
              </h3>

              <p className="text-gray-500 text-sm">
                {order.client}
              </p>
            </div>

            <div className="text-right">
              <h3 className="font-semibold">
                {order.amount}
              </h3>

              <span
                className={`text-xs px-3 py-1 rounded-full ${order.color}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}