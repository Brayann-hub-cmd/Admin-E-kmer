import { useEffect, useState } from "react";
import { getProducts } from "../../services/products.service";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.titre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Produits Marketplace
          </h1>

          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl"
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Prix</th>
                <th className="p-3 text-left">Quantité</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Vendeur</th>
              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product.code}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">

                    <img
                      src={product.image}
                      alt={product.titre}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-3">
                    {product.titre}
                  </td>

                  <td className="p-3">
                    {product.prix?.toLocaleString()} FCFA
                  </td>

                  <td className="p-3">
                    {product.qte}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.statut === "Disponible"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.statut}
                    </span>

                  </td>

                  <td className="p-3">
                    {product.vendeur?.username}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}