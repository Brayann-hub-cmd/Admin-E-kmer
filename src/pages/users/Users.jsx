import { useEffect, useState } from "react";
import { FaStore, FaTrash, FaUser, FaUserPlus, FaUserShield, FaUserTie } from "react-icons/fa";
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
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telephone: "",
    password: "",
    role: "user",
    is_active: true,
  });

  useEffect(() => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(formData);
      setShowModal(false);
      setFormData({ username: "", email: "", telephone: "", password: "", role: "user", is_active: true });
      loadUsers();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Erreur serveur");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error(error);
      setUsers((current) => current.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Utilisateurs</h1>
          <p className="text-gray-500 mt-1">Gestion des utilisateurs</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <FaUserPlus />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-14 h-10 rounded-xl bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] max-w-[92vw] rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Ajouter un utilisateur</h2>
                <p className="text-gray-500 mt-1">Créer un accès administrable</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-11 h-11 rounded-xl bg-gray-100">x</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Nom" className="w-full border p-4 rounded-xl" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              <input required type="email" placeholder="Email" className="w-full border p-4 rounded-xl" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input placeholder="Téléphone" className="w-full border p-4 rounded-xl" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
              <input required type="password" placeholder="Mot de passe" className="w-full border p-4 rounded-xl" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <select className="w-full border p-4 rounded-xl" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">Acheteur</option>
                <option value="vendeur">Vendeur</option>
                <option value="boutique">Boutique</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-xl font-medium">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
