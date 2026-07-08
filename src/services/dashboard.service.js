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

const isAdminUser = (user) => {
  // Identifie les comptes administrateurs pour exclure leur activité du fil général.
  const role = String(user.role || "").toLowerCase();
  return role === "admin" || role === "superadmin" || user.is_staff === true || user.is_superuser === true;
};

const normalizeText = (value, fallback = "Utilisateur") => {
  // Convertit les valeurs variées en texte lisible pour éviter l'affichage de [object Object].
  if (value == null) return fallback;
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (typeof value === "object") {
    const nestedValue = [value.first_name, value.last_name, value.nom, value.name, value.username, value.email]
      .map((part) => (typeof part === "string" ? part.trim() : ""))
      .find(Boolean);

    if (nestedValue) return nestedValue;
  }

  return fallback;
};

const buildActivityData = (sales) => {
  // Agrège le volume de ventes sur les 7 derniers jours pour le graphique d'activité.
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

const buildRecentActivities = (sales, users, products = []) => {
  // Regroupe les activités récentes provenant des ventes, annonces et utilisateurs sur 3 mois.
  const now = new Date();
  const startDate = new Date(now);
  startDate.setMonth(now.getMonth() - 3);

  const toActivity = (date, type, title, description) => {
    if (!date) return null;
    const activityDate = new Date(date);
    if (Number.isNaN(activityDate.getTime()) || activityDate < startDate) return null;

    return {
      type,
      title,
      description,
      time: formatShortDate(activityDate),
      date: activityDate,
    };
  };

  // Transforme les ventes en événements de type commande et achat.
  const saleActivities = safeArray(sales)
    .flatMap((sale) => {
      const activities = [];
      const saleDate = sale.created_at ? new Date(sale.created_at) : null;
      if (saleDate && !Number.isNaN(saleDate.getTime()) && saleDate >= startDate) {
        activities.push(
          toActivity(
            sale.created_at,
            "commande",
            "Nouvelle commande",
            `Commande ${sale.code || ""} enregistrée`.trim()
          )
        );
      }

      const buyerName = normalizeText(sale.acheteur_nom || sale.client, "Client");
      if (saleDate && !Number.isNaN(saleDate.getTime()) && saleDate >= startDate) {
        activities.push(
          toActivity(
            sale.created_at,
            "utilisateur",
            "Achat effectué",
            `${buyerName} a effectué un achat`
          )
        );
      }

      return activities.filter(Boolean);
    });

  // Transforme les annonces en événements métier pour publication, mise à jour et suppression.
  const productActivities = safeArray(products)
    .flatMap((product) => {
      const activities = [];
      const sellerName = normalizeText(product.vendeur || product.vendor || product.owner, "Utilisateur");
      const productName = normalizeText(product.titre || product.name || product.nom, "une annonce");

      const createdDate = product.created_at || product.date_creation || product.date_created;
      const updatedDate = product.updated_at || product.modified_at;
      const deletedDate = product.deleted_at || product.supprime_le;
      const status = String(product.statut || product.status || "").toLowerCase();

      activities.push(
        toActivity(createdDate, "annonce", "Publication d'annonce", `${sellerName} a publié ${productName}`)
      );

      if (status.includes("suspend") || status.includes("bloqu") || status.includes("inactif")) {
        activities.push(
          toActivity(updatedDate || createdDate, "annonce", "Annonce suspendue", `${sellerName} a mis ${productName} en retrait`)
        );
      }

      if (deletedDate) {
        activities.push(
          toActivity(deletedDate, "annonce", "Suppression d'annonce", `${sellerName} a supprimé ${productName}`)
        );
      }

      if (updatedDate && updatedDate !== createdDate) {
        activities.push(
          toActivity(updatedDate, "annonce", "Mise à jour d'annonce", `${sellerName} a modifié ${productName}`)
        );
      }

      return activities.filter(Boolean);
    });

  // Transforme les profils utilisateurs en événements de connexion, création et profil mis à jour.
  const userActivities = safeArray(users)
    .filter((user) => user.is_active !== false && !isAdminUser(user))
    .flatMap((user) => {
      const displayName = normalizeText(user.username || user.email || user.name || user.first_name || user.last_name, "Utilisateur");
      const events = [];

      const pushEvent = (date, title, description) => {
        const activity = toActivity(date, "utilisateur", title, `${displayName} ${description}`);
        if (activity) events.push(activity);
      };

      pushEvent(user.created_at, "Nouveau compte utilisateur", "a créé un compte");
      pushEvent(user.last_login, "Connexion récente", "s'est connecté");
      pushEvent(user.updated_at, "Mise à jour du profil", "a mis à jour son profil");
      pushEvent(user.last_seen, "Activité récente", "a été actif récemment");

      return events;
    });

  return [...saleActivities, ...productActivities, ...userActivities]
    .sort((a, b) => b.date - a.date)
    .slice(0, 15)
    .map(({ date, ...activity }) => activity);
};

const buildCategoryData = (sales, categories, subCategories = [], products = []) => {
  // Calcule la répartition des ventes par catégorie à partir des montants des lignes de vente.
  const categoryNameByCode = new Map(categories.map((category) => [category.code, category.nom || category.name]));
  const categoryBySubCode = new Map(
    subCategories.map((subCategory) => [
      subCategory.code,
      categoryNameByCode.get(subCategory.categorie) || subCategory.nom || subCategory.name,
    ])
  );

  const productByKey = new Map();
  safeArray(products).forEach((product) => {
    const keys = [product.code, product.id, product.uuid, product.slug, product.annonce].filter(Boolean);
    keys.forEach((key) => productByKey.set(String(key), product));
  });

  const totals = safeArray(sales).reduce((acc, sale) => {
    safeArray(sale.lignes).forEach((line) => {
      const quantity = Number(line.quantite || line.qty || 1) || 1;
      const unitPrice = Number(line.prix_unitaire || line.prix || line.price || 0) || 0;
      const lineAmount = Number(line.total || line.montant || line.amount || unitPrice * quantity) || unitPrice * quantity;

      const product = line.annonce ? productByKey.get(String(line.annonce)) : null;
      const categoryName =
        line.categorieLabel ||
        line.categorie ||
        line.category ||
        line.categorie_nom ||
        line.category_name ||
        (typeof line.sous_categorie === "string"
          ? line.sous_categorie
          : line.sous_categorie?.nom || line.sous_categorie?.name) ||
        (product?.categorieLabel ||
          categoryBySubCode.get(product?.sous_categorie) ||
          product?.sous_categorie?.nom ||
          product?.sous_categorie?.name) ||
        "Non catégorisé";

      acc[categoryName] = (acc[categoryName] || 0) + lineAmount;
    });

    return acc;
  }, {});

  const total = Object.values(totals).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(totals)
    .map(([name, amount], index) => ({
      name,
      value: total ? Math.round((amount / total) * 100) : 0,
      color: colors[index % colors.length],
    }))
    .sort((a, b) => b.value - a.value);
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
  const utilisateursActifs = users.filter((user) => user.is_active !== false && !isAdminUser(user)).length;
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
    ventesParCategorie: buildCategoryData(sales, categories, subCategories, products),
    activitesRecentes: buildRecentActivities(sales, users, products),
    activityData: buildActivityData(sales),
    users,
    products,
    categories,
    sales,
  };
};
