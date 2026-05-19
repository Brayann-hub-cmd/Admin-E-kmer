import {
  FaShoppingCart,
  FaStore,
  FaUserPlus,
  FaBoxOpen,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaShoppingCart />,
    color: "bg-orange-100 text-orange-500",
    title: "Nouvelle commande",
    description: "Commande #ORD-2587 validée",
    time: "Il y a 2 min",
  },

  {
    id: 2,
    icon: <FaStore />,
    color: "bg-purple-100 text-purple-500",
    title: "Nouvelle boutique",
    description: "TechStore a rejoint la marketplace",
    time: "Il y a 10 min",
  },

  {
    id: 3,
    icon: <FaUserPlus />,
    color: "bg-green-100 text-green-500",
    title: "Nouvel utilisateur",
    description: "Fatou Ndiaye vient de créer un compte",
    time: "Il y a 25 min",
  },

  {
    id: 4,
    icon: <FaBoxOpen />,
    color: "bg-blue-100 text-blue-500",
    title: "Produit publié",
    description: "iPhone 15 ajouté par MobileShop",
    time: "Il y a 40 min",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[420px]">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Activités récentes
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Dernières actions marketplace
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="flex items-start gap-4"
          >

            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-sm">
                {activity.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {activity.description}
              </p>

              <span className="text-xs text-gray-400 mt-2 block">
                {activity.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}