import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import usersService from "../../services/users.service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

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
      const data = await usersService.getAll();

      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Erreur chargement utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);

    setFormData({
      username: "",
      email: "",
      telephone: "",
      password: "",
      role: "user",
      is_active: true,
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setFormData({
      username: user.username,
      email: user.email,
      telephone: user.telephone,
      password: user.password,
      role: user.role,
      is_active: user.is_active,
    });

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await usersService.update(
          editingUser.id,
          formData
        );
      } else {
        await usersService.create(formData);
      }

      setShowModal(false);

      loadUsers();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.error ||
          "Erreur serveur"
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Supprimer cet utilisateur ?"
      )
    )
      return;

    try {
      await usersService.delete(id);

      loadUsers();
    } catch (error) {
      console.error(error);

      alert("Impossible de supprimer");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Chargement...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Utilisateurs
          </h1>

          <p className="text-gray-500">
            Gestion des utilisateurs
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-5
          py-3
          rounded-xl
          flex
          items-center
          gap-2
        "
        >
          <FaPlus />

          Ajouter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Nom
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Téléphone
              </th>

              <th className="text-left p-4">
                Rôle
              </th>

              <th className="text-left p-4">
                Statut
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.telephone}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {user.is_active
                      ? "Actif"
                      : "Inactif"}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        openEditModal(user)
                      }
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (
        <div
          className="
          fixed inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
        "
        >
          <div
            className="
            bg-white
            w-[500px]
            rounded-2xl
            p-6
          "
          >
            <div className="flex justify-between mb-5">

              <h2 className="text-xl font-bold">
                {editingUser
                  ? "Modifier"
                  : "Ajouter"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                placeholder="Nom"
                className="w-full border p-3 rounded-xl"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />

              <input
                placeholder="Email"
                className="w-full border p-3 rounded-xl"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <input
                placeholder="Téléphone"
                className="w-full border p-3 rounded-xl"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telephone: e.target.value,
                  })
                }
              />

              <input
                placeholder="Mot de passe"
                className="w-full border p-3 rounded-xl"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-3 rounded-xl"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <button
                className="
                w-full
                bg-orange-500
                text-white
                py-3
                rounded-xl
              "
              >
                {editingUser
                  ? "Modifier"
                  : "Créer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}