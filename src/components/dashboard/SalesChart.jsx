import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "12 Mai",
    ventes: 4500000,
  },

  {
    name: "13 Mai",
    ventes: 3700000,
  },

  {
    name: "14 Mai",
    ventes: 7600000,
  },

  {
    name: "15 Mai",
    ventes: 11500000,
  },

  {
    name: "16 Mai",
    ventes: 6700000,
  },

  {
    name: "17 Mai",
    ventes: 10200000,
  },

  {
    name: "18 Mai",
    ventes: 12100000,
  },
];

export default function SalesChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Vue d'ensemble des ventes
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Performance globale marketplace
          </p>

        </div>

        <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none">

          <option>
            7 derniers jours
          </option>

          <option>
            30 derniers jours
          </option>

          <option>
            12 derniers mois
          </option>

        </select>

      </div>

      {/* CHART */}
      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            {/* GRILLE */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* AXE X */}
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 13,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* AXE Y */}
            <YAxis
              tickFormatter={(value) => `${value / 1000000}M`}
              tick={{
                fontSize: 13,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip
              formatter={(value) =>
                `${value.toLocaleString()} FCFA`
              }
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            />

            {/* COURBE */}
            <Area
              type="monotone"
              dataKey="ventes"
              stroke="#f97316"
              strokeWidth={3}
              fill="url(#colorSales)"
            />

            {/* GRADIENT */}
            <defs>

              <linearGradient
                id="colorSales"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#f97316"
                  stopOpacity={0.25}
                />

                <stop
                  offset="95%"
                  stopColor="#f97316"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}