import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../api/axios";

export default function LecturerProfilePage() {

  // =====================================
  // ROUTE PARAM
  // =====================================

  const { lecturerId } = useParams();

  // =====================================
  // STATES
  // =====================================

  const [lecturer, setLecturer] =
    useState(null);

  const [modules, setModules] =
    useState([]);

  const [timetable, setTimetable] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadData();

  }, [lecturerId]);

  const loadData = async () => {

    try {

      // LECTURER

      const lecturerResponse =
        await api.get(
          `/lecturers/${lecturerId}`
        );

      setLecturer(
        lecturerResponse.data
      );

      // MODULES

      const moduleResponse =
        await api.get(
          `/lecturer-modules/${lecturerId}`
        );

      setModules(
        moduleResponse.data
      );

      // TIMETABLE

      const timetableResponse =
        await api.get(
          `/timetable/lecturer/${lecturerId}`
        );

      setTimetable(
        timetableResponse.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold">
          Loading Lecturer Profile...
        </h1>

      </div>
    );
  }

  // =====================================
  // NOT FOUND
  // =====================================

  if (!lecturer) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">
          Lecturer Not Found
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

        {/* PROFILE HEADER */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex flex-col md:flex-row gap-8 items-center">

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

              {lecturer.fullName?.charAt(0)}

            </div>

            <div className="flex-1">

              <h1 className="text-4xl font-bold mb-3">

                {lecturer.fullName}

              </h1>

              <p className="text-slate-500 text-lg mb-2">

                Lecturer ID:
                {" "}
                {lecturer.lecturerId}

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

                  {lecturer.department}

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

                  {lecturer.designation}

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
                    Email
                  </p>

                  <p className="font-semibold">
                    {lecturer.email}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Mobile
                  </p>

                  <p className="font-semibold">
                    {lecturer.mobile}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Qualification
                  </p>

                  <p className="font-semibold">
                    {lecturer.qualification}
                  </p>

                </div>

              </div>

            </div>

            {/* STATISTICS */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Teaching Statistics
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Assigned Modules
                  </p>

                  <p className="text-3xl font-bold">
                    {modules.length}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Weekly Sessions
                  </p>

                  <p className="text-3xl font-bold">
                    {timetable.length}
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

                Assigned Modules

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

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

            {/* TIMETABLE */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Weekly Timetable

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-slate-900 text-white">

                      <th className="p-4 text-left">
                        Day
                      </th>

                      <th className="p-4 text-left">
                        Time
                      </th>

                      <th className="p-4 text-left">
                        Module
                      </th>

                      <th className="p-4 text-left">
                        Venue
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      timetable.map((item) => (

                        <tr
                          key={item.id}
                          className="border-b"
                        >

                          <td className="p-4">
                            {item.day}
                          </td>

                          <td className="p-4">

                            {item.startTime}
                            {" - "}
                            {item.endTime}

                          </td>

                          <td className="p-4">

                            {item.moduleCode}
                            {" - "}
                            {item.moduleName}

                          </td>

                          <td className="p-4">

                            {item.venue}

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