import { useEffect, useMemo, useState } from "react";
import { FaBan, FaEye, FaSearch, FaTrash, FaTimes, FaMapMarkerAlt, FaUserAlt, FaTags, FaBoxOpen } from "react-icons/fa";
import { getCategories, getSubCategories } from "../../services/categories.service";
import { deleteProduct, getProducts, updateProductStatus } from "../../services/products.service";
import { useTranslation } from 'react-i18next';

const API_ROOT = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const resolveImage = (image) => {
  // Le backend peut renvoyer une URL absolue ou un chemin media relatif.
  if (!image) return "";
  if (String(image).startsWith("http")) return image;
  return `${API_ROOT}${String(image).startsWith("/") ? image : `/${image}`}`;
};

const normalizeStatus = (status) => {
  // Uniformise les differents libelles backend en deux statuts admin.
  const value = String(status || "").toLowerCase();
  if (value.includes("suspend") || value.includes("bloqu")) return "Suspendu";
  return "Actif";
};

const statusClass = {
  Actif: "bg-green-100 text-green-700",
  Suspendu: "bg-red-100 text-red-700",
};

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    // Charge les annonces, categories et sous-categories au montage de la page.
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
    // Cree une table de correspondance: code sous-categorie -> nom categorie.
    const categoriesByCode = new Map(categories.map((category) => [category.code, category.nom]));
    return new Map(
      subCategories.map((subCategory) => [
        subCategory.code,
        categoriesByCode.get(subCategory.categorie) || subCategory.nom,
      ])
    );
  }, [categories, subCategories]);

  const filteredProducts = products.filter((product) => {
    // Applique localement le filtre de recherche et le filtre de statut.
    const currentStatus = normalizeStatus(product.statut);
    const matchesStatus = status === "all" || currentStatus === status;
    const matchesSearch = product.titre?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSuspend = async (product) => {
    // Bascule le statut du produit puis recharge la liste depuis l'API.
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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.code);
      loadProducts();
      setProductToDelete(null);
    } catch (error) {
      console.error(error);
      setProducts((current) => current.filter((item) => item.code !== productToDelete.code));
      setProductToDelete(null);
    }
  };

  const getCategoryLabel = (product) => {
    return product.categorieLabel ||
           categoryBySubCategory.get(product.sous_categorie) ||
           product.sous_categorie?.nom ||
           "-";
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">{t('products.title')}</h1>
          <p className="text-gray-500 mt-1">{t('products.subtitle')}</p>
        </div>

        <div className="flex gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 w-[315px] shadow-sm">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
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
            <option value="all">{t('products.allStatuses')}</option>
            <option value="Actif">{t('products.statusActive')}</option>
            <option value="Suspendu">{t('products.statusSuspended')}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-5 text-left">{t('products.product')}</th>
              <th className="p-5 text-left">{t('products.seller')}</th>
              <th className="p-5 text-left">{t('products.category')}</th>
              <th className="p-5 text-left">{t('products.price')}</th>
              <th className="p-5 text-left">{t('products.stock')}</th>
              <th className="p-5 text-left">{t('products.status')}</th>
              <th className="p-5 text-left">{t('products.actions')}</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              const productStatus = normalizeStatus(product.statut);
              const categoryLabel = getCategoryLabel(product);

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
                  <td className="p-5">{product.vendeur?.username || t('products.seller')}</td>
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
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-11 h-11 rounded-xl bg-blue-100 text-blue-500 inline-flex items-center justify-center hover:bg-blue-200 transition" 
                        title={t('products.view')}
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleSuspend(product)}
                        className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 inline-flex items-center justify-center hover:bg-yellow-200 transition"
                        title={productStatus === "Actif" ? t('products.suspend') : t('products.activate')}
                      >
                        <FaBan />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="w-11 h-11 rounded-xl bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200 transition"
                        title={t('products.delete')}
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
                  {t('products.noProducts')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modale de Détails du Produit */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-[800px] max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-950">{t('products.productDetails')}</h2>
                <p className="text-gray-500 mt-1">{t('products.code')}: {selectedProduct.code}</p>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
              {/* Image Section */}
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-2xl aspect-square overflow-hidden mb-4">
                  {selectedProduct.image ? (
                    <img 
                      src={resolveImage(selectedProduct.image)} 
                      alt={selectedProduct.titre} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {t('products.noImage')}
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section */}
              <div className="md:w-2/3 space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-950">{selectedProduct.titre}</h3>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass[normalizeStatus(selectedProduct.statut)]}`}>
                      {normalizeStatus(selectedProduct.statut)}
                    </span>
                    <span className="text-xl font-bold text-orange-500">
                      {Number(selectedProduct.prix || 0).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                      <FaUserAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('products.sellerLabel')}</p>
                      <p className="font-medium text-gray-900">{selectedProduct.vendeur?.username || t('products.unknownSeller')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">
                      <FaTags />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('products.categoryLabel')}</p>
                      <p className="font-medium text-gray-900">{getCategoryLabel(selectedProduct)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                      <FaBoxOpen />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('products.stockLabel')}</p>
                      <p className="font-medium text-gray-900">{selectedProduct.qte || 0} {t('products.units')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('products.location')}</p>
                      <p className="font-medium text-gray-900 line-clamp-1" title={selectedProduct.localisation}>{selectedProduct.localisation || "-"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('products.description')}</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedProduct.description || t('products.noDescription')}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
              <button 
                onClick={() => {
                  handleSuspend(selectedProduct);
                  setSelectedProduct(null);
                }} 
                className="px-6 py-3 rounded-xl border border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {normalizeStatus(selectedProduct.statut) === "Actif" ? t('products.suspendProduct') : t('products.activateProduct')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de Suppression de Produit */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-red-600">{t('products.deleteProduct')}</h2>
                <p className="text-gray-500 mt-1">
                  {t('products.deleteProductConfirm', { name: productToDelete.titre })}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {t('products.deleteProductWarning')}
                </p>
              </div>
              <button 
                onClick={() => setProductToDelete(null)} 
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={() => setProductToDelete(null)} 
                className="px-6 py-3 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('products.cancel')}
              </button>
              <button 
                onClick={confirmDeleteProduct} 
                className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                {t('products.confirmDelete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
