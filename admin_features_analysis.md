# Analyse et Fonctionnalités du Back-office Administrateur (Admin-E-kmer)

## Contexte du Projet "E-kmer"

D'après l'analyse des dépôts `E-kmer` (Frontend Client) et `E-kmer-back` (Backend Django), **E-kmer** est une plateforme de **Marketplace (place de marché) / E-commerce**, probablement orientée vers le marché camerounais (d'où le terme "kmer"). 

La plateforme met en relation plusieurs acteurs :
1. **Les Vendeurs** : Peuvent créer des `Annonces` (produits avec prix, quantité, images et localisation).
2. **Les Acheteurs** : Peuvent ajouter des annonces à leur `Panier`, passer des `Commandes` (Orders) et générer des `Ventes`.
3. **Les Livreurs** : Disposent d'un profil spécifique (`Livreur`) avec un type de véhicule (moto, voiture, etc.), un numéro de permis, et un statut de disponibilité en temps réel (disponible, occupé, offline).

Le projet utilise des technologies modernes : React/Vite/TailwindCSS pour les frontends et Django/Django REST Framework avec PostgreSQL pour le backend.

---

## Liste des Fonctionnalités à Ajouter côté Administrateur

Bien que votre dossier `src/pages` contienne déjà une bonne ébauche de la structure (dashboard, categories, orders, products, etc.), voici la **liste exhaustive des fonctionnalités** que le panel administrateur devra couvrir pour gérer efficacement la plateforme.

### 1. Gestion des Livreurs (Delivery Management) - *À créer*
*Actuellement, il n'y a pas de dossier pour cela dans votre arborescence, mais c'est un point central du backend.*
- **Validation des profils** : Vérifier et valider les informations des livreurs (permis de conduire, plaque d'immatriculation) avant de les activer.
- **Suivi de flotte** : Voir la liste des livreurs, leurs véhicules (moto, vélo, voiture, camion) et leur statut actuel (disponible, occupé, hors ligne).
- **Assignation/Supervision** : Suivre quelles commandes sont assignées à quels livreurs (nécessitera une liaison dans le backend entre `Order` et `Livreur`).

### 2. Modération du Catalogue et des Annonces (Products/Annonces)
- **Validation a priori / a posteriori** : Possibilité de suspendre ou supprimer des `Annonces` qui ne respectent pas les règles (ex: fraude, contenu inapproprié).
- **Consultation globale** : Voir l'inventaire complet de la plateforme, avec un accès direct aux informations du vendeur, aux stocks (`qte`) et aux images.
- **Gestion des Catégories** : CRUD (Créer, Lire, Modifier, Supprimer) des `Categories` principales et de leurs sous-catégories (`LowCategorie`).

### 3. Gestion des Utilisateurs (Users & Roles)
- **Tableau des utilisateurs** : Lister tous les inscrits (Acheteurs, Vendeurs, Livreurs).
- **Modération** : Possibilité de bloquer/désactiver le compte d'un utilisateur abusif (`is_active = False`).
- **Permissions** : Changer le `role` d'un utilisateur (ex: promouvoir quelqu'un en tant que modérateur ou administrateur).
- **Vue détaillée** : Voir l'historique des annonces postées par un vendeur, ou l'historique d'achats d'un acheteur.

### 4. Supervision des Commandes et Ventes (Orders & Sales)
- **Suivi des statuts** : Voir toutes les commandes et leur statut (En attente, Confirmée, Annulée, etc.).
- **Détails financiers** : Visualiser les modes de paiement choisis et les totaux (Lignes de vente).
- **Annulation/Remboursement** : Capacité pour l'admin d'annuler manuellement une commande en cas de problème technique ou de litige.

### 5. Analytique, Rapports et Tableau de Bord (Dashboard & Analytics)
- **Métriques clés** : Volume des transactions, nombre de commandes du jour/mois, nombre d'utilisateurs actifs, etc.
- **Top Performances** : Identifier les vendeurs les plus performants, les catégories les plus populaires, et les livreurs les plus actifs.
- **Exports** : Générer des rapports (CSV/PDF) pour la comptabilité et l'analyse commerciale.

---

## Fonctionnalités "Business" non encore couvertes par le backend (à anticiper)

En tant que Marketplace, vous aurez forcément besoin de ces outils côté Admin à terme, même si les modèles Django ne les prévoient pas encore :

1. **Gestion des Commissions et Payouts (Reversements)** : Si l'argent transite par la plateforme, l'admin doit pouvoir voir combien la plateforme a gagné (commission) et déclencher/suivre les reversements de l'argent vers les comptes bancaires ou Mobile Money des vendeurs.
2. **Gestion des Litiges (Disputes)** : Un espace où l'admin peut intervenir lorsqu'un acheteur signale un problème avec un vendeur ou un livreur (ex: produit non conforme, colis perdu).
3. **Marketing et Paramétrage (Settings & CMS)** :
   - Gestion de bannières publicitaires pour la page d'accueil de l'application cliente.
   - Création de codes promotionnels globaux.
   - Paramétrage des frais de livraison globaux ou des pourcentages de commission.
4. **Support Client / Messagerie** : Interface pour répondre aux tickets de support ou messages de contact envoyés par les utilisateurs depuis l'application.
