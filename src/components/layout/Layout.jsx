import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-[#f5f5f5] min-h-screen">
      <Sidebar />
      {/* Main content: on mobile full width with top padding for hamburger,
          on md offset by collapsed sidebar width (72px),
          on lg offset by full sidebar (260px) */}
      <div className="flex-1 min-w-0 p-4 pt-16 md:pt-5 md:p-5 xl:p-6 overflow-y-auto overflow-x-hidden">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
