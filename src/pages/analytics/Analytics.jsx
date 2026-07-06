import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCategories, getSubCategories } from "../../services/categories.service";
import { getProducts } from "../../services/products.service";
import { getSales } from "../../services/sales.service";
import { getUsers } from "../../services/users.service";

const colors = ["#f97316", "#3b82f6", "#10b981", "#eab308", "#8b5cf6"];

const formatCurrency = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;

const monthKey = (date) => new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date).replace(".", "");

const buildMonthlySales = (sales) => {
  // Regroupe le chiffre d'affaires par mois pour alimenter le graphique.
  const now = new Date();
  const months = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (4 - index), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: monthKey(date),
      sales: 0,
    };
  });

  sales.forEach((sale) => {
    if (!sale.created_at) return;
    const date = new Date(sale.created_at);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = months.find((item) => item.key === key);
    if (month) month.sales += Number(sale.prix_total || 0);
  });

  return months;
};

const buildCategoryData = (products, categories, subCategories) => {
  // Calcule une repartition par categorie a partir des annonces.
  const categoryNameByCode = new Map(categories.map((category) => [category.code, category.nom]));
  const categoryBySubCode = new Map(
    subCategories.map((subCategory) => [
      subCategory.code,
      categoryNameByCode.get(subCategory.categorie) || subCategory.nom,
    ])
  );

  const counts = products.reduce((acc, product) => {
    const category =
      categoryBySubCode.get(product.sous_categorie) ||
      product.sous_categorie?.nom ||
      "Non catégorisé";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const buildVendorData = (sales) => {
  // Additionne les quantites vendues par vendeur.
  const totals = {};

  sales.forEach((sale) => {
    sale.lignes?.forEach((line) => {
      const vendor = line.annonce_vendeur || "Vendeur";
      totals[vendor] = (totals[vendor] || 0) + (Number(line.quantite) || 1);
    });
  });

  return Object.entries(totals)
    .map(([vendor, salesCount]) => ({ vendor, sales: salesCount }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 8);
};

export default function Analytics() {
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Recupere les donnees necessaires aux KPI et graphiques analytics.
    Promise.all([
      getSales(),
      getUsers(),
      getProducts(),
      getCategories(),
      getSubCategories().catch(() => []),
    ])
      .then(([salesData, usersData, productsData, categoriesData, subCategoriesData]) => {
        setSales(salesData);
        setUsers(usersData);
        setProducts(productsData);
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
      })
      .catch((error) => {
        console.error(error);
        setSales([]);
        setUsers([]);
        setProducts([]);
        setCategories([]);
        setSubCategories([]);
      });
  }, []);

  // Memoise les calculs lourds pour eviter de les refaire a chaque rendu.
  const monthlySales = useMemo(() => buildMonthlySales(sales), [sales]);
  const categoryData = useMemo(
    () => buildCategoryData(products, categories, subCategories),
    [products, categories, subCategories]
  );
  const isAdmin = (user) => {
    const role = String(user.role || "").toLowerCase();
    return role === "admin" || role === "superadmin" || user.is_staff === true || user.is_superuser === true;
  };
  const vendorData = useMemo(() => buildVendorData(sales), [sales]);
  const revenue = sales.reduce((sum, sale) => sum + Number(sale.prix_total || 0), 0);
  const activeUsers = users.filter((user) => user.is_active !== false && !isAdmin(user)).length;
  const activeProducts = products.filter((product) => String(product.statut || "").toLowerCase() !== "suspendu").length;
  const conversion = users.length ? Math.round((sales.length / users.length) * 100) : 0;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-950">Analytics</h1>
        <p className="text-gray-500 mt-1">Analyse des performances marketplace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-9">
        {[
          ["Revenus plateforme", formatCurrency(revenue)],
          ["Utilisateurs actifs", activeUsers.toLocaleString("fr-FR")],
          ["Produits actifs", activeProducts.toLocaleString("fr-FR")],
          ["Taux conversion", `${conversion}%`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-3xl p-7 shadow-sm">
            <p className="text-gray-500">{label}</p>
            <h2 className="text-2xl font-semibold mt-4 text-gray-950">{value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 mb-9">
        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[450px]">
          <h2 className="text-xl font-semibold mb-7 text-gray-950">Croissance des ventes</h2>
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={4} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[450px]">
          <h2 className="text-xl font-semibold mb-7 text-gray-950">Ventes par catégorie</h2>
          {categoryData.length ? (
            <ResponsiveContainer width="100%" height={330}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" outerRadius={112} label>
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[330px] flex items-center justify-center text-gray-500">Aucune donnée catégorie.</div>
          )}
        </section>
      </div>

      <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[500px]">
        <h2 className="text-xl font-semibold mb-7 text-gray-950">Top vendeurs</h2>
        {vendorData.length ? (
          <ResponsiveContainer width="100%" height={390}>
            <BarChart data={vendorData}>
              <XAxis dataKey="vendor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#f97316" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[390px] flex items-center justify-center text-gray-500">Aucune vente par vendeur.</div>
        )}
      </section>
    </div>
  );
}
