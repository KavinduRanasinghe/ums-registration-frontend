import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {

  return (

    <div className="flex bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <div className="flex-1 min-h-screen p-6">

        {children}

      </div>

    </div>
  );
}