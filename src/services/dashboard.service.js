import { getCategories, getSubCategories } from "./categories.service";
import { getProducts } from "./products.service";
import { getSales } from "./sales.service";
import { getUsers } from "./users.service";

const colors = ["#f97316", "#8b5cf6", "#22c55e", "#3b82f6", "#ec4899"];

const safeArray = (value) => (Array.isArray(value) ? value : []);

const formatCurrency = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;

const getSaleLines = (sale) => safeArray(sale.lignes);

const getSaleTotal = (sale) => Number(sale.prix_total || sale.total || 0) || 0;

const getSaleBuyer = (sale) => sale.acheteur_nom || sale.client || "Client";

const getSaleStatus = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("livr") || value.includes("confirm") || value.includes("pay")) return "Livrée";
  if (value.includes("cours") || value.includes("livraison")) return "En livraison";
  return "En attente";
};

const formatShortDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" })
    .format(date)
    .replace(".", "");

const buildActivityData = (sales) => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const total = sales
      .filter((sale) => {
        if (!sale.created_at) return false;
        const saleDate = new Date(sale.created_at);
        return saleDate.toDateString() === date.toDateString();
      })
      .reduce((sum, sale) => sum + getSaleTotal(sale), 0);

    return {
      day: formatShortDate(date),
      value: total,
    };
  });
};

const buildTopProducts = (sales, products) => {
  const fromSales = Object.values(
    sales.reduce((acc, sale) => {
      getSaleLines(sale).forEach((line) => {
        const key = line.annonce || line.annonce_titre || line.titre;
        if (!key) return;

        const quantity = Number(line.quantite) || 1;
        const unitPrice = Number(line.prix_unitaire || line.prix || 0) || 0;

        acc[key] = acc[key] || {
          code: key,
          titre: line.annonce_titre || line.titre || "Produit",
          ventes: 0,
          total: 0,
        };
        acc[key].ventes += quantity;
        acc[key].total += unitPrice * quantity;
      });

      return acc;
    }, {})
  );

  if (fromSales.length) {
    return fromSales.sort((a, b) => b.total - a.total).slice(0, 5);
  }

  return products.slice(0, 5).map((product) => ({
    code: product.code,
    titre: product.titre,
    ventes: 0,
    total: Number(product.prix || 0) || 0,
  }));
};

const buildCategoryData = (products, categories, subCategories = []) => {
  const categoryNameByCode = new Map(categories.map((category) => [category.code, category.nom]));
  const categoryBySubCode = new Map(
    subCategories.map((subCategory) => [
      subCategory.code,
      categoryNameByCode.get(subCategory.categorie) || subCategory.nom,
    ])
  );

  const counts = products.reduce((acc, product) => {
    const categoryName =
      product.categorieLabel ||
      categoryBySubCode.get(product.sous_categorie) ||
      product.sous_categorie?.nom ||
      "Non catégorisé";

    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return Object.entries(counts).map(([name, count], index) => ({
    name,
    value: total ? Math.round((count / total) * 100) : 0,
    color: colors[index % colors.length],
  }));
};

export const getDashboardStats = async () => {
  const [usersResult, productsResult, categoriesResult, subCategoriesResult, salesResult] = await Promise.allSettled([
    getUsers(),
    getProducts(),
    getCategories(),
    getSubCategories(),
    getSales(),
  ]);

  const users = safeArray(usersResult.value);
  const products = safeArray(productsResult.value);
  const categories = safeArray(categoriesResult.value);
  const subCategories = safeArray(subCategoriesResult.value);
  const sales = safeArray(salesResult.value);

  const volumeVentes = sales.reduce((sum, sale) => sum + getSaleTotal(sale), 0);
  const nbCommandes = sales.length;
  const utilisateursActifs = users.filter((user) => user.is_active !== false).length;
  const panierMoyen = nbCommandes ? Math.round(volumeVentes / nbCommandes) : 0;

  return {
    volumeVentes,
    nbCommandes,
    utilisateursActifs,
    panierMoyen,
    commandesRecentes: sales.slice(0, 5).map((sale) => ({
      id: sale.code,
      client: getSaleBuyer(sale),
      total: formatCurrency(getSaleTotal(sale)),
      statut: getSaleStatus(sale.statut || sale.status),
    })),
    topProduits: buildTopProducts(sales, products),
    ventesParCategorie: buildCategoryData(products, categories, subCategories),
    activitesRecentes: [
      ...sales.slice(0, 3).map((sale) => ({
        type: "commande",
        title: "Nouvelle commande",
        description: `Commande ${sale.code || ""} enregistrée`.trim(),
        time: sale.created_at ? formatShortDate(new Date(sale.created_at)) : "",
      })),
      ...users.slice(0, 3).map((user) => ({
        type: "utilisateur",
        title: "Nouvel utilisateur",
        description: `${user.username || "Utilisateur"} vient de créer un compte`,
        time: user.created_at ? formatShortDate(new Date(user.created_at)) : "",
      })),
    ],
    activityData: buildActivityData(sales),
    users,
    products,
    categories,
    sales,
  };
};
