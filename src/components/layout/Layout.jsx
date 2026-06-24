import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-[#f5f5f5] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5 xl:p-6 overflow-y-auto">

        <Topbar />

        {children}

      </div>

    </div>
  );
}
