import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api from "../api/axios";

export default function StudentsPage() {

  // =====================================
  // STATES
  // =====================================

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  // =====================================
  // FETCH STUDENTS
  // =====================================

  const fetchStudents = async () => {

    try {

      const response =
        await api.get(
          "/student-registration"
        );

      setStudents(response.data);

      setFilteredStudents(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchStudents();

  }, []);

  // =====================================
  // SEARCH FILTER
  // =====================================

  useEffect(() => {

    const filtered = students.filter(
      (student) =>

        student.regNo
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        student.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    setFilteredStudents(filtered);

  }, [search, students]);

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-[1700px] mx-auto">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >

            <div>

              <h1 className="text-4xl font-bold">
                Students
              </h1>

              <p className="text-slate-500 mt-2">
                Registered Student Management
              </p>

            </div>

            {/* SEARCH */}

            <input
              type="text"

              placeholder="Search by reg no or name..."

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              className="
                border
                p-3
                rounded-xl
                w-full
                lg:w-96
              "
            />

          </div>

        </div>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Reg No
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Initials
                  </th>

                  <th className="p-4 text-left">
                    Gender
                  </th>

                  <th className="p-4 text-left">
                    District
                  </th>

                  <th className="p-4 text-left">
                    Level
                  </th>

                  <th className="p-4 text-left">
                    Z-Score
                  </th>

                  <th className="p-4 text-left">
                    Preference 1
                  </th>

                  <th className="p-4 text-left">
                    Preference 2
                  </th>

                  <th className="p-4 text-left">
                    Preference 3
                  </th>

                  <th className="p-4 text-left">
                    Assigned
                  </th>

                  <th className="p-4 text-left">
                    Profile
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredStudents.length > 0 ? (

                    filteredStudents.map((student) => (

                      <tr
                        key={student.id}
                        className="
                          border-b
                          hover:bg-slate-50
                          transition
                        "
                      >

                        {/* REG NO */}

                        <td className="p-4 font-semibold">

                          {student.regNo}

                        </td>

                        {/* NAME */}

                        <td className="p-4">

                          {student.name}

                        </td>

                        {/* INITIALS */}

                        <td className="p-4">

                          {student.initials}

                        </td>

                        {/* GENDER */}

                        <td className="p-4">

                          {student.gender}

                        </td>

                        {/* DISTRICT */}

                        <td className="p-4">

                          {student.district}

                        </td>

                        {/* LEVEL */}

                        <td className="p-4">

                          {student.level}

                        </td>

                        {/* Z SCORE */}

                        <td className="p-4 font-medium">

                          {student.zScore}

                        </td>

                        {/* PREFERENCE 1 */}

                        <td className="p-4">

                          <span
                            className="
                              bg-blue-100
                              text-blue-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                            "
                          >

                            {student.preference1}

                          </span>

                        </td>

                        {/* PREFERENCE 2 */}

                        <td className="p-4">

                          <span
                            className="
                              bg-purple-100
                              text-purple-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                            "
                          >

                            {student.preference2}

                          </span>

                        </td>

                        {/* PREFERENCE 3 */}

                        <td className="p-4">

                          <span
                            className="
                              bg-orange-100
                              text-orange-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                            "
                          >

                            {student.preference3}

                          </span>

                        </td>

                        {/* ASSIGNED */}

                        <td className="p-4">

                          {
                            student.assignedCombination ? (

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
                                  student.assignedCombination
                                }

                              </span>

                            ) : (

                              <span
                                className="
                                  bg-red-100
                                  text-red-700
                                  px-3
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-semibold
                                "
                              >

                                Not Assigned

                              </span>
                            )
                          }

                        </td>

                        {/* PROFILE */}

                        <td className="p-4">

                          <Link

                            to={`/students/${student.regNo}`}

                            className="
                              bg-slate-900
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              hover:bg-slate-700
                              transition
                              text-xs
                              font-semibold
                            "
                          >

                            View Profile

                          </Link>

                        </td>

                      </tr>
                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="12"
                        className="
                          text-center
                          p-10
                          text-slate-500
                        "
                      >

                        No students found

                      </td>

                    </tr>
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}