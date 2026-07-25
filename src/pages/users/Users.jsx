import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaStore,
  FaTrash,
  FaUser,
  FaUserPlus,
  FaUserShield,
  FaUserTie,
  FaTruck,
} from "react-icons/fa";
import { createUser, deleteUser, getUsers } from "../../services/users.service";

const avatarColors = ["bg-blue-100", "bg-green-100", "bg-orange-100", "bg-purple-100"];

const shortId = (id, index) => {
  const value = String(id || index + 1);
  return value.length > 8 ? value.slice(0, 8) : value;
};

export default function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telephone: "",
    password: "",
    role: "user",
    is_active: true,
    avatar: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setCurrentUser(JSON.parse(storedUser)); } catch (e) { console.error("Erreur parsing utilisateur", e); }
    }
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
      if (file.size > 2 * 1024 * 1024) { alert("L'image ne doit pas dépasser 2 Mo"); return; }
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(formData);
      setShowModal(false);
      setFormData({ username: "", email: "", telephone: "", password: "", role: "user", is_active: true, avatar: "" });
      loadUsers();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Erreur serveur");
    }
  };

  const handleDeleteClick = (user) => {
    if (user.id === currentUser.id) { alert(t("users.cantSuspendSelf")); return; }
    setUserToSuspend(user);
  };

  const confirmSuspend = async () => {
    if (!userToSuspend) return;
    try {
      await deleteUser(userToSuspend.id);
      loadUsers();
      setUserToSuspend(null);
    } catch (error) {
      console.error(error);
      setUsers((current) => current.filter((user) => user.id !== userToSuspend.id));
      setUserToSuspend(null);
    }
  };

  const roleConfig = {
    admin: { label: t("users.roleAdmin"), icon: <FaUserShield />, className: "text-purple-500" },
    vendeur: { label: t("users.roleSeller"), icon: <FaUser />, className: "text-blue-500" },
    seller: { label: t("users.roleSeller"), icon: <FaUser />, className: "text-blue-500" },
    user: { label: t("users.roleBuyer"), icon: <FaUser />, className: "text-blue-500" },
    buyer: { label: t("users.roleBuyer"), icon: <FaUser />, className: "text-blue-500" },
    acheteur: { label: t("users.roleBuyer"), icon: <FaUser />, className: "text-blue-500" },
    boutique: { label: t("users.roleBoutique"), icon: <FaStore />, className: "text-orange-500" },
    store: { label: t("users.roleBoutique"), icon: <FaStore />, className: "text-orange-500" },
    livreur: { label: t("users.roleDriver"), icon: <FaTruck />, className: "text-emerald-500" },
    driver: { label: t("users.roleDriver"), icon: <FaTruck />, className: "text-emerald-500" },
  };

  const getStatus = (user) => {
    if (user.status === "pending") return t("users.pending");
    if (user.status === "suspended" || user.is_active === false) return t("users.suspended");
    return t("users.active");
  };

  const statusClass = {
    [t("users.active")]: "bg-green-100 text-green-700",
    [t("users.pending")]: "bg-yellow-100 text-yellow-700",
    [t("users.suspended")]: "bg-red-100 text-red-700",
  };

  const filterRoles = {
    all: () => true,
    admin: (u) => u.role === "admin",
    vendeur: (u) => u.role === "vendeur" || u.role === "seller",
    user: (u) => u.role === "user" || u.role === "buyer" || u.role === "acheteur",
    livreur: (u) => u.role === "livreur" || u.role === "driver",
  };

  const filteredUsers = filterRoles[filter] ? users.filter(filterRoles[filter]) : users;

  const counts = {
    all: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    vendeur: users.filter((u) => u.role === "vendeur" || u.role === "seller").length,
    user: users.filter((u) => u.role === "user" || u.role === "buyer" || u.role === "acheteur").length,
    livreur: users.filter((u) => u.role === "livreur" || u.role === "driver").length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-10">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-950">{t("users.title")}</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">{t("users.subtitle")}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-2 font-medium text-sm md:text-base whitespace-nowrap">
          <FaUserPlus />
          <span className="hidden sm:inline">{t("users.addUser")}</span>
          <span className="sm:hidden">{t("users.add")}</span>
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {["all", "admin", "vendeur", "user", "livreur"].map((key) => (
          <button key={key} onClick={() => setFilter(key)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${filter === key ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {t(`users.filter${key.charAt(0).toUpperCase() + key.slice(1)}`)} <span className="opacity-75">({counts[key]})</span>
          </button>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">{t("users.username")}</th>
              <th className="text-left p-5">{t("users.email")}</th>
              <th className="text-left p-5">{t("users.phone")}</th>
              <th className="text-left p-5">{t("users.role")}</th>
              <th className="text-left p-5">{t("users.status")}</th>
              <th className="text-right p-5">{t("users.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const role = roleConfig[String(user.role || "user").toLowerCase()] || roleConfig.user;
              const status = getStatus(user);
              return (
                <tr key={user.id || index} className="border-b border-gray-200 last:border-b-0">
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden`}>
                        {user.avatar ? <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" /> : <FaUserTie />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950">{user.username || "—"}</p>
                        <p className="text-gray-500">ID: #{shortId(user.id, index)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-gray-700">{user.email || "—"}</td>
                  <td className="p-5 text-gray-700">{user.telephone || "—"}</td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-3 font-medium ${role.className}`}>
                      {role.icon}
                      <span className="text-gray-700">{role.label}</span>
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusClass[status] || ""}`}>{status}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end">
                      {user.id !== currentUser.id ? (
                        <button onClick={() => handleDeleteClick(user)} className="w-14 h-10 rounded-xl bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200 transition-colors" title={t("users.suspend")}>
                          <FaTrash />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic px-2">{t("users.myAccount")}</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {!filteredUsers.length && (
              <tr><td colSpan="6" className="p-10 text-center text-gray-500">{t("users.noUsers")}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {filteredUsers.map((user, index) => {
          const role = roleConfig[String(user.role || "user").toLowerCase()] || roleConfig.user;
          const status = getStatus(user);
          return (
            <div key={user.id || index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-sm font-semibold text-gray-700 overflow-hidden shrink-0`}>
                    {user.avatar ? <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" /> : <FaUserTie />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-950 text-sm truncate">{user.username || "—"}</p>
                    <p className="text-gray-500 text-xs truncate">{user.email || "—"}</p>
                  </div>
                </div>
                {user.id !== currentUser.id ? (
                  <button onClick={() => handleDeleteClick(user)} className="w-9 h-9 rounded-lg bg-red-100 text-red-500 inline-flex items-center justify-center hover:bg-red-200 transition-colors shrink-0">
                    <FaTrash className="text-xs" />
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-400 italic shrink-0">{t("users.me")}</span>
                )}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${role.className}`}>
                  {role.icon}
                  <span className="text-gray-700">{role.label}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass[status] || ""}`}>{status}</span>
              </div>
            </div>
          );
        })}
        {!filteredUsers.length && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm">{t("users.noUsers")}</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">{t("users.addUserTitle")}</h2>
                <p className="text-gray-500 mt-1 text-sm">{t("users.addUserSubtitle")}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-100 shrink-0">x</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input required placeholder={t("users.username")} className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              <input required type="email" placeholder={t("users.email")} className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input placeholder={t("users.phone")} className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
              <input required type="password" placeholder={t("users.password")} className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 block">{t("users.photo")}</label>
                <input type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-colors" onChange={handleAvatarChange} />
              </div>
              <select className="w-full border p-3 md:p-4 rounded-xl text-sm md:text-base" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">{t("users.roleBuyer")}</option>
                <option value="vendeur">{t("users.roleSeller")}</option>
                <option value="boutique">{t("users.roleBoutique")}</option>
                <option value="livreur">{t("users.roleDriver")}</option>
                <option value="admin">{t("users.roleAdmin")}</option>
              </select>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 md:py-4 rounded-xl font-medium">{t("users.confirm")}</button>
            </form>
          </div>
        </div>
      )}

      {userToSuspend && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-[520px] max-w-full rounded-3xl p-6 md:p-8">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-red-600">{t("users.suspendTitle")}</h2>
                <p className="text-gray-500 mt-1 text-sm">{t("users.suspendText", { name: userToSuspend.username || "" })}</p>
                <p className="text-sm text-gray-400 mt-2">{t("users.suspendWarning")}</p>
              </div>
              <button onClick={() => setUserToSuspend(null)} className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 shrink-0">x</button>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8">
              <button onClick={() => setUserToSuspend(null)} className="px-6 py-3 rounded-xl border font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto">{t("users.cancel")}</button>
              <button onClick={confirmSuspend} className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium w-full sm:w-auto">{t("users.confirmSuspend")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
