const statusConfig = {
  livre:   { label: "Livre",    className: "bg-green-100 text-green-600" },
  expedie: { label: "Expédié",  className: "bg-blue-100  text-blue-500"  },
  encours: { label: "En cours", className: "bg-yellow-100 text-yellow-600" },
  annule:  { label: "Annulé",   className: "bg-red-50 text-red-500"      },
};

export default function OrderItem({ id, name, price, status }) {
  const { label, className } = statusConfig[status] || {};
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4">
      {/* Gauche : ID + Nom */}
      <div>
        <p className="font-semibold text-gray-800">{id}</p>
        <p className="text-gray-400 text-sm mt-0.5">{name}</p>
      </div>
      {/* Droite : Prix + Badge */}
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-orange-500 font-semibold">{price}</span>
        <span className={`text-xs font-medium px-3 py-0.5 rounded-full ${className}`}>
          {label}
        </span>
      </div>
    </div>
  );
}   
