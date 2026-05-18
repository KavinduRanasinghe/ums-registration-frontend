import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function AttendanceAnalyticsPage() {

  // =====================================
  // STATES
  // =====================================

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance = async () => {

    try {

      const response =
        await api.get(
          "/attendance/all"
        );

      setRecords(

        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // MODULE COUNT
  // =====================================

  const moduleStats = {};

  records.forEach((record) => {

    if (
      !moduleStats[
        record.moduleCode
      ]
    ) {

      moduleStats[
        record.moduleCode
      ] = 0;
    }

    moduleStats[
      record.moduleCode
    ]++;
  });

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold mb-2">

            Attendance Analytics

          </h1>

          <p className="text-slate-500">

            Attendance insights and statistics

          </p>

        </div>

        {/* SUMMARY */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-8
          "
        >

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <p className="text-slate-500 text-sm">
              Total Attendance Records
            </p>

            <h1 className="text-5xl font-bold mt-4">

              {records.length}

            </h1>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <p className="text-slate-500 text-sm">
              Modules Conducted
            </p>

            <h1 className="text-5xl font-bold mt-4">

              {
                Object.keys(
                  moduleStats
                ).length
              }

            </h1>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <p className="text-slate-500 text-sm">
              Attendance Sessions
            </p>

            <h1 className="text-5xl font-bold mt-4">

              {
                new Set(

                  records.map(
                    (r) =>
                      r.sessionCode
                  )
                ).size
              }

            </h1>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            Attendance Records

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Reg No
                  </th>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Module
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Scanned At
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  loading ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="p-8 text-center"
                      >

                        Loading...

                      </td>

                    </tr>

                  ) : (

                    records.map((record) => (

                      <tr
                        key={record.id}
                        className="
                          border-b
                          hover:bg-slate-50
                        "
                      >

                        <td className="p-4 font-semibold">

                          {record.regNo}

                        </td>

                        <td className="p-4">

                          {record.studentName}

                        </td>

                        <td className="p-4">

                          {record.moduleCode}
                          {" - "}
                          {record.moduleName}

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

                            {record.status}

                          </span>

                        </td>

                        <td className="p-4">

                          {record.scannedAt}

                        </td>

                      </tr>
                    ))
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