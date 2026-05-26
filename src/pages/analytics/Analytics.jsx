import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Fev", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Avr", sales: 7000 },
    { month: "Mai", sales: 6000 },
  ];

  const categoryData = [
    { name: "Électronique", value: 40 },
    { name: "Mode", value: 25 },
    { name: "Maison", value: 20 },
    { name: "Beauté", value: 15 },
  ];

  const vendorData = [
    { vendor: "TechStore", sales: 120 },
    { vendor: "SneakerShop", sales: 90 },
    { vendor: "Apple Center", sales: 70 },
  ];

  const COLORS = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#eab308",
  ];

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Analyse des performances marketplace
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Revenus plateforme
          </p>

          <h2 className="text-3xl font-bold mt-3">
            12.5M FCFA
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Utilisateurs actifs
          </p>

          <h2 className="text-3xl font-bold mt-3">
            4 230
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Produits actifs
          </p>

          <h2 className="text-3xl font-bold mt-3">
            12 400
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Taux conversion
          </p>

          <h2 className="text-3xl font-bold mt-3">
            78%
          </h2>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* LINE CHART */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Croissance des ventes
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={salesData}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#f97316"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* PIE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Ventes par catégorie
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {categoryData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP VENDEURS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">
          Top vendeurs
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={vendorData}>

            <XAxis dataKey="vendor" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#f97316"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}