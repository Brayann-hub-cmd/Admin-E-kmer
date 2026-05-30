import Layout from "../../components/layout/Layout";

export default function Profile() {
  return (
    <Layout>

      <div className="bg-white rounded-3xl p-8 shadow-sm max-w-3xl">

        <div className="flex items-center gap-6">

          <img
            src="https://randomuser.me/api/portraits"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover"
          />

          <div>

            <h1 className="text-3xl font-bold">
              Admin Marketplace
            </h1>

            <p className="text-gray-500 mt-2">
              Super administrateur
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div>

            <label className="text-sm text-gray-500">
              Email
            </label>

            <input
              type="text"
              value="admin@ekmer.com"
              readOnly
              className="w-full border rounded-xl p-3 mt-2"
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">
              Téléphone
            </label>

            <input
              type="text"
              value="+237 670000000"
              readOnly
              className="w-full border rounded-xl p-3 mt-2"
            />

          </div>

        </div>

      </div>

    </Layout>
  );
}