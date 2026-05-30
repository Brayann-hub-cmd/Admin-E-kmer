import {
  FaWallet,
  FaShoppingCart,
  FaUsers,
  FaChartPie,
} from "react-icons/fa";

import StatCard from "../ui/StatCard";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Volume des ventes",
    value: "12,580,000 FCFA",
    growth: "+18.5%",
    icon: <FaWallet />,
    color: "bg-orange-100 text-orange-500",
    link: "/ventes"
  },

  {
    title: "Commandes",
    value: "320",
    growth: "+12.5%",
    icon: <FaShoppingCart />,
    color: "bg-purple-100 text-purple-500",
    link: "/commandes"
  },

  {
    title: "Utilisateurs actifs",
    value: "2,845",
    growth: "+8.3%",
    icon: <FaUsers />,
    color: "bg-green-100 text-green-500",
    link: "/utilisateurs"
  },

  {
    title: "Panier moyen",
    value: "48,500 FCFA",
    growth: "+5.7%",
    icon: <FaChartPie />,
    color: "bg-blue-100 text-blue-500",
    link: "/panier-moyen"
  },
];

export default function StatsCards() {
  const [panier,setPanier] = useState([])
  const getTotalVentes = async () => {

  }

  const getNombreCommandes = async () =>{

  }

  const getUtilisateursActifs = async () =>{

  }

  const getMoyenPanier = async () =>{
    try {
      const res = await api.get("panier/")
      console.log(res.data);
      
      setPanier(res.data)

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(
    ()=>{
      getMoyenPanier()
    },[]
  )
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

      {stats.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          growth={item.growth}
          icon={item.icon}
          color={item.color}
          link={item.link}
        />
      ))}

    </div>
  );
}