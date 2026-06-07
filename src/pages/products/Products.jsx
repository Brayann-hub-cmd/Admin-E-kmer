import {
  FaSearch,
  FaEye,
  FaTrash,
  FaBan,
} from "react-icons/fa";

export default function Products() {

  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/60",
      name: "iPhone 15 Pro",
      seller: "TechStore",
      category: "Électronique",
      price: "850 000 FCFA",
      stock: 12,
      status: "Actif",
    },

    {
      id: 2,
      image: "https://via.placeholder.com/60",
      name: "Air Jordan",
      seller: "SneakerShop",
      category: "Mode",
      price: "120 000 FCFA",
      stock: 3,
      status: "Suspendu",
    },
  ];

  const getStatusStyle = (status) => {

    switch (status) {

      case "Actif":
        return "bg-green-100 text-green-700";

      case "Suspendu":
        return "bg-red-100 text-red-700";

      case "En attente":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Produits
          </h1>

          <p className="text-gray-500 mt-2">
            Supervision des produits 
          </p>

        </div>

        <div className="flex gap-4">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="pl-11 pr-4 py-3 border rounded-2xl outline-none w-[280px]"
            />

          </div>

          <select className="border rounded-2xl px-4 py-3">

            <option>Tous les statuts</option>

            <option>Actif</option>

            <option>Suspendu</option>

            <option>En attente</option>

          </select>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-5 text-left">
                  Produit
                </th>

                <th className="p-5 text-left">
                  Vendeur
                </th>

                <th className="p-5 text-left">
                  Catégorie
                </th>

                <th className="p-5 text-left">
                  Prix
                </th>

                <th className="p-5 text-left">
                  Stock
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                      </div>

                    </div>

                  </td>

                  <td className="p-5">
                    {product.seller}
                  </td>

                  <td className="p-5">
                    {product.category}
                  </td>

                  <td className="p-5 font-semibold">
                    {product.price}
                  </td>

                  <td className="p-5">
                    {product.stock}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        product.status
                      )}`}
                    >

                      {product.status}

                    </span>

                  </td>

                  <td className="p-5">

                    <div className="flex gap-3">

                      <button className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition">

                        <FaEye />

                      </button>

                      <button className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center hover:bg-yellow-200 transition">

                        <FaBan />

                      </button>

                      <button className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition">

                        <FaTrash />

                      </button>

                    </div>

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