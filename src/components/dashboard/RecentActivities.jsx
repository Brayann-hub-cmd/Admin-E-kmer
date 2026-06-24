import { Link } from "react-router-dom";
import { FaBoxOpen, FaShoppingCart, FaStore, FaUserPlus } from "react-icons/fa";

const iconByType = {
  commande: { icon: <FaShoppingCart />, color: "bg-orange-100 text-orange-500" },
  boutique: { icon: <FaStore />, color: "bg-purple-100 text-purple-500" },
  utilisateur: { icon: <FaUserPlus />, color: "bg-green-100 text-green-500" },
  produit: { icon: <FaBoxOpen />, color: "bg-blue-100 text-blue-500" },
};

export default function RecentActivities({ activities = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[420px] flex flex-col overflow-hidden">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-950">Activités récentes</h2>
        <p className="text-gray-500 text-sm mt-1">Dernières actions marketplace</p>
      </div>

      <div className="space-y-5 overflow-y-auto pr-2 flex-1">
        {activities.map((activity, index) => {
          const icon = iconByType[activity.type] || iconByType.produit;
          return (
            <Link
              to={activity.link || "/admin"}
              key={`${activity.title}-${index}`}
              className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${icon.color}`}>
                {icon.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-950">{activity.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{activity.description}</p>
                <span className="text-xs text-gray-400 mt-2 block">{activity.time}</span>
              </div>
            </Link>
          );
        })}
        {!activities.length && <p className="text-center text-gray-500 py-8">Aucune activité récente.</p>}
      </div>
    </div>
  );
}
