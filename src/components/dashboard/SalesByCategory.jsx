import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "react-router-dom";

export default function SalesByCategory({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[420px] flex flex-col">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-gray-950">Ventes par catégorie</h2>
        <p className="text-gray-500 text-sm mt-1">Répartition des ventes marketplace</p>
      </div>

      {data.length ? (
        <>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold text-gray-900">100%</span>
              <span className="text-sm text-gray-500">Total ventes</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-2">
            {data.map((item) => (
              <Link to="/categories" key={item.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">Aucune donnée catégorie.</div>
      )}
    </div>
  );
}
