export default function Orders() {
  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Commandes
        </h1>

        <p className="text-gray-500 mt-1">
          Gérez les commandes clients
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="space-y-5">

          <div className="flex justify-between items-center border-b pb-4">

            <div>
              <h3 className="font-bold">
                #ORD-2587
              </h3>

              <p className="text-gray-500">
                Fatou Ndiaye
              </p>
            </div>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
              Livrée
            </span>

          </div>

          <div className="flex justify-between items-center border-b pb-4">

            <div>
              <h3 className="font-bold">
                #ORD-2588
              </h3>

              <p className="text-gray-500">
                Moussa Diop
              </p>
            </div>

            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
              En attente
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
