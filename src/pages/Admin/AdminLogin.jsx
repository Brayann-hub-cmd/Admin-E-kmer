import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";

export default function AdminLogin() {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="min-h-screen bg-[#f3efe9] flex items-center justify-center px-4 py-8 overflow-hidden">

      {/* CARD PRINCIPALE */}
      <div className="w-full max-w-6xl bg-white rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] grid grid-cols-1 lg:grid-cols-2">

        {/* ===================== LEFT ===================== */}
        <div className="bg-[#071427] relative text-white p-8 lg:p-12 flex flex-col justify-between overflow-hidden">

          {/* GLOW */}
          <div className="absolute w-[420px] h-[420px] bg-orange-500 rounded-full blur-3xl opacity-25 -bottom-44 left-1/2 -translate-x-1/2"></div>

          {/* TOP */}
          <div className="relative z-10">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">

                <FaLock className="text-white text-xl" />

              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  <span className="text-orange-500">
                    E-Kmer
                  </span>
                </h1>

                <p className="text-gray-400 text-sm">
                  Marketplace Admin
                </p>

              </div>

            </div>

          </div>

          {/* TEXT */}
          <div className="relative z-10 mt-10">

            <p className="text-2xl text-gray-300">
              Bienvenue sur
            </p>

            <h2 className="text-5xl font-bold leading-tight mt-2">

              <span className="text-orange-500">
                E-Kmer
              </span>{" "}

              Admin

            </h2>

            <p className="text-gray-300 mt-6 leading-8 max-w-md">

              Gérez votre marketplace, vos utilisateurs,
              vos ventes, vos commandes et vos statistiques
              depuis votre espace administrateur moderne.

            </p>

            <div className="w-20 h-1 bg-orange-500 rounded-full mt-6"></div>

          </div>

          {/* MOCKUP */}
          <div className="relative z-10 mt-10 flex justify-center">

            {/* LAPTOP */}
            <div className="relative w-full max-w-md bg-[#111827] rounded-[28px] border border-gray-700 p-4 shadow-2xl">

              {/* TOP DOTS */}
              <div className="flex gap-2 mb-4">

                <div className="w-3 h-3 rounded-full bg-red-400"></div>

                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

                <div className="w-3 h-3 rounded-full bg-green-400"></div>

              </div>

              {/* CARDS */}
              <div className="grid grid-cols-3 gap-3 mb-4">

                <div className="bg-[#1f2937] rounded-2xl p-3 h-16">

                  <div className="w-8 h-1.5 bg-orange-500 rounded mb-2"></div>

                  <div className="w-10 h-3 bg-gray-600 rounded"></div>

                </div>

                <div className="bg-[#1f2937] rounded-2xl p-3 h-16">

                  <div className="w-8 h-1.5 bg-orange-400 rounded mb-2"></div>

                  <div className="w-10 h-3 bg-gray-600 rounded"></div>

                </div>

                <div className="bg-[#1f2937] rounded-2xl p-3 h-16">

                  <div className="w-8 h-1.5 bg-orange-300 rounded mb-2"></div>

                  <div className="w-10 h-3 bg-gray-600 rounded"></div>

                </div>

              </div>

              {/* GRAPH */}
              <div className="bg-[#1f2937] rounded-3xl h-44 flex items-end justify-center gap-4 p-5">

                <div className="w-7 h-16 bg-orange-500 rounded-xl"></div>

                <div className="w-7 h-28 bg-orange-400 rounded-xl"></div>

                <div className="w-7 h-14 bg-orange-300 rounded-xl"></div>

                <div className="w-7 h-36 bg-orange-500 rounded-xl"></div>

                <div className="w-7 h-24 bg-orange-400 rounded-xl"></div>

              </div>

            </div>

            {/* FLOAT CARD */}
            <div className="absolute left-[-10px] top-12 bg-[#1a2436] border border-gray-700 rounded-2xl p-4 shadow-xl">

              <p className="text-white text-xl font-bold">
                25.4M
              </p>

              <p className="text-gray-400 text-xs">
                Revenus
              </p>

              <div className="flex gap-1 mt-3 items-end">

                <div className="w-1.5 h-3 bg-orange-500 rounded"></div>

                <div className="w-1.5 h-6 bg-orange-400 rounded"></div>

                <div className="w-1.5 h-4 bg-orange-300 rounded"></div>

                <div className="w-1.5 h-7 bg-orange-500 rounded"></div>

              </div>

            </div>

            {/* FLOAT CARD */}
            <div className="absolute left-5 bottom-3 bg-[#1a2436] border border-gray-700 rounded-2xl p-4 shadow-xl">

              <p className="text-white text-xl font-bold">
                1,248
              </p>

              <p className="text-gray-400 text-xs">
                Utilisateurs
              </p>

              <div className="w-14 h-1 bg-green-400 rounded-full mt-3"></div>

            </div>

          </div>

          {/* FOOTER */}
          <p className="relative z-10 text-gray-500 text-xs mt-10">
            © 2026 E-Kmer — Tous droits réservés.
          </p>

        </div>

        {/* ===================== RIGHT ===================== */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">

          {/* ICON */}
          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">

              <FaShieldAlt className="text-orange-500 text-4xl" />

            </div>

          </div>

          {/* TITLE */}
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Connexion administrateur
          </h2>

          <p className="text-center text-gray-500 mt-3">
            Veuillez vous connecter pour accéder au tableau de bord
          </p>

          {/* FORM */}
          <form className="mt-10 space-y-6">

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email
              </label>

              <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4 hover:border-orange-400 transition">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  placeholder="admin@ekmer.com"
                  className="w-full ml-3 outline-none"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Mot de passe
              </label>

              <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4 hover:border-orange-400 transition">

                <FaLock className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full ml-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}

                </button>

              </div>

            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">

                <input
                  type="checkbox"
                  className="accent-orange-500"
                />

                Se souvenir de moi

              </label>

              <button
                type="button"
                className="text-orange-500 font-medium hover:text-orange-600"
              >
                Mot de passe oublié ?
              </button>

            </div>

            {/* BTN */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-200"
            >

              Se connecter

              <FaArrowRight />

            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">

              <div className="flex-1 h-[1px] bg-gray-200"></div>

              <span className="text-gray-400 text-sm">
                ou continuer avec
              </span>

              <div className="flex-1 h-[1px] bg-gray-200"></div>

            </div>

            {/* SOCIALS */}
            <div className="grid grid-cols-2 gap-4">

              {/* GOOGLE */}
              <button
                type="button"
                className="border border-gray-300 rounded-2xl py-3.5 hover:bg-gray-50 transition flex items-center justify-center gap-3 font-semibold"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.193 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.173 0-9.625-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>

                Google

              </button>

              {/* MICROSOFT */}
              <button
                type="button"
                className="border border-gray-300 rounded-2xl py-3.5 hover:bg-gray-50 transition flex items-center justify-center gap-3 font-semibold"
              >

                <div className="grid grid-cols-2 gap-[2px]">

                  <div className="w-2.5 h-2.5 bg-red-500"></div>

                  <div className="w-2.5 h-2.5 bg-green-500"></div>

                  <div className="w-2.5 h-2.5 bg-blue-500"></div>

                  <div className="w-2.5 h-2.5 bg-yellow-400"></div>

                </div>

                Microsoft

              </button>

            </div>

            {/* SECURITY */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between mt-2">

              <div className="flex items-center gap-3">

                <div className="bg-orange-100 p-3 rounded-2xl">

                  <FaShieldAlt className="text-orange-500 text-xl" />

                </div>

                <div>

                  <h3 className="font-bold text-gray-900 text-sm">
                    Accès sécurisé
                  </h3>

                  <p className="text-gray-500 text-xs mt-1">
                    Vos données sont protégées avec un chiffrement professionnel.
                  </p>

                </div>

              </div>

              <FaCheckCircle className="text-green-500 text-xl" />

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}