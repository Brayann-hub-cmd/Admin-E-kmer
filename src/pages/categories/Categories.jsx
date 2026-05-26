import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
export default function Categories() {
const [showModal, setShowModal] = useState(false);

const [newCategory, setNewCategory] = useState({
  nom: "",
  description: "",
  image: "",
});
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Catégories
          </h1>

          <p className="text-gray-500 mt-1">
            Organisez les produits et articles par catégories
          </p>
        </div>

        <button
  onClick={() => setShowModal(true)}
  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl transition font-medium"
>

  <FaPlus />

  Ajouter une catégorie

</button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          Électronique
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          Mode
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          Maison
        </div>

      </div>
{
  showModal && (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-7 animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Ajouter une catégorie
            </h2>

            <p className="text-gray-500 mt-1">
              Créez une nouvelle catégorie 
            </p>

          </div>

          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition"
          >

            <FaTimes />

          </button>

        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NOM */}
          <div>

            <label className="text-sm font-medium text-gray-700">

              Nom catégorie

            </label>

            <input
              type="text"
              value={newCategory.nom}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  nom: e.target.value,
                })
              }
              placeholder="Ex: Électronique"
              className="w-full border border-gray-200 rounded-2xl p-4 mt-2 outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="text-sm font-medium text-gray-700">

              Description

            </label>

            <textarea
              rows={4}
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  description: e.target.value,
                })
              }
              placeholder="Description de la catégorie..."
              className="w-full border border-gray-200 rounded-2xl p-4 mt-2 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />

          </div>

          {/* IMAGE */}
          <div>

            <label className="text-sm font-medium text-gray-700">

              Image catégorie

            </label>

            <input
              type="file"
              className="w-full border border-dashed border-gray-300 rounded-2xl p-4 mt-2"
            />

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Annuler
          </button>

          <button
            onClick={() => {

              console.log(newCategory);

              setShowModal(false);

              setNewCategory({
                nom: "",
                description: "",
                image: "",
              });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl transition font-medium"
          >
            Ajouter
          </button>

        </div>

      </div>

    </div>

  )
}
    </div>
    
  );
}