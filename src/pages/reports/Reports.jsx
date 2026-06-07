import {
  FaExclamationTriangle,
  FaTrash,
  FaBan,
} from "react-icons/fa";

export default function Reports() {

  const reports = [
    {
      id: 1,
      product: "iPhone 15",
      seller: "TechStore",
      reason: "Produit frauduleux",
      status: "En attente",
    },

    {
      id: 2,
      product: "MacBook Pro",
      seller: "Apple Center",
      reason: "Fausses images",
      status: "Traité",
    },
  ];

  const getStatusStyle = (status) => {

    switch (status) {

      case "Traité":
        return "bg-green-100 text-green-700";

      case "En attente":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Signalements
        </h1>

        <p className="text-gray-500 mt-2">
          Gestion des abus et fraudes marketplace
        </p>

      </div>

      <div className="space-y-5">

        {reports.map((report) => (

          <div
            key={report.id}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <FaExclamationTriangle className="text-red-500 text-xl" />

                  <h3 className="text-xl font-semibold">
                    {report.product}
                  </h3>

                </div>

                <p className="text-gray-500 mt-3">
                  Vendeur : {report.seller}
                </p>

                <p className="text-gray-500">
                  Motif : {report.reason}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                  report.status
                )}`}
              >

                {report.status}

              </span>

            </div>

            <div className="flex gap-4 mt-6">

              <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl transition flex items-center gap-2">

                <FaTrash />

                Supprimer produit

              </button>

              <button className="bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-2xl transition flex items-center gap-2">

                <FaBan />

                Suspendre vendeur

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}