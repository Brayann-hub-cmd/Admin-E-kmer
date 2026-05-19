const products = [
  {
    name: "iPhone 15 Pro Max",
    ventes: "125 ventes",
    amount: "6,250,000 FCFA",
  },

  {
    name: "MacBook Air M2",
    ventes: "78 ventes",
    amount: "5,200,000 FCFA",
  },

  {
    name: "Samsung Galaxy S24",
    ventes: "95 ventes",
    amount: "4,275,000 FCFA",
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Top produits
        </h2>

        <button className="text-orange-500 font-medium">
          Voir tout
        </button>
      </div>

      <div className="space-y-5">

        {products.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.ventes}
              </p>
            </div>

            <h3 className="font-bold">
              {product.amount}
            </h3>
          </div>
        ))}

      </div>
    </div>
  );
}