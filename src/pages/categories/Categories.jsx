export default function Categories() {
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Catégories
          </h1>

          <p className="text-gray-500 mt-1">
            Organisez vos produits
          </p>
        </div>

        <button className="bg-orange-500 text-white px-5 py-3 rounded-xl">
          + Ajouter catégorie
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

    </div>
  );
}