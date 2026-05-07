import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Student Registration",
      path: "/student-registration"
    },

    {
      name: "Students",
      path: "/students"
    },

    {
      name: "Allocation",
      path: "/allocation"
    },

    {
      name: "Course Registration",
      path: "/course-registration"
    },

    {
      name: "Admin Approval",
      path: "/admin-approval"
    },

    {
      name: "Modules Management",
      path: "/modules-management"
    }
  ];

  return (

    <div
      className="
        fixed
        top-0
        left-0
        h-screen
        w-72
        bg-slate-900
        text-white
        p-6
        shadow-2xl
        z-50
        flex
        flex-col
      "
    >

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          UMS
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          University Management System
        </p>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        {
          menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl transition duration-200 ${
                location.pathname === item.path
                  ? "bg-white text-slate-900 font-semibold shadow"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.name}
            </Link>
          ))
        }

      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-slate-700">

        <p className="text-xs text-slate-400">
          UMS Registration System
        </p>

      </div>

    </div>
  );
}