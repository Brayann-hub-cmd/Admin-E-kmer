import { useEffect, useState } from "react";

import {
  FaUsers,
  FaShoppingCart,
  FaTags,
  FaBoxOpen,
} from "react-icons/fa";

import StatCard from "../ui/StatCard";

import { getUsers } from "../../services/users.service";
import { getProducts } from "../../services/products.service";
import {
  getCategories,
  getSubCategories,
} from "../../services/categories.service";

export default function StatsCards() {
  const [stats, setStats] = useState([
    {
      title: "Utilisateurs",
      value: 0,
      growth: "+0%",
      icon: <FaUsers />,
      color: "bg-green-100 text-green-500",
    },
    {
      title: "Produits",
      value: 0,
      growth: "+0%",
      icon: <FaBoxOpen />,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "Catégories",
      value: 0,
      growth: "+0%",
      icon: <FaTags />,
      color: "bg-purple-100 text-purple-500",
    },
    {
      title: "Sous-catégories",
      value: 0,
      growth: "+0%",
      icon: <FaShoppingCart />,
      color: "bg-blue-100 text-blue-500",
    },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [
        users,
        products,
        categories,
        subCategories,
      ] = await Promise.all([
        getUsers(),
        getProducts(),
        getCategories(),
        getSubCategories(),
      ]);

      setStats([
        {
          // Compte des utilisateurs en excluant les administrateurs
          // On vérifie que le rôle n'est ni 'admin' ni 'Admin'
          title: "Utilisateurs",
          value: users ? users.filter(user => user.role !== 'admin' && user.role !== 'Admin').length : 0,
          growth: "+0%",
          icon: <FaUsers />,
          color: "bg-green-100 text-green-500",
        },
        {
          title: "Produits",
          value: products?.length || 0,
          growth: "+0%",
          icon: <FaBoxOpen />,
          color: "bg-orange-100 text-orange-500",
        },
        {
          title: "Catégories",
          value: categories?.length || 0,
          growth: "+0%",
          icon: <FaTags />,
          color: "bg-purple-100 text-purple-500",
        },
        {
          title: "Sous-catégories",
          value: subCategories?.length || 0,
          growth: "+0%",
          icon: <FaShoppingCart />,
          color: "bg-blue-100 text-blue-500",
        },
      ]);
    } catch (error) {
      console.error("Erreur chargement statistiques :", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
      {stats.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          growth={item.growth}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}