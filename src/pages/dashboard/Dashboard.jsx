import { FaUsers, FaBox, FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";
import StatCard  from "../../components/ui/StatCard";
import OrderItem from "../../components/ui/OrderItem";
import { FaBoxArchive } from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { BsBoxSeamFill } from "react-icons/bs";

const stats = [
  { icon: <FaUsers />,        title: "Utilisateurs", value: "12 458", growth: "12.5%", bgColor: "bg-blue-100",   iconColor: "text-blue-500"   },
  { icon: <BsBoxSeamFill />,          title: "Ventes",       value: "12 458", growth: "8.3%",  bgColor: "bg-purple-100", iconColor: "text-purple-500" },
  { icon: <FaDollarSign />,   title: "Achats",       value: "12 458", growth: "15.7%", bgColor: "bg-green-100",  iconColor: "text-green-500"  },
  { icon: <FaShoppingCart />, title: "Commandes",    value: "12 458", growth: "22.4%", bgColor: "bg-orange-100", iconColor: "text-orange-500" },
];

const orders = [
  { id: "#12458", name: "Jean Dupont",   price: "650 000 FCFA",   status: "livre"   },
  { id: "#12457", name: "Maria Kouam",   price: "120 000 FCFA",   status: "expedie" },
  { id: "#12456", name: "Paul Ngono",    price: "85 000 FCFA",    status: "encours" },
  { id: "#12455", name: "Sophie Mballa", price: "1 200 000 FCFA", status: "annule"  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord administrateur</h1>
        <p className="text-gray-400 text-sm mt-1">Gérer votre plateforme E-kmer en toute simplicité</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Commandes récentes</h2>
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderItem key={order.id} {...order} />
          ))}
        </div>
      </div>

    </div>
  );
}