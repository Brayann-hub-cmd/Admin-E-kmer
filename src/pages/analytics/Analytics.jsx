import Layout from "../../components/layout/Layout";

export default function Analytics() {
  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Statistiques Avancées 
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500 text-sm">
            Revenus plateforme
          </h2>

          <p className="text-3xl font-bold mt-3 text-green-500">
            12.5M FCFA
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500 text-sm">
            Transactions
          </h2>

          <p className="text-3xl font-bold mt-3 text-blue-500">
            2,540
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500 text-sm">
            Utilisateurs actifs
          </h2>

          <p className="text-3xl font-bold mt-3 text-green-500">
            8,420
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-gray-500 text-sm">
            Croissance
          </h2>

          <p className="text-3xl font-bold mt-3 text-orange-500">
            +18%
          </p>

        </div>

      </div>

    </Layout>
  );
}