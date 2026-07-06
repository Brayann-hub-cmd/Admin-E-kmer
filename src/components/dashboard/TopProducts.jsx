import { Link } from "react-router-dom";

const formatCurrency = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;

export default function TopProducts({ products = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-950">Top produits</h2>
        <Link to="/produits" className="text-orange-500 font-medium">
          Voir tout
        </Link>
      </div>

      <div className="space-y-5">
        {products.map((product) => (
          <div key={product.code || product.titre} className="flex justify-between items-center gap-4">
            <div>
              <h3 className="font-medium text-gray-950">{product.titre}</h3>
              <p className="text-sm text-gray-500">{product.ventes || 0} ventes</p>
            </div>
            <h3 className="font-medium whitespace-nowrap">{formatCurrency(product.total || product.prix)}</h3>
          </div>
        ))}
        {!products.length && <p className="text-center text-gray-500 py-8">Aucun produit à afficher.</p>}
      </div>
    </div>
  );
}
