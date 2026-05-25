export default function Purchases() {

  const purchases = [
    {
      id: 1,
      buyer: "Jean Dupont",
      product: "PlayStation 5",
      amount: "450 000 FCFA",
      payment: "Orange Money",
      status: "Payé",
    },

    {
      id: 2,
      buyer: "Fatou Ndiaye",
      product: "Samsung S24",
      amount: "650 000 FCFA",
      payment: "MTN MoMo",
      status: "En attente",
    },
  ];

  const getStatusStyle = (status) => {

  switch (status) {

    case "Payé":
      return "bg-green-100 text-green-700";

    case "En attente":
      return "bg-yellow-100 text-yellow-700";

    case "Échoué":
      return "bg-red-100 text-red-700";

    case "Remboursé":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Achats
        </h1>

        <p className="text-gray-500 mt-2">
          Historique des achats effectués sur la plateforme
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Acheteur
              </th>

              <th className="p-4 text-left">
                Produit
              </th>

              <th className="p-4 text-left">
                Montant
              </th>

              <th className="p-4 text-left">
                Paiement
              </th>

              <th className="p-4 text-left">
                Statut
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.map((purchase) => (

              <tr
                key={purchase.id}
                className="border-t"
              >

                <td className="p-4">
                  {purchase.buyer}
                </td>

                <td className="p-4">
                  {purchase.product}
                </td>

                <td className="p-4 font-semibold">
                  {purchase.amount}
                </td>

                <td className="p-4">
                  {purchase.payment}
                </td>

                <td className="p-4">

                 <span
                 className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                  purchase.status
                   )}`} >

  {purchase.status}

</span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}