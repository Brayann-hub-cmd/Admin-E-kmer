import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
} from "../../services/categories.service";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [subCategories, setSubCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const [subCategoryName, setSubCategoryName] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCategory = async (category) => {
    try {
      const data = await getSubCategories(category.code);

      setSelectedCategory(category);

      setSubCategories(data);

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.code, {
          nom: categoryName,
        });
      } else {
        await createCategory({
          nom: categoryName,
        });
      }

      setCategoryName("");

      setEditingCategory(null);

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (code) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    try {
      await deleteCategory(code);

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubCategory = async () => {
    try {
      await createSubCategory({
        nom: subCategoryName,
        categorie: selectedCategory.code,
      });

      const data = await getSubCategories(
        selectedCategory.code
      );

      setSubCategories(data);

      setSubCategoryName("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubCategory = async (code) => {
    if (
      !window.confirm(
        "Supprimer cette sous-catégorie ?"
      )
    )
      return;

    try {
      await deleteSubCategory(code);

      const data = await getSubCategories(
        selectedCategory.code
      );

      setSubCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">

        <h1 className="text-2xl font-bold mb-6">
          Gestion des catégories
        </h1>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Nom catégorie"
            value={categoryName}
            onChange={(e) =>
              setCategoryName(e.target.value)
            }
            className="border rounded-xl px-4 py-2 flex-1"
          />

          <button
            onClick={handleSaveCategory}
            className="bg-orange-500 text-white px-5 py-2 rounded-xl"
          >
            {editingCategory
              ? "Modifier"
              : "Ajouter"}
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">
                <th className="text-left p-3">
                  Code
                </th>

                <th className="text-left p-3">
                  Nom
                </th>

                <th className="text-left p-3">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (

                <tr
                  key={category.code}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {category.code}
                  </td>

                  <td className="p-3">
                    {category.nom}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        openCategory(category)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    >
                      Voir
                    </button>

                    <button
                      onClick={() => {
                        setEditingCategory(
                          category
                        );
                        setCategoryName(
                          category.nom
                        );
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCategory(
                          category.code
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Supprimer
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[700px] rounded-2xl p-6">

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Sous-catégories de{" "}
                {selectedCategory?.nom}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>

            <div className="flex gap-3 mb-5">

              <input
                type="text"
                placeholder="Nouvelle sous-catégorie"
                value={subCategoryName}
                onChange={(e) =>
                  setSubCategoryName(
                    e.target.value
                  )
                }
                className="border rounded-xl px-4 py-2 flex-1"
              />

              <button
                onClick={handleAddSubCategory}
                className="bg-orange-500 text-white px-4 rounded-xl"
              >
                Ajouter
              </button>

            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">

              {subCategories.map((sub) => (

                <div
                  key={sub.code}
                  className="border rounded-xl p-3 flex justify-between items-center"
                >

                  <span>
                    {sub.nom}
                  </span>

                  <button
                    onClick={() =>
                      handleDeleteSubCategory(
                        sub.code
                      )
                    }
                    className="text-red-500"
                  >
                    Supprimer
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}