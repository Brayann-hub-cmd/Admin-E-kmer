import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getSales } from "../../services/sales.service";

const statusClass = {
  Payé: "bg-green-100 text-green-700",
  "En attente": "bg-yellow-100 text-yellow-700",
};

const toRows = (sales) =>
  // Deplie les ventes en lignes d'achat produit par produit.
  sales.flatMap((sale) => {
    const lines = sale.lignes?.length ? sale.lignes : [{}];

    return lines.map((line, index) => ({
      id: `${sale.code}-${index}`,
      buyer: sale.acheteur_nom || "Client",
      product: line.annonce_titre || "Produit",
      amount: `${Number(sale.prix_total || 0).toLocaleString("fr-FR")} FCFA`,
      payment: sale.mode_paiement || "-",
      status: String(sale.statut || "").toLowerCase().includes("pay") ? "Payé" : "En attente",
    }));
  });

export default function Purchases() {
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Recupere les ventes pour afficher l'historique des achats plateforme.
    getSales()
      .then((sales) => setPurchases(toRows(sales)))
      .catch((error) => {
        console.error(error);
        setPurchases([]);
      });
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-950">{t('purchases.title')}</h1>
        <p className="text-gray-500 mt-1">{t('purchases.subtitle')}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-5 text-left">{t('purchases.buyer')}</th>
              <th className="p-5 text-left">{t('purchases.product')}</th>
              <th className="p-5 text-left">{t('purchases.amount')}</th>
              <th className="p-5 text-left">{t('purchases.payment')}</th>
              <th className="p-5 text-left">{t('purchases.statut')}</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b border-gray-200 last:border-b-0">
                <td className="p-5">{purchase.buyer}</td>
                <td className="p-5">{purchase.product}</td>
                <td className="p-5 font-medium">{purchase.amount}</td>
                <td className="p-5">{purchase.payment}</td>
                <td className="p-5">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusClass[purchase.status]}`}>
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
            {!purchases.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  {t('purchases.noPurchases')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
