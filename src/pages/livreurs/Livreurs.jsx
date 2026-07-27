import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaRedo,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import api from "../../services/api";

const initialPartner = {
  username: "",
  email: "",
  telephone: "",
  password: "",
  type_vehicule: "",
  num_permis: "",
  num_plaque: "",
};

const getStatus = (partner) =>
  partner.disponible ? "actif" : "suspendu";

const getName = (partner) =>
  partner.nom_complet || partner.username || "—";

export default function Livreurs() {
  const { t } = useTranslation();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("tous");
  const [showCreate, setShowCreate] = useState(false);
  const [newPartner, setNewPartner] = useState(initialPartner);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const statusConfig = {
    actif: { label: t("users.active"), className: "bg-green-100 text-green-700" },
    suspendu: { label: t("users.suspended"), className: "bg-red-100 text-red-700" },
  };

  const loadPartners = async () => {
    setLoading(true);
    try {
      const response = await api.get("livreurs/");
      setPartners(Array.isArray(response.data) ? response.data : response.data.results || []);
    } catch (error) {
      console.error("Erreur chargement livreurs :", error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = {
        email: newPartner.email,
        telephone: newPartner.telephone,
        username: newPartner.username || "Livreur",
        password: newPartner.password || "E-Kmer" + Date.now().toString().slice(-4) + "!",
      };
      if (newPartner.type_vehicule) payload.type_vehicule = newPartner.type_vehicule;
      if (newPartner.num_permis) payload.num_permis = newPartner.num_permis;
      if (newPartner.num_plaque) payload.num_plaque = newPartner.num_plaque;
      await api.post("auth/livreur/register/", payload);
      setNewPartner(initialPartner);
      setShowCreate(false);
      setMessage(t("delivery.created", { password: payload.password }));
      loadPartners();
    } catch (error) {
      setMessage(error.response?.data?.error || "Erreur.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatus = async (partner, disponible) => {
    setMessage("");
    try {
      await api.patch(`livreurs/${partner.id}/`, { disponible });
      setMessage(disponible ? t("delivery.activated") : t("delivery.suspendedMsg"));
      loadPartners();
    } catch (error) {
      setMessage(error.response?.data?.error || "Erreur.");
    }
  };

  const counts = {
    tous: partners.length,
    actif: partners.filter((p) => getStatus(p) === "actif").length,
    suspendu: partners.filter((p) => getStatus(p) === "suspendu").length,
  };

  const filteredPartners = filter === "tous"
    ? partners
    : partners.filter((p) => getStatus(p) === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-10">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-950">{t("delivery.title")}</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">{t("delivery.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowCreate(true)} className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm whitespace-nowrap">
            <FaPlus /> {t("delivery.addLivreur")}
          </button>
          <button onClick={loadPartners} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm whitespace-nowrap">
            <FaRedo /> {t("delivery.refresh")}
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">{t("delivery.activeDrivers")}</p><p className="mt-1 text-2xl font-semibold text-gray-950">{counts.actif}</p></div>
        <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">{t("delivery.suspended")}</p><p className="mt-1 text-2xl font-semibold text-gray-950">{counts.suspendu}</p></div>
      </div>

      {message && <div className="mb-5 rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-800">{message}</div>}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {["tous", "actif", "suspendu"].map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${filter === item ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {item === "tous" ? t("users.filterAll") : statusConfig[item].label} <span className="opacity-75">({counts[item]})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="text-left p-5">{t("delivery.driver")}</th>
              <th className="text-left p-5">{t("delivery.vehicle")}</th>
              <th className="text-left p-5">{t("delivery.routes")}</th>
              <th className="text-left p-5">{t("users.status")}</th>
              <th className="text-right p-5">{t("users.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-10 text-center text-gray-400">...</td></tr>
            ) : filteredPartners.length === 0 ? (
              <tr><td colSpan="5" className="p-10 text-center text-gray-400">{t("users.noUsers")}</td></tr>
            ) : filteredPartners.map((partner) => {
              const status = getStatus(partner);
              const config = statusConfig[status] || statusConfig.actif;
              const routes = partner.trajets || [];
              return (
                <tr key={partner.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-100 text-orange-600"><FaTruck /></span>
                      <div>
                        <p className="font-semibold text-gray-950">{getName(partner)}</p>
                        <p className="text-sm text-gray-500">{partner.user.email || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-gray-700 text-sm">
                    {partner.type_vehicule || "—"}
                    {partner.num_plaque && <span className="block text-xs text-gray-400">{partner.num_plaque}</span>}
                  </td>
                  <td className="p-5 text-gray-700 text-sm">
                    {routes.length > 0 ? routes.map((r) => (
                      <span key={r.id} className="inline-block mr-1 mb-1 px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                        {r.ville_depart} → {r.ville_arrivee} ({r.tarif} FCFA)
                      </span>
                    )) : <span className="text-gray-400">{t("delivery.noRoutes")}</span>}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${config.className}`}>{config.label}</span>
                  </td>
                  <td className="p-5 text-right">
                    {status === "actif"
                      ? <button onClick={() => handleStatus(partner, false)} className="text-sm font-medium text-red-600 hover:underline">{t("delivery.suspend")}</button>
                      : <button onClick={() => handleStatus(partner, true)} className="text-sm font-medium text-green-600 hover:underline">{t("delivery.activate")}</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="md:hidden divide-y divide-gray-100">
          {loading ? (
            <p className="p-8 text-center text-gray-400">...</p>
          ) : filteredPartners.length === 0 ? (
            <p className="p-8 text-center text-gray-400">{t("users.noUsers")}</p>
          ) : filteredPartners.map((partner) => {
            const status = getStatus(partner);
            const config = statusConfig[status] || statusConfig.actif;
            const routes = partner.trajets || [];
            return (
              <div key={partner.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-100 text-orange-600"><FaTruck /></span>
                    <div>
                      <p className="font-semibold">{getName(partner)}</p>
                      <p className="text-sm text-gray-500">{partner.email || ""}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-gray-600">
                  {partner.type_vehicule && <span className="flex items-center gap-2"><FaTruck className="text-orange-500" />{partner.type_vehicule} {partner.num_plaque || ""}</span>}
                  {routes.length > 0 && <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-500" />{routes.map((r) => `${r.ville_depart}→${r.ville_arrivee}`).join(', ')}</span>}
                </div>
                <div className="mt-3">
                  {status === "actif"
                    ? <button onClick={() => handleStatus(partner, false)} className="text-sm font-medium text-red-600 hover:underline">{t("delivery.suspend")}</button>
                    : <button onClick={() => handleStatus(partner, true)} className="text-sm font-medium text-green-600 hover:underline">{t("delivery.activate")}</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form onSubmit={handleCreate} className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t("delivery.addTitle")}</h2>
                <p className="mt-1 text-sm text-gray-500">{t("delivery.addSubtitle")}</p>
              </div>
              <button type="button" onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700" aria-label="Close">
                <FaTimesCircle className="text-xl" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={`${t("delivery.name")} *`} value={newPartner.username} onChange={(value) => setNewPartner({ ...newPartner, username: value })} />
              <Field label={`${t("delivery.email")} *`} type="email" value={newPartner.email} onChange={(value) => setNewPartner({ ...newPartner, email: value })} />
              <Field label={`${t("delivery.phone")} *`} type="tel" value={newPartner.telephone} onChange={(value) => setNewPartner({ ...newPartner, telephone: value })} />
              <Field label={t("delivery.password")} type="password" value={newPartner.password} onChange={(value) => setNewPartner({ ...newPartner, password: value })} placeholder={t("delivery.passwordAuto")} />
              <Field label={t("delivery.vehicleType")} value={newPartner.type_vehicule} onChange={(value) => setNewPartner({ ...newPartner, type_vehicule: value })} placeholder="Moto, Voiture..." />
              <Field label={t("delivery.licenseNumber")} value={newPartner.num_permis} onChange={(value) => setNewPartner({ ...newPartner, num_permis: value })} />
              <Field label={t("delivery.plateNumber")} value={newPartner.num_plaque} onChange={(value) => setNewPartner({ ...newPartner, num_plaque: value })} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-lg px-4 py-2 text-gray-600">{t("users.cancel")}</button>
              <button disabled={submitting} type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-white font-medium text-sm disabled:opacity-50">
                {submitting ? t("delivery.creating") : t("delivery.create")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, type = "text", value, onChange, placeholder = "" }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {label}
      <input
        required={label.includes("*")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-orange-500"
      />
    </label>
  );
}
