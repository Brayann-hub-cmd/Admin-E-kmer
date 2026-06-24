import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaShoppingCart,
  FaStore,
  FaUsers,
  FaUserPlus,
  FaWallet,
} from "react-icons/fa";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDashboardStats } from "../../services/dashboard.service";

const statusClass = {
  Livrée: "bg-green-100 text-green-600",
  "En livraison": "bg-blue-100 text-blue-600",
  "En attente": "bg-orange-100 text-orange-600",
};

const activityIcon = {
  commande: {
    icon: <FaShoppingCart />,
    className: "bg-orange-100 text-orange-500",
  },
  boutique: {
    icon: <FaStore />,
    className: "bg-purple-100 text-purple-500",
  },
  utilisateur: {
    icon: <FaUserPlus />,
    className: "bg-green-100 text-green-500",
  },
};

const formatCurrency = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;

function DashboardCard({ icon, iconClass, value, label }) {
  return (
    <div className="bg-white rounded-2xl p-5 min-h-[180px] shadow-sm relative">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${iconClass}`}>
        {icon}
      </div>
      <h2 className="text-2xl font-semibold mt-7 text-gray-950">{value}</h2>
      <p className="text-gray-400 mt-3">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(setDashboard)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!dashboard) {
    return <div className="flex justify-center items-center h-[60vh] text-gray-500">Chargement...</div>;
  }

  const cards = [
    {
      label: "Volume des ventes",
      value: formatCurrency(dashboard.volumeVentes),
      icon: <FaWallet />,
      iconClass: "bg-orange-100 text-orange-500",
    },
    {
      label: "Commandes",
      value: Number(dashboard.nbCommandes).toLocaleString("fr-FR"),
      icon: <FaShoppingCart />,
      iconClass: "bg-purple-100 text-purple-500",
    },
    {
      label: "Utilisateurs actifs",
      value: Number(dashboard.utilisateursActifs).toLocaleString("fr-FR"),
      icon: <FaUsers />,
      iconClass: "bg-green-100 text-green-500",
    },
    {
      label: "Panier moyen",
      value: formatCurrency(dashboard.panierMoyen),
      icon: <FaChartPie />,
      iconClass: "bg-blue-100 text-blue-500",
    },
  ];

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <DashboardCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_0.95fr] gap-7">
        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[548px]">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="font-semibold text-xl text-gray-950">Activité de la marketplace</h2>
              <p className="text-gray-500 mt-2">Suivi global des transactions et échanges</p>
            </div>
            <select className="border border-gray-200 rounded-xl px-5 py-3 outline-none bg-white">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={385}>
            <AreaChart data={dashboard.activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#667085" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085" }}
                ticks={[0, 3500000, 7000000, 10500000, 14000000]}
                tickFormatter={(value) => `${value / 1000000 || 0}M`}
              />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                fill="url(#salesGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[548px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-semibold text-xl text-gray-950">Commandes récentes</h2>
            <Link to="/commandes" className="text-orange-500 font-semibold">
              Voir tout
            </Link>
          </div>

          <div className="space-y-7">
            {dashboard.commandesRecentes.map((order) => (
              <div key={order.id} className="flex justify-between gap-5">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-gray-500 mt-1">{order.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${statusClass[order.statut] || statusClass["En attente"]}`}>
                    {order.statut}
                  </span>
                </div>
              </div>
            ))}
            {!dashboard.commandesRecentes.length && (
              <p className="text-center text-gray-500 py-10">Aucune commande récente.</p>
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[472px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-semibold text-xl text-gray-950">Top produits</h2>
            <Link to="/produits" className="text-orange-500 font-semibold">
              Voir tout
            </Link>
          </div>
          <div className="space-y-7">
            {dashboard.topProduits.map((product) => (
              <div key={product.code} className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold">{product.titre}</p>
                  <p className="text-gray-500 mt-1">{product.ventes || product.qte || 0} ventes</p>
                </div>
                <p className="font-semibold whitespace-nowrap">{formatCurrency(product.total || product.prix)}</p>
              </div>
            ))}
            {!dashboard.topProduits.length && (
              <p className="text-center text-gray-500 py-10">Aucun produit à afficher.</p>
            )}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[472px]">
          <h2 className="font-semibold text-xl text-gray-950">Ventes par catégorie</h2>
          <p className="text-gray-500 mt-2">Répartition des ventes marketplace</p>
          {dashboard.ventesParCategorie.length ? (
            <>
              <div className="relative h-[280px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dashboard.ventesParCategorie} dataKey="value" innerRadius={72} outerRadius={112} paddingAngle={4}>
                      {dashboard.ventesParCategorie.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-semibold text-gray-900">100%</span>
                  <span className="text-gray-500">Total ventes</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-2">
                {dashboard.ventesParCategorie.map((category) => (
                  <div key={category.name} className="flex justify-between gap-3 text-gray-700">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      {category.name}
                    </span>
                    <strong>{category.value}%</strong>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-500">
              Aucune donnée catégorie.
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[472px]">
          <h2 className="font-semibold text-xl text-gray-950">Activités récentes</h2>
          <p className="text-gray-500 mt-2 mb-8">Dernières actions marketplace</p>
          <div className="space-y-7 max-h-[330px] overflow-y-auto pr-3">
            {dashboard.activitesRecentes.map((activity, index) => {
              const icon = activityIcon[activity.type] || activityIcon.utilisateur;
              return (
                <div key={`${activity.title}-${index}`} className="flex gap-4">
                  <span className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${icon.className}`}>
                    {icon.icon}
                  </span>
                  <div>
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-gray-500 mt-1">{activity.description}</p>
                    <p className="text-gray-400 text-sm mt-3">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            {!dashboard.activitesRecentes.length && (
              <p className="text-center text-gray-500 py-10">Aucune activité récente.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
