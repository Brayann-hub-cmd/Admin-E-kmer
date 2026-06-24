import { useEffect, useMemo, useState } from "react";
import { FaBan, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { getCategories, getSubCategories } from "../../services/categories.service";
import { deleteProduct, getProducts, updateProductStatus } from "../../services/products.service";

const API_ROOT = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const resolveImage = (image) => {
  if (!image) return "";
  if (String(image).startsWith("http")) return image;
  return `${API_ROOT}${String(image).startsWith("/") ? image : `/${image}`}`;
};

const normalizeStatus = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("suspend") || value.includes("bloqu")) return "Suspendu";
  return "Actif";
};

const statusClass = {
  Actif: "bg-green-100 text-green-700",
  Suspendu: "bg-red-100 text-red-700",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const [productsData, categoriesData, subCategoriesData] = await Promise.all([
        getProducts(),
        getCategories().catch(() => []),
        getSubCategories().catch(() => []),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setSubCategories(subCategoriesData);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const categoryBySubCategory = useMemo(() => {
    const categoriesByCode = new Map(categories.map((category) => [category.code, category.nom]));
    return new Map(
      subCategories.map((subCategory) => [
        subCategory.code,
        categoriesByCode.get(subCategory.categorie) || subCategory.nom,
      ])
    );
  }, [categories, subCategories]);

  const filteredProducts = products.filter((product) => {
    const currentStatus = normalizeStatus(product.statut);
    const matchesStatus = status === "all" || currentStatus === status;
    const matchesSearch = product.titre?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSuspend = async (product) => {
    const nextStatus = normalizeStatus(product.statut) === "Actif" ? "Suspendu" : "Disponible";
    try {
      await updateProductStatus(product.code, { statut: nextStatus });
      loadProducts();
    } catch (error) {
      console.error(error);
      setProducts((current) =>
        current.map((item) => (item.code === product.code ? { ...item, statut: nextStatus } : item))
      );
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await deleteProduct(product.code);
      loadProducts();
    } catch (error) {
      console.error(error);
      setProducts((current) => current.filter((item) => item.code !== product.code));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Produits</h1>
          <p className="text-gray-500 mt-1">Supervision des produits</p>
        </div>

        <div className="flex gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 w-[315px] shadow-sm">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="outline-none w-full text-gray-600"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="bg-white border border-gray-200 rounded-2xl px-5 py-3 outline-none shadow-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="Suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-5 text-left">Produit</th>
              <th className="p-5 text-left">Vendeur</th>
              <th className="p-5 text-left">Catégorie</th>
              <th className="p-5 text-left">Prix</th>
              <th className="p-5 text-left">Stock</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              const productStatus = normalizeStatus(product.statut);
              const categoryLabel =
                product.categorieLabel ||
                categoryBySubCategory.get(product.sous_categorie) ||
                product.sous_categorie?.nom ||
                "-";

              return (
                <tr key={product.code} className="border-b border-gray-200 last:border-b-0">
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
                        {product.image ? (
                          <img src={resolveImage(product.image)} alt={product.titre} className="w-full h-full object-cover" />
                        ) : (
                          product.titre?.slice(0, 2)
                        )}
                      </div>
                      <span className="font-semibold text-gray-950">{product.titre}</span>
                    </div>
                  </td>
                  <td className="p-5">{product.vendeur?.username || "Vendeur"}</td>
                  <td className="p-5">{categoryLabel}</td>
                  <td className="p-5 font-medium">{Number(product.prix || 0).toLocaleString("fr-FR")} FCFA</td>
                  <td className="p-5">{product.qte || 0}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusClass[productStatus]}`}>
                      {productStatus}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex gap-4">
                      <button className="w-11 h-11 rounded-xl bg-blue-100 text-blue-500 inline-flex items-center justify-center" title="Voir">
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleSuspend(product)}
                        className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 inline-flex items-center justify-center"
                        title="Bloquer"
                      >
                        <FaBan />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="w-11 h-11 rounded-xl bg-red-100 text-red-500 inline-flex items-center justify-center"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!filteredProducts.length && (
              <tr>
                <td colSpan="7" className="p-10 text-center text-gray-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
