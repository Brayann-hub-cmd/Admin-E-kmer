import {
  FaBell,
  FaCheckCircle,
  FaBox,
  FaStore,
  FaExclamationTriangle,
  FaTrash,
} from "react-icons/fa";

export default function Notifications() {

  const notifications = [
    {
      id: 1,
      type: "product",
      title: "Nouveau produit publié",
      message: "iPhone 15 Pro a été ajouté",
      time: "Il y a 2 min",
      unread: true,
    },

    {
      id: 2,
      type: "seller",
      title: "Nouveau vendeur",
      message: "TechStore vient de rejoindre la plateforme",
      time: "Il y a 10 min",
      unread: true,
    },

    {
      id: 3,
      type: "report",
      title: "Produit signalé",
      message: "Produit suspect signalé par un utilisateur",
      time: "Il y a 1h",
      unread: false,
    },
  ];

  const getIcon = (type) => {

    switch (type) {

      case "product":
        return <FaBox className="text-blue-500" />;

      case "seller":
        return <FaStore className="text-green-500" />;

      case "report":
        return <FaExclamationTriangle className="text-red-500" />;

      default:
        return <FaBell />;
    }
  };

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Activités récentes de la marketplace
          </p>

        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl transition">

          Tout marquer comme lu

        </button>

      </div>

      <div className="space-y-5">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className={`bg-white rounded-3xl p-5 shadow-sm border transition hover:shadow-md ${
              notification.unread
                ? "border-orange-300"
                : "border-transparent"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl">

                  {getIcon(notification.type)}

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold text-lg">
                      {notification.title}
                    </h3>

                    {notification.unread && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}

                  </div>

                  <p className="text-gray-600 mt-1">
                    {notification.message}
                  </p>

                  <span className="text-sm text-gray-400 mt-2 block">
                    {notification.time}
                  </span>

                </div>

              </div>

              <button className="text-gray-400 hover:text-red-500 transition">

                <FaTrash />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}