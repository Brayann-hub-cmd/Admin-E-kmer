import { useState } from "react";
import {
  FaTrash,
  FaUserCircle,
  FaStore,
  FaUserTie,
} from "react-icons/fa";

export default function Users() {

  const [selectedUser, setSelectedUser] = useState(null);

  const [reason, setReason] = useState("");

  const [showModal, setShowModal] = useState(false);

  const users = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Vendeur",
      status: "Actif",
      email: "jean@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },

    {
      id: 2,
      name: "Fatou Ndiaye",
      role: "Acheteur",
      status: "En attente",
      email: "fatou@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },

    {
      id: 3,
      name: "TechStore",
      role: "Boutique",
      status: "Suspendu",
      email: "techstore@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },

    {
      id: 4,
      name: "Admin Support",
      role: "Admin",
      status: "Actif",
      email: "admin@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const getStatusStyle = (status) => {

    switch (status) {

      case "Actif":
        return "bg-green-100 text-green-700";

      case "Suspendu":
        return "bg-red-100 text-red-700";

      case "En attente":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleIcon = (role) => {

    switch (role) {

      case "Boutique":
        return <FaStore className="text-orange-500" />;

      case "Admin":
        return <FaUserTie className="text-purple-500" />;

      default:
        return <FaUserCircle className="text-blue-500" />;
    }
  };

  const handleDeleteRequest = async () => {

    if (!reason.trim()) {
      alert("Veuillez saisir une justification");
      return;
    }

    try {

      //  API 
      /*
      
      */

      console.log({
        user: selectedUser,
        reason,
      });

      alert("Demande envoyée à l'administration");

      setShowModal(false);

      setReason("");

      setSelectedUser(null);

    } catch (error) {

      console.error(error);

      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Utilisateurs
          </h1>

          <p className="text-gray-500 mt-2">
            Gestion des utilisateur 
          </p>

        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition">

          Ajouter un utilisateur

        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Utilisateur
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Rôle
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Statut
                </th>

                <th className="text-right p-5 text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* USER */}
                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>

                        <h2 className="font-semibold text-gray-900">
                          {user.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          ID: #{user.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* EMAIL */}
                  <td className="p-5 text-gray-600">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="p-5">

                    <div className="flex items-center gap-2">

                      {getRoleIcon(user.role)}

                      <span className="font-medium text-gray-700">
                        {user.role}
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="p-5">

                    <div className="flex justify-end">

                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-xl transition"
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

      </div>

      {/* MODAL */}
      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl w-full max-w-xl p-7 animate-in fade-in zoom-in duration-200">

              <div className="flex items-center gap-4 mb-5">

                <div className="bg-red-100 text-red-500 p-4 rounded-2xl">

                  <FaTrash className="text-2xl" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Demande de suppression
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Cette action nécessite une validation administrative.
                  </p>

                </div>

              </div>

              {/* USER */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5">

                <div className="flex items-center gap-4">

                  <img
                    src={selectedUser?.avatar}
                    alt={selectedUser?.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="font-semibold text-lg">
                      {selectedUser?.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {selectedUser?.email}
                    </p>

                  </div>

                </div>

              </div>

              {/* TEXTAREA */}
              <div>

                <label className="text-sm font-medium text-gray-700">

                  Justification

                </label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={5}
                  placeholder="Expliquez pourquoi cet utilisateur doit être supprimé..."
                  className="w-full border border-gray-200 rounded-2xl p-4 mt-2 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-4 mt-7">

                <button
                  onClick={() => {
                    setShowModal(false);
                    setReason("");
                  }}
                  className="px-5 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Annuler
                </button>

                <button
                  onClick={handleDeleteRequest}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl transition font-medium"
                >
                  Envoyer la demande
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}
