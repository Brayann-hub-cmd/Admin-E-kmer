import { FaArrowTrendUp } from "react-icons/fa6";

export default function StatCard({ icon, title, value, growth, bgColor, iconColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
      
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${bgColor}`}>
          <span className={iconColor}>{icon}</span>
        </div>

        {/* Flèche zigzag + pourcentage */}
        <span className="text-green-500 text-lg font-semibold flex items-center gap-1">
          <FaArrowTrendUp />
          {growth}
        </span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-gray-400 text-sm mt-0.5">{title}</p>
      </div>

    </div>
  );
}