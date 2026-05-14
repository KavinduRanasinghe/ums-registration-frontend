import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api from "../api/axios";

export default function LecturersPage() {

  // =====================================
  // STATES
  // =====================================

  const [lecturers, setLecturers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // =====================================
  // LOAD LECTURERS
  // =====================================

  useEffect(() => {

    loadLecturers();

  }, []);

  const loadLecturers = async () => {

    try {

      const response =
        await api.get("/lecturers");

      setLecturers(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // =====================================
  // FILTER
  // =====================================

  const filteredLecturers =
    lecturers.filter((lecturer) =>

      lecturer.fullName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      lecturer.lecturerId
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h1 className="text-4xl font-bold">
                Lecturers
              </h1>

              <p className="text-slate-500 mt-2">
                Lecturer Management System
              </p>

            </div>

            <input
              type="text"
              placeholder="Search lecturer..."

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              className="
                border
                p-3
                rounded-xl
                w-full
                md:w-80
              "
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Lecturer ID
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Department
                  </th>

                  <th className="p-4 text-left">
                    Designation
                  </th>

                  <th className="p-4 text-left">
                    Qualification
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Profile
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredLecturers.map(
                    (lecturer) => (

                      <tr
                        key={lecturer.id}
                        className="border-b hover:bg-slate-50"
                      >

                        <td className="p-4 font-semibold">

                          {lecturer.lecturerId}

                        </td>

                        <td className="p-4">

                          {lecturer.fullName}

                        </td>

                        <td className="p-4">

                          {lecturer.department}

                        </td>

                        <td className="p-4">

                          {lecturer.designation}

                        </td>

                        <td className="p-4">

                          {lecturer.qualification}

                        </td>

                        <td className="p-4">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold

                              ${
                                lecturer.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >

                            {
                              lecturer.active
                                ? "Active"
                                : "Inactive"
                            }

                          </span>

                        </td>

                        <td className="p-4">

                          <Link

                            to={`/lecturers/${lecturer.lecturerId}`}

                            className="
                              bg-slate-900
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              hover:bg-slate-700
                              transition
                            "
                          >
                            View Profile
                          </Link>

                        </td>

                      </tr>
                    )
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