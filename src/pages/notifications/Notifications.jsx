import Layout from "../../components/layout/Layout";

export default function Notifications() {

  const notifications = [
    {
      id: 1,
      title: "Nouvelle commande",
      message: "Commande #CMD-258 reçue",
      time: "Il y a 2 min",
    },

    {
      id: 2,
      title: "Nouvel utilisateur",
      message: "Un nouveau vendeur vient de s'inscrire",
      time: "Il y a 10 min",
    },

    {
      id: 3,
      title: "Produit publié",
      message: "iPhone 15 ajouté sur la marketplace",
      time: "Il y a 30 min",
    },
  ];

  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="text-gray-500 mt-2">
          Toutes les activités récentes de la plateforme
        </p>

      </div>

      <div className="space-y-4">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.message}
                </p>

              </div>

              <span className="text-sm text-gray-400">
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </Layout>
  );
}