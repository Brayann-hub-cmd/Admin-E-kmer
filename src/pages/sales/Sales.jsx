export default function Sales() {

  const sales = [
    {
      id: 1,
      product: "iPhone 15 Pro",
      seller: "TechStore",
      amount: "850 000 FCFA",
      commission: "42 500 FCFA",
      status: "Livré",
    },

    {
      id: 2,
      product: "MacBook Air",
      seller: "Apple Shop",
      amount: "1 200 000 FCFA",
      commission: "60 000 FCFA",
      status: "En cours",
    },
  ];

  const getStatusStyle = (status) => {

  switch (status) {

    case "Livré":
      return "bg-green-100 text-green-700";

    case "En cours":
      return "bg-blue-100 text-blue-700";

    case "Annulé":
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
          Ventes
        </h1>

        <p className="text-gray-500 mt-2">
          Activité des vendeurs et commissions plateforme
        </p>

      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-gray-500">
            Total ventes
          </p>

          <h2 className="text-3xl font-bold mt-3">
            25.4M FCFA
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-gray-500">
            Revenus commissions
          </p>

          <h2 className="text-3xl font-bold mt-3">
            1.2M FCFA
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-gray-500">
            Vendeurs actifs
          </p>

          <h2 className="text-3xl font-bold mt-3">
            248
          </h2>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Produit
              </th>

              <th className="p-4 text-left">
                Vendeur
              </th>

              <th className="p-4 text-left">
                Montant
              </th>

              <th className="p-4 text-left">
                Commission
              </th>

              <th className="p-4 text-left">
                Statut
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale.id}
                className="border-t"
              >

                <td className="p-4">
                  {sale.product}
                </td>

                <td className="p-4">
                  {sale.seller}
                </td>

                <td className="p-4 font-semibold">
                  {sale.amount}
                </td>

                <td className="p-4 text-green-600 font-semibold">
                  {sale.commission}
                </td>

                <td className="p-4">

                  <span
   className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
    sale.status
  )}`}
>

  {sale.status}

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