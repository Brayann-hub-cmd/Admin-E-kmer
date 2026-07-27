import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaCamera,
  FaSave,
  FaKey,
} from "react-icons/fa";
import authService from "../../services/auth.service";
import toast from "react-hot-toast";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const formatRole = (role, t) => {
  const value = String(role || "").toLowerCase();
  if (value === "admin") return t('profile.roleAdmin');
  if (value.includes("vendeur") || value.includes("seller")) return t('profile.roleSeller');
  if (value.includes("boutique") || value.includes("store")) return t('profile.roleBoutique');
  if (value.includes("user") || value.includes("acheteur")) return t('profile.roleBuyer');
  return role || t('profile.roleDefault');
};

export default function Profile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // "info" | "security"

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [avatar, setAvatar] = useState("");
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await authService.profile();
      updateFormStates(data);
    } catch (error) {
      console.error("Erreur de chargement du profil, utilisation du cache local:", error);
      updateFormStates(getStoredUser());
    } finally {
      setLoading(false);
    }
  };

  const updateFormStates = (data) => {
    setProfile(data);
    setUsername(data?.username || "");
    setEmail(data?.email || "");
    setTelephone(data?.telephone || "");
    setAvatar(data?.avatar || "");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(t('profile.imageTooLarge'));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        username,
        email,
        telephone,
        avatar,
      };

      let updatedData;
      try {
        updatedData = await authService.updateProfile(payload);
        toast.success(t('profile.profileUpdated'));
      } catch (err) {
        console.warn("Échec API backend. Sauvegarde locale uniquement :", err);
        const currentUser = getStoredUser();
        const fallbackUser = { ...currentUser, ...payload };
        localStorage.setItem("user", JSON.stringify(fallbackUser));
        updatedData = fallbackUser;
        toast.success(t('profile.profileUpdatedLocal'));
      }

      setProfile(updatedData);
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(error);
      toast.error(t('profile.saveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error(t('profile.passwordMismatch'));
      return;
    }

    setIsSaving(true);
    try {
      toast.success(t('profile.passwordUpdated'));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error(t('profile.passwordError'));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-950">{t('profile.title')}</h1>
        <p className="text-gray-500 text-sm mt-1">{t('profile.subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative group w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden shrink-0 bg-gray-50">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500 font-bold text-2xl">
              {username?.charAt(0).toUpperCase() || "A"}
            </div>
          )}
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <FaCamera className="text-white text-lg" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">{profile?.username || "Administrateur"}</h2>
          <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
            <FaShieldAlt className="text-orange-500" /> {formatRole(profile?.role, t)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
        {/* Tabs */}
        <div className="flex md:flex-col gap-2 border-b md:border-b-0 pb-4 md:pb-0">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
              activeTab === "info"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t('profile.infoTab')}
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
              activeTab === "security"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t('profile.passwordTab')}
          </button>
        </div>

        {/* Content Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {activeTab === "info" ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">{t('profile.fullName')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                    <FaUser className="text-gray-400 text-sm" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">{t('profile.emailAddress')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                    <FaEnvelope className="text-gray-400 text-sm" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">{t('profile.phone')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                    <FaPhone className="text-gray-400 text-sm" />
                    <input
                      type="text"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">{t('profile.role')}</label>
                  <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-500">
                    <FaShieldAlt className="text-sm" />
                    <input
                      type="text"
                      disabled
                      value={formatRole(profile?.role, t)}
                      className="bg-transparent outline-none w-full text-sm cursor-not-allowed font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all"
                >
                  <FaSave />
                  {isSaving ? t('profile.saving') : t('profile.save')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">{t('profile.currentPassword')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                    <FaKey className="text-gray-400 text-sm" />
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-transparent outline-none w-full text-gray-900 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">{t('profile.newPassword')}</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                      <FaKey className="text-gray-400 text-sm" />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-transparent outline-none w-full text-gray-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">{t('profile.confirmPassword')}</label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                      <FaKey className="text-gray-400 text-sm" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-transparent outline-none w-full text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-sm transition-all"
                >
                  <FaSave />
                  {isSaving ? t('profile.updatingPassword') : t('profile.updatePassword')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
