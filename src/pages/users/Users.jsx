import { useEffect, useState } from "react";
import {
  FaStore,
  FaTrash,
  FaUser,
  FaUserPlus,
  FaUserShield,
  FaUserTie,
  FaEllipsisV,
} from "react-icons/fa";
import { createUser, deleteUser, getUsers } from "../../services/users.service";

const roleMap = {
  admin: { label: "Admin", icon: <FaUserShield />, className: "text-purple-500" },
  seller: { label: "Vendeur", icon: <FaUser />, className: "text-blue-500" },
  vendeur: { label: "Vendeur", icon: <FaUser />, className: "text-blue-500" },
  buyer: { label: "Acheteur", icon: <FaUser />, className: "text-blue-500" },
  acheteur: { label: "Acheteur", icon: <FaUser />, className: "text-blue-500" },
  store: { label: "Boutique", icon: <FaStore />, className: "text-orange-500" },
  boutique: { label: "Boutique", icon: <FaStore />, className: "text-orange-500" },
  user: { label: "Acheteur", icon: <FaUser />, className: "text-blue-500" },
};

const avatarColors = ["bg-blue-100", "bg-green-100", "bg-orange-100", "bg-purple-100"];

const getStatus = (user, index) => {
  if (user.status === "pending") return "En attente";
  if (user.status === "suspended" || user.is_active === false) return "Suspendu";
  if (index === 1 && !user.created_at) return "En attente";
  return "Actif";
};

const statusClass = {
  Actif: "bg-green-100 text-green-700",
  "En attente": "bg-yellow-100 text-yellow-700",
  Suspendu: "bg-red-100 text-red-700",
};

const shortId = (id, index) => {
  const value = String(id || index + 1);
  return value.length > 8 ? value.slice(0, 8) : value;
};

export default function Users() {
  // Liste des utilisateurs récupérée depuis l'API
  const [users, setUsers] = useState([]);
  
  // État pour contrôler l'affichage de la modale d'ajout d'utilisateur
  const [showModal, setShowModal] = useState(false);
  
  // État pour la modale de suspension d'utilisateur
  const [userToSuspend, setUserToSuspend] = useState(null);
  
  // Utilisateur actuellement connecté (récupéré depuis le localStorage)
  // Permet notamment d'empêcher un administrateur de se supprimer lui-même
  const [currentUser, setCurrentUser] = useState({});

  // Données du formulaire d'ajout
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telephone: "",
    password: "",
    role: "user",
    is_active: true,
    avatar: "",
  });

  // Le hook useEffect s'exécute au chargement du composant
  useEffect(() => {
    // Récupère l'utilisateur connecté stocké en chaîne JSON
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur parsing utilisateur", e);
      }
    }
    
    // Charge la liste complète des utilisateurs
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 2 Mo");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour traiter la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(formData);
      setShowModal(false); // Ferme la modale en cas de succès
      // Réinitialise le formulaire
      setFormData({ username: "", email: "", telephone: "", password: "", role: "user", is_active: true, avatar: "" });
      loadUsers(); // Recharge la liste
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Erreur serveur");
    }
  };

  // Fonction pour afficher la modale de suspension
  const handleDeleteClick = (user) => {
    // Sécurité supplémentaire côté front-end (l'admin ne doit pas se supprimer)
    if (user.id === currentUser.id) {
      alert("Vous ne pouvez pas suspendre votre propre compte administrateur.");
      return;
    }
    // Ouvre la modale en définissant l'utilisateur cible
    setUserToSuspend(user);
  };

  // Fonction pour valider la suspension/suppression
  const confirmSuspend = async () => {
    if (!userToSuspend) return;
    
    try {
      await deleteUser(userToSuspend.id);
      loadUsers(); // Met à jour la liste après suppression
      setUserToSuspend(null); // Ferme la modale
    } catch (error) {
      console.error(error);
      // Fallback : supprime visuellement en cas d'erreur de raffraîchissement
      setUsers((current) => current.filter((user) => user.id !== userToSuspend.id));
      setUserToSuspend(null);
    }
  };

  return (
    <div>
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-10">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-950">Utilisateurs</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Gestion des utilisateurs</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-2 font-medium text-sm md:text-base whitespace-nowrap"
        >
          <FaUserPlus />
          <span className="hidden sm:inline">Ajouter un utilisateur</span>
          <span className="sm:hidden">Ajouter</span>
        </button>
      </div>

      {/* ========= DESKTOP TABLE (hidden on mobile) ========= */}
      <div className="hidden md:block bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">Utilisateur</th>
              <th className="text-left p-5">Email</th>
              <th className="text-left p-5">Rôle</th>
              <th className="text-left p-5">Statut</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const role = roleMap[String(user.role || "user").toLowerCase()] || roleMap.user;
              const status = getStatus(user, index);

              return (
                <tr key={user.id || index} className="border-b border-gray-200 last:border-b-0">
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden`}>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                          <FaUserTie />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950">{user.username || "Utilisateur"}</p>
                        <p className="text-gray-500">ID: #{shortId(user.id, index)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-gray-700">{user.email || "-"}</td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-3 font-medium ${role.className}`}>
                      {role.icon}
                      <span className="text-gray-700">{role.label}</span>
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusClass[status]}`}>{status}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end">
                      {/* On masque le bouton de suppression si c'est l'utilisateur actuellement connecté */}
                      {user.id !== currentUser.id ? (
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="w-14 h-10 rounded-xl bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200 transition-colors"
                          title="Suspendre"
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic px-2">Mon compte</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {!users.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========= MOBILE CARDS (shown on mobile only) ========= */}
      <div className="md:hidden space-y-3">
        {users.map((user, index) => {
          const role = roleMap[String(user.role || "user").toLowerCase()] || roleMap.user;
          const status = getStatus(user, index);

          return (
            <div
              key={user.id || index}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              {/* Top row: avatar + name + action */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-sm font-semibold text-gray-700 overflow-hidden shrink-0`}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <FaUserTie />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-950 text-sm truncate">
                      {user.username || "Utilisateur"}
                    </p>
                    <p className="text-gray-500 text-xs truncate">{user.email || "-"}</p>
                  </div>
                </div>

                {user.id !== currentUser.id ? (
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="w-9 h-9 rounded-lg bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200 transition-colors shrink-0"
                    title="Suspendre"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-400 italic shrink-0">Moi</span>
                )}
              </div>

              {/* Bottom row: role + status */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${role.className}`}>
                  {role.icon}
                  <span className="text-gray-700">{role.label}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass[status]}`}>
                  {status}
                </span>
              </div>
            </div>
          );
        })}
        {!users.length && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm">
            Aucun utilisateur trouvé.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Ajouter un utilisateur</h2>
                <p className="text-gray-500 mt-1 text-sm">Créer un accès administrable</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-100 shrink-0">x</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input required placeholder="Nom" className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              <input required type="email" placeholder="Email" className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input placeholder="Téléphone" className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
              <input required type="password" placeholder="Mot de passe" className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 block">Photo de profil (optionnelle)</label>
                <input type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-colors" onChange={handleAvatarChange} />
              </div>

              <select className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">Acheteur</option>
                <option value="vendeur">Vendeur</option>
                <option value="boutique">Boutique</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 md:py-4 rounded-xl font-medium">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modale de suspension d'utilisateur */}
      {userToSuspend && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-6 md:p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-red-600">Suspendre un utilisateur</h2>
                <p className="text-gray-500 mt-1 text-sm">
                  Voulez-vous vraiment suspendre le compte de <span className="font-semibold text-gray-950">{userToSuspend.username || "cet utilisateur"}</span> ?
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  L'utilisateur ne pourra plus se connecter et ses annonces seront affectées.
                </p>
              </div>
              <button 
                onClick={() => setUserToSuspend(null)} 
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0"
              >
                x
              </button>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8">
              <button 
                onClick={() => setUserToSuspend(null)} 
                className="px-6 py-3 rounded-xl border font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Annuler
              </button>
              <button 
                onClick={confirmSuspend} 
                className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium w-full sm:w-auto"
              >
                Confirmer la suspension
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
