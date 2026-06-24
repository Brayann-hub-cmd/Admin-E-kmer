import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MarketplaceActivityChart({ data = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-950">Activité de la marketplace</h2>
          <p className="text-gray-500 text-sm mt-1">Suivi global des transactions et échanges</p>
        </div>
        <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>12 derniers mois</option>
        </select>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 13, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(value) => `${value / 1000000}M`}
              tick={{ fontSize: 13, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`}
              contentStyle={{ borderRadius: "14px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            />
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
