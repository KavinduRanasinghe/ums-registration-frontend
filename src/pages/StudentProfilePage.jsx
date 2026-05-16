import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../api/axios";

export default function StudentProfilePage() {

  // =====================================
  // ROUTE PARAM
  // =====================================

  const { regNo } = useParams();

  // =====================================
  // STATES
  // =====================================

  const [student, setStudent] =
    useState(null);

  const [modules, setModules] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD STUDENT
  // =====================================

  useEffect(() => {

    loadStudent();

  }, [regNo]);

  const loadStudent = async () => {

    try {

      // STUDENT

      const response =
        await api.get(
          `/student-registration/${regNo}`
        );

      setStudent(response.data);

      // MODULES

      const moduleResponse =
        await api.get(

          `/registered-modules/student/${regNo}`
        );

      setModules(
        moduleResponse.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // GPA CALCULATION
  // =====================================

  const calculateGPA = () => {

    if (modules.length === 0)
      return "0.00";

    let totalPoints = 0;

    let totalCredits = 0;

    modules.forEach((m) => {

      if (m.gpaPoint && m.credits) {

        totalPoints +=
          m.gpaPoint * m.credits;

        totalCredits +=
          m.credits;
      }
    });

    if (totalCredits === 0)
      return "0.00";

    return (
      totalPoints / totalCredits
    ).toFixed(2);
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold">
          Loading Student Profile...
        </h1>

      </div>
    );
  }

  // =====================================
  // NO STUDENT
  // =====================================

  if (!student) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">
          Student Not Found
        </h1>

      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* PROFILE IMAGE */}

            <div
              className="
                w-40
                h-40
                rounded-full
                bg-slate-900
                flex
                items-center
                justify-center
                text-white
                text-5xl
                font-bold
              "
            >

              {student.name?.charAt(0)}

            </div>

            {/* BASIC DETAILS */}

            <div className="flex-1">

              <h1 className="text-4xl font-bold mb-3">

                {student.name}

              </h1>

              <p className="text-slate-500 text-lg mb-2">

                Registration Number:
                {" "}
                {student.regNo}

              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span
                  className="
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  {student.assignedCombination ||
                    "Not Allocated"}

                </span>

                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  Level {student.level}

                </span>

                <span
                  className="
                    bg-purple-100
                    text-purple-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  GPA {calculateGPA()}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="space-y-8">

            {/* PERSONAL INFO */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {student.name}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Initials
                  </p>

                  <p className="font-semibold">
                    {student.initials}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Gender
                  </p>

                  <p className="font-semibold">
                    {student.gender}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    District
                  </p>

                  <p className="font-semibold">
                    {student.district}
                  </p>

                </div>

              </div>

            </div>

            {/* ACADEMIC STATUS */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Academic Status
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Current GPA
                  </p>

                  <p
                    className="
                      text-4xl
                      font-bold
                      text-green-600
                    "
                  >

                    {calculateGPA()}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Current Class
                  </p>

                  <p className="font-semibold">
                    HALL_A
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Registered Modules
                  </p>

                  <p className="font-semibold">
                    {modules.length}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-2 space-y-8">

            {/* MODULES */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Registered Modules & Results

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-slate-900 text-white">

                      <th className="p-4 text-left">
                        Module Code
                      </th>

                      <th className="p-4 text-left">
                        Module Name
                      </th>

                      <th className="p-4 text-left">
                        Credits
                      </th>

                      <th className="p-4 text-left">
                        Grade
                      </th>

                      <th className="p-4 text-left">
                        GPA Point
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      modules.map((module) => (

                        <tr
                          key={module.id}

                          className="border-b"
                        >

                          <td className="p-4">

                            {module.moduleCode}

                          </td>

                          <td className="p-4">

                            {module.moduleName}

                          </td>

                          <td className="p-4">

                            {module.credits}

                          </td>

                          <td className="p-4">

                            <span
                              className="
                                bg-green-100
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                              "
                            >

                              {
                                module.grade ||
                                "Pending"
                              }

                            </span>

                          </td>

                          <td className="p-4 font-semibold">

                            {
                              module.gpaPoint ||
                              "-"
                            }

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}