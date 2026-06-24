import { useEffect, useMemo, useState } from "react";
import { getSales } from "../../services/sales.service";
import { getUsers } from "../../services/users.service";

const formatCurrency = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;

const getStatusStyle = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("livr") || value.includes("confirm") || value.includes("pay")) {
    return "bg-green-100 text-green-700";
  }
  if (value.includes("cours") || value.includes("attente")) return "bg-blue-100 text-blue-700";
  if (value.includes("annul")) return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};

const extractRows = (sales) =>
  sales.flatMap((sale) => {
    const lines = sale.lignes?.length ? sale.lignes : [{}];

    return lines.map((line, index) => {
      const amount = Number(line.prix_unitaire || 0) * (Number(line.quantite) || 1) || Number(sale.prix_total || 0);

      return {
        id: `${sale.code}-${index}`,
        product: line.annonce_titre || "Produit",
        seller: line.annonce_vendeur || "-",
        amount,
        commission: Math.round(amount * 0.05),
        status: sale.statut || "En attente",
      };
    });
  });

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([getSales(), getUsers()])
      .then(([salesData, usersData]) => {
        setSales(salesData);
        setUsers(usersData);
      })
      .catch((error) => {
        console.error(error);
        setSales([]);
        setUsers([]);
      });
  }, []);

  const rows = useMemo(() => extractRows(sales), [sales]);
  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.prix_total || 0), 0);
  const totalCommission = Math.round(totalSales * 0.05);
  const activeSellers = users.filter((user) => {
    const role = String(user.role || "").toLowerCase();
    return user.is_active !== false && (role.includes("vendeur") || role.includes("seller") || role.includes("boutique"));
  }).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-950">Ventes</h1>
        <p className="text-gray-500 mt-1">Activité des vendeurs et commissions plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500">Total ventes</p>
          <h2 className="text-2xl font-semibold mt-3 text-gray-950">{formatCurrency(totalSales)}</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500">Revenus commissions</p>
          <h2 className="text-2xl font-semibold mt-3 text-gray-950">{formatCurrency(totalCommission)}</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500">Vendeurs actifs</p>
          <h2 className="text-2xl font-semibold mt-3 text-gray-950">{activeSellers}</h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Produit</th>
              <th className="p-4 text-left">Vendeur</th>
              <th className="p-4 text-left">Montant</th>
              <th className="p-4 text-left">Commission</th>
              <th className="p-4 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="p-4">{sale.product}</td>
                <td className="p-4">{sale.seller}</td>
                <td className="p-4 font-semibold">{formatCurrency(sale.amount)}</td>
                <td className="p-4 text-green-600 font-semibold">{formatCurrency(sale.commission)}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(sale.status)}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  Aucune vente trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
