import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentsPage() {

  // =========================
  // STATES
  // =========================
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  // =========================
  // FETCH STUDENTS
  // =========================
  const fetchStudents = async () => {

    try {

      const response = await api.get(
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

  // =========================
  // SEARCH FILTER
  // =========================
  useEffect(() => {

    const filtered = students.filter(
      (student) =>

        student.regNo
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        student.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);

  }, [search, students]);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Students
            </h1>

            <p className="text-gray-500 mt-2">
              Registered student details
            </p>

          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by regNo or name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded-lg mt-4 md:mt-0 w-full md:w-80"
          />

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse text-sm">

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
                  Assigned Combination
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredStudents.length > 0 ? (

                  filteredStudents.map((student) => (

                    <tr
                      key={student.id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      <td className="p-4 font-medium">
                        {student.regNo}
                      </td>

                      <td className="p-4">
                        {student.name}
                      </td>

                      <td className="p-4">
                        {student.initials}
                      </td>

                      <td className="p-4">
                        {student.gender}
                      </td>

                      <td className="p-4">
                        {student.district}
                      </td>

                      <td className="p-4">
                        {student.level}
                      </td>

                      <td className="p-4">
                        {student.zscore}
                      </td>

                      <td className="p-4">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                          {student.preference1}
                        </span>

                      </td>

                      <td className="p-4">

                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                          {student.preference2}
                        </span>

                      </td>

                      <td className="p-4">

                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                          {student.preference3}
                        </span>

                      </td>

                      <td className="p-4">

                        {
                          student.assignedCombination ? (

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">

                              {
                                student.assignedCombination
                              }

                            </span>

                          ) : (

                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                              Not Assigned
                            </span>
                          )
                        }

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="11"
                      className="text-center p-10 text-gray-500"
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
  );
}