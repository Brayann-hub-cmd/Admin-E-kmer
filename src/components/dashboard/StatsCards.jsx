import {
  FaWallet,
  FaShoppingCart,
  FaUsers,
  FaChartPie,
} from "react-icons/fa";

import StatCard from "../ui/StatCard";

const stats = [
  {
    title: "Volume des ventes",
    value: "12,580,000 FCFA",
    growth: "+18.5%",
    icon: <FaWallet />,
    color: "bg-orange-100 text-orange-500",
  },

  {
    title: "Commandes",
    value: "320",
    growth: "+12.5%",
    icon: <FaShoppingCart />,
    color: "bg-purple-100 text-purple-500",
  },

  {
    title: "Utilisateurs actifs",
    value: "2,845",
    growth: "+8.3%",
    icon: <FaUsers />,
    color: "bg-green-100 text-green-500",
  },

  {
    title: "Panier moyen",
    value: "48,500 FCFA",
    growth: "+5.7%",
    icon: <FaChartPie />,
    color: "bg-blue-100 text-blue-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

      {stats.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          growth={item.growth}
          icon={item.icon}
          color={item.color}
        />
      ))}

    </div>
  );
}