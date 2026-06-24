import { useEffect, useState } from "react";
import { FaFolderOpen, FaPlus, FaTimes } from "react-icons/fa";
import {
  createCategory,
  getCategories,
  getSubCategoriesByCategory,
} from "../../services/categories.service";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubCategoriesModal, setShowSubCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  // Charge la liste principale depuis l'endpoint GET /api/categories/.
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  // Ouvre une catégorie et récupère ses sous-catégories côté backend.
  const openSubCategories = async (category) => {
    setSelectedCategory(category);
    setShowSubCategoriesModal(true);
    setLoadingSubCategories(true);

    try {
      const data = await getSubCategoriesByCategory(category.code);
      setSubCategories(data);
    } catch (error) {
      console.error(error);
      setSubCategories([]);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  // Crée une catégorie simple. Le backend ne gère pas encore description/image ici.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.nom.trim()) return;

    try {
      await createCategory({ nom: formData.nom.trim() });
      setShowCreateModal(false);
      setFormData({ nom: "", description: "", image: null });
      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Catégories</h1>
          <p className="text-gray-500 mt-1">Organisez les produits et articles par catégories</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <FaPlus />
          Ajouter une catégorie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {categories.map((category) => (
          <button
            type="button"
            key={category.code || category.nom}
            onClick={() => openSubCategories(category)}
            className="bg-white rounded-2xl shadow-sm px-7 py-8 text-left hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-950">{category.nom}</p>
                <p className="text-sm text-gray-500 mt-1">Voir les sous-catégories</p>
              </div>
              <FaFolderOpen className="text-orange-500 text-xl" />
            </div>
          </button>
        ))}

        {!categories.length && (
          <div className="bg-white rounded-2xl shadow-sm px-7 py-8 text-gray-500 md:col-span-3">
            Aucune catégorie trouvée.
          </div>
        )}
      </div>

      {showSubCategoriesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-white rounded-[28px] w-[620px] max-w-[92vw] p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-950">
                  {selectedCategory?.nom}
                </h2>
                <p className="text-gray-500 mt-1">Sous-catégories associées</p>
              </div>
              <button
                onClick={() => setShowSubCategoriesModal(false)}
                className="w-11 h-11 rounded-2xl bg-gray-100 inline-flex items-center justify-center"
                title="Fermer"
              >
                <FaTimes />
              </button>
            </div>

            {loadingSubCategories ? (
              <p className="py-10 text-center text-gray-500">Chargement des sous-catégories...</p>
            ) : subCategories.length ? (
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {subCategories.map((subCategory) => (
                  <div key={subCategory.code || subCategory.nom} className="px-5 py-4 flex items-center justify-between">
                    <span className="font-medium text-gray-900">{subCategory.nom}</span>
                    <span className="text-sm text-gray-400">{subCategory.code}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-2xl py-10 text-center text-gray-500">
                Aucune sous-catégorie trouvée pour cette catégorie.
              </div>
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-white rounded-[28px] w-[756px] max-w-[92vw] p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-semibold">Ajouter une catégorie</h2>
                <p className="text-gray-500 mt-1">Créez une nouvelle catégorie</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-11 h-11 rounded-2xl bg-gray-100 inline-flex items-center justify-center"
                title="Fermer"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="font-medium text-gray-700">Nom catégorie</label>
                <input
                  value={formData.nom}
                  onChange={(event) => setFormData({ ...formData, nom: event.target.value })}
                  placeholder="Ex: Électronique"
                  className="mt-3 w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  placeholder="Description de la catégorie..."
                  className="mt-3 w-full border border-gray-200 rounded-2xl px-5 py-5 outline-none h-36 resize-none focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Image catégorie</label>
                <div className="mt-3 border border-dashed border-gray-300 rounded-2xl p-5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setFormData({ ...formData, image: event.target.files?.[0] || null })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-7 py-4 border border-gray-300 rounded-2xl"
                >
                  Annuler
                </button>
                <button type="submit" className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-medium">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
