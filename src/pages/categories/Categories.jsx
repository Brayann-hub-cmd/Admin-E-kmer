import { useEffect, useState } from "react";
import { FaFolderOpen, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getSubCategoriesByCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../services/categories.service";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubCategoriesModal, setShowSubCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  
  // Nouveaux états pour la gestion des sous-catégories
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

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

  const handleDeleteCategoryClick = (category, e) => {
    e.stopPropagation(); // Évite d'ouvrir la modale de sous-catégories
    setCategoryToDelete(category);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.code);
      loadCategories();
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie", error);
    }
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!newSubCategoryName.trim() || !selectedCategory) return;
    try {
      await createSubCategory({ 
        nom: newSubCategoryName.trim(), 
        categorie: selectedCategory.code 
      });
      setNewSubCategoryName("");
      // Recharge les sous-catégories de la catégorie sélectionnée
      openSubCategories(selectedCategory);
    } catch (error) {
      console.error("Erreur lors de la création de la sous-catégorie", error);
      alert(error?.response?.data?.error || "Erreur lors de la création");
    }
  };

  const handleDeleteSubCategoryClick = (subCategory) => {
    setSubCategoryToDelete(subCategory);
  };

  const confirmDeleteSubCategory = async () => {
    if (!subCategoryToDelete) return;
    try {
      await deleteSubCategory(subCategoryToDelete.code);
      // Recharge les sous-catégories de la catégorie sélectionnée
      openSubCategories(selectedCategory);
      setSubCategoryToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression de la sous-catégorie", error);
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
          <div
            key={category.code || category.nom}
            onClick={() => openSubCategories(category)}
            className="bg-white rounded-2xl shadow-sm px-7 py-8 text-left hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer relative group"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-950">{category.nom}</p>
                <p className="text-sm text-gray-500 mt-1">Voir les sous-catégories</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => handleDeleteCategoryClick(category, e)}
                  className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                  title="Supprimer la catégorie"
                >
                  <FaTrash className="text-sm" />
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <FaFolderOpen className="text-orange-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {!categories.length && (
          <div className="bg-white rounded-2xl shadow-sm px-7 py-8 text-gray-500 md:col-span-3 text-center">
            Aucune catégorie trouvée.
          </div>
        )}
      </div>

      {showSubCategoriesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-white rounded-[28px] w-[620px] max-w-[92vw] p-8 flex flex-col max-h-[90vh]">
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

            <form onSubmit={handleAddSubCategory} className="mb-6 flex gap-3">
              <input 
                type="text" 
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                placeholder="Nouvelle sous-catégorie..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
              />
              <button 
                type="submit"
                disabled={!newSubCategoryName.trim()}
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter
              </button>
            </form>

            <div className="overflow-y-auto flex-1 pr-2">
              {loadingSubCategories ? (
                <p className="py-10 text-center text-gray-500">Chargement des sous-catégories...</p>
              ) : subCategories.length ? (
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  {subCategories.map((subCategory) => (
                    <div key={subCategory.code || subCategory.nom} className="px-5 py-4 flex items-center justify-between group">
                      <span className="font-medium text-gray-900">{subCategory.nom}</span>
                      <button
                        onClick={() => handleDeleteSubCategoryClick(subCategory)}
                        className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                        title="Supprimer la sous-catégorie"
                      >
                        <FaTrash className="text-sm" />
                      </button>
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

      {/* Modale de suppression de Catégorie */}
      {categoryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-red-600">Supprimer la catégorie</h2>
                <p className="text-gray-500 mt-1">
                  Voulez-vous vraiment supprimer la catégorie <span className="font-semibold text-gray-950">"{categoryToDelete.nom}"</span> ?
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cela supprimera également toutes ses sous-catégories. Cette action est irréversible.
                </p>
              </div>
              <button 
                onClick={() => setCategoryToDelete(null)} 
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={() => setCategoryToDelete(null)} 
                className="px-6 py-3 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDeleteCategory} 
                className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de suppression de Sous-Catégorie */}
      {subCategoryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-red-600">Supprimer la sous-catégorie</h2>
                <p className="text-gray-500 mt-1">
                  Voulez-vous vraiment supprimer la sous-catégorie <span className="font-semibold text-gray-950">"{subCategoryToDelete.nom}"</span> ?
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cette action est irréversible.
                </p>
              </div>
              <button 
                onClick={() => setSubCategoryToDelete(null)} 
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={() => setSubCategoryToDelete(null)} 
                className="px-6 py-3 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDeleteSubCategory} 
                className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
