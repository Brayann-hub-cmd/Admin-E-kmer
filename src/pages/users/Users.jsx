import Layout from "../../components/layout/Layout";

export default function Users() {

  const users = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Vendeur",
      status: "Actif",
    },

    {
      id: 2,
      name: "Fatou Ndiaye",
      role: "Acheteur",
      status: "Actif",
    },

    {
      id: 3,
      name: "TechStore",
      role: "Boutique",
      status: "Suspendu",
    },
  ];

  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Utilisateurs
        </h1>

        <p className="text-gray-500 mt-2">
          Gestion des utlisateurs 
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-4">
                Nom
              </th>

              <th className="text-left p-4">
                Rôle
              </th>

              <th className="text-left p-4">
                Statut
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

                    {user.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}
