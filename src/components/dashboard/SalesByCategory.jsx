import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Électronique", value: 35 },
  { name: "Mode", value: 27 },
  { name: "Maison", value: 20 },
  { name: "Beauté", value: 18 },
];

const COLORS = [
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#3b82f6",
];

export default function SalesByCategory() {

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-[420px] flex flex-col">

      {/* HEADER */}
      <div className="mb-2">

        <h2 className="text-xl font-bold text-gray-900">
          Ventes par catégorie
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Répartition des ventes marketplace
        </p>

      </div>

      {/* CHART */}
      <div className="flex-1 flex items-center justify-center relative">

        <ResponsiveContainer width="100%" height={250}>

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="absolute flex flex-col items-center justify-center">

          <span className="text-3xl font-bold text-gray-900">
            100%
          </span>

          <span className="text-sm text-gray-500">
            Total ventes
          </span>

        </div>

      </div>

      {/* LEGEND */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-2">

        {data.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-2">

              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm text-gray-700">
                {item.name}
              </span>

            </div>

            <span className="text-sm font-semibold text-gray-900">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}