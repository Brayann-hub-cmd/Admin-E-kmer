import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await authService.login(email, password);

      const { token, user } = res.data;

      if (user.role !== "admin") {
        setError("Accès réservé aux administrateurs");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Email ou mot de passe incorrect"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px]">

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-950">
          Admin E-Kmer
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label>Email</label>

            <input
              type="email"
              className="w-full border p-3 rounded-lg mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label>Mot de passe</label>

            <input
              type="password"
              className="w-full border p-3 rounded-lg mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>

    </div>
  );
}
