import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");
  };

  // =====================================
  // MENU SECTIONS
  // =====================================

  const menuSections = [

    {
      title: "MAIN",

      items: [

        {
          name: "Dashboard",
          path: "/"
        }
      ]
    },

    {
      title: "ACADEMIC MANAGEMENT",

      items: [

        {
          name: "Student Registration",
          path: "/student-registration"
        },

        {
          name: "Students",
          path: "/students"
        },

        {
          name: "Lecturer Registration",
          path: "/lecturer-registration"
        },

        {
          name: "Lecturers",
          path: "/lecturers"
        },

        {
          name: "Lecturer Modules",
          path: "/lecturer-module-assignment"
        }
      ]
    },

    {
      title: "ALLOCATION",

      items: [

        {
          name: "Allocation",
          path: "/allocation"
        }
      ]
    },

    {
      title: "ACADEMIC OPERATIONS",

      items: [

        {
          name: "Course Registration",
          path: "/course-registration"
        },

        {
          name: "Modules Management",
          path: "/modules-management"
        },

        {
          name: "Admin Approval",
          path: "/admin-approval"
        },

        {
          name: "Timetable Rules",
          path: "/timetable-rules"
        },

          {
          name: "Generate Timetable",
          path: "/timetable-generation"
        }



        
      ]
    }
  ];

  // =====================================
  // UI
  // =====================================

  return (

    <div
      className="
        sticky
        top-0
        h-screen
        w-72
        shrink-0
        bg-slate-900
        text-white
        p-6
        shadow-2xl
        flex
        flex-col
      "
    >

      {/* ================================= */}
      {/* LOGO */}
      {/* ================================= */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          FAS
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Faculty of Applied Sciences
        </p>

      </div>

      {/* ================================= */}
      {/* MENU */}
      {/* ================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          pr-2
        "
      >

        <div className="flex flex-col gap-6">

          {
            menuSections.map((section) => (

              <div key={section.title}>

                {/* SECTION TITLE */}

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-slate-500
                    mb-3
                    px-2
                  "
                >

                  {section.title}

                </p>

                {/* SECTION ITEMS */}

                <div className="flex flex-col gap-2">

                  {
                    section.items.map((item) => (

                      <Link
                        key={item.path}

                        to={item.path}

                        className={`
                          px-4
                          py-3
                          rounded-xl
                          transition
                          duration-200

                          ${
                            location.pathname === item.path
                              ? "bg-white text-slate-900 font-semibold shadow"
                              : "hover:bg-slate-800"
                          }
                        `}
                      >

                        {item.name}

                      </Link>
                    ))
                  }

                </div>

              </div>
            ))
          }

        </div>

      </div>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <div className="pt-6 border-t border-slate-700 mt-6">

        <button
          onClick={logout}

          className="
            w-full
            bg-red-600
            hover:bg-red-700
            transition
            py-3
            rounded-xl
            font-semibold
          "
        >

          Logout

        </button>

      </div>

    </div>
  );
}