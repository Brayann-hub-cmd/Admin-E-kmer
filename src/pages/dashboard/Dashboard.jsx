import { useEffect, useState } from "react";
import usersService from "../../services/users.service";
import productsService from "../../services/products.service";
import categoriesService from "../../services/categories.service";

import {
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaLayerGroup,
} from "react-icons/fa";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        usersData,
        productsData,
        categoriesData,
        subCategoriesData,
      ] = await Promise.all([
        usersService.getAll(),
        productsService.getAll(),
        categoriesService.getCategories(),
        categoriesService.getSubCategories(),
      ]);

      setUsers(usersData || []);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
      setSubCategories(subCategoriesData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Utilisateurs",
      value: users.length,
      icon: <FaUsers size={28} />,
    },
    {
      title: "Produits",
      value: products.length,
      icon: <FaBoxOpen size={28} />,
    },
    {
      title: "Catégories",
      value: categories.length,
      icon: <FaTags size={28} />,
    },
    {
      title: "Sous-catégories",
      value: subCategories.length,
      icon: <FaLayerGroup size={28} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-medium">
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Vue globale de la plateforme E-Kmer
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
              flex
              justify-between
              items-center
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stat.value}
              </h2>
            </div>

            <div className="text-orange-500">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* TABLEAU PRODUITS */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          Derniers Produits
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Produit
                </th>

                <th className="text-left py-3">
                  Prix
                </th>

                <th className="text-left py-3">
                  Quantité
                </th>

                <th className="text-left py-3">
                  Localisation
                </th>

              </tr>

            </thead>

            <tbody>

              {products.slice(0, 5).map((product) => (
                <tr
                  key={product.code}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">

                      <img
                        src={product.image}
                        alt={product.titre}
                        className="
                          w-12
                          h-12
                          rounded-lg
                          object-cover
                        "
                      />

                      <div>
                        <p className="font-medium">
                          {product.titre}
                        </p>

                        <p className="text-sm text-gray-500">
                          {product.code}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="py-4">
                    {Number(product.prix).toLocaleString()} FCFA
                  </td>

                  <td className="py-4">
                    {product.qte}
                  </td>

                  <td className="py-4">
                    {product.localisation}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* TABLEAU UTILISATEURS */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          Derniers Utilisateurs
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Nom
                </th>

                <th className="text-left py-3">
                  Email
                </th>

                <th className="text-left py-3">
                  Téléphone
                </th>

                <th className="text-left py-3">
                  Rôle
                </th>

              </tr>

            </thead>

            <tbody>

              {users.slice(0, 5).map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">
                    {user.username}
                  </td>

                  <td className="py-4">
                    {user.email}
                  </td>

                  <td className="py-4">
                    {user.telephone}
                  </td>

                  <td className="py-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {user.role}
                    </span>
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