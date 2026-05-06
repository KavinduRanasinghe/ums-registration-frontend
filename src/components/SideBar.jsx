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
        name: "Modules",
        path: "/modules-management"
    }
  ];

  return (

   <div className="w-72 h-screen overflow-y-auto bg-slate-900 text-white p-6">

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
      <div className="flex flex-col gap-2">

        {
          menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl transition ${
                location.pathname === item.path
                  ? "bg-white text-slate-900 font-semibold"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.name}
            </Link>
          ))
        }

      </div>

    </div>
  );
}