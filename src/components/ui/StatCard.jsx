export default function StatCard({
  title,
  value,
  growth,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">

      <div className="flex justify-between items-start">

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}
        >
          {icon}
        </div>

        <span className="text-green-500 font-semibold text-xl">
          {growth}
        </span>
      </div>

      <h3 className="text-2xl font-semibold mt-6">
        {value}
      </h3>

      <p className="text-gray-400 mt-2">
        {title}
      </p>
    </div>
  );
}