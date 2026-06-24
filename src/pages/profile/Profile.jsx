import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import authService from "../../services/auth.service";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const formatRole = (role) => {
  const value = String(role || "").toLowerCase();
  if (value === "admin") return "Administrateur";
  if (value.includes("vendeur") || value.includes("seller")) return "Vendeur";
  if (value.includes("boutique") || value.includes("store")) return "Boutique";
  if (value.includes("user") || value.includes("acheteur")) return "Acheteur";
  return role || "-";
};

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await authService.profile();
      setProfile(data);
    } catch (error) {
      console.error(error);
      setProfile(getStoredUser());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Chargement...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-950">Profil</h1>
        <p className="text-gray-500 mt-1">Informations du compte administrateur</p>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <FaUserCircle className="text-5xl text-gray-900" />
          <div>
            <h2 className="text-xl font-semibold text-gray-950">{profile?.username || "Administrateur"}</h2>
            <p className="text-gray-500">{formatRole(profile?.role)}</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <dt className="text-sm text-gray-500">Nom</dt>
            <dd className="font-medium text-gray-900 mt-1">{profile?.username || "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900 mt-1">{profile?.email || "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Téléphone</dt>
            <dd className="font-medium text-gray-900 mt-1">{profile?.telephone || "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Rôle</dt>
            <dd className="font-medium text-gray-900 mt-1">{formatRole(profile?.role)}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
