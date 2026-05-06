import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {

  const [studentCount, setStudentCount] = useState(0);

  const [registrations, setRegistrations] = useState([]);

  // =========================
  // LOAD DASHBOARD DATA
  // =========================
  const loadDashboard = async () => {

    try {

      // STUDENTS
      const studentResponse = await api.get(
        "/student-registration"
      );

      setStudentCount(
        studentResponse.data.length
      );

      // COURSE REGISTRATIONS
      const registrationResponse = await api.get(
        "/course-registration"
      );

      setRegistrations(
        registrationResponse.data
      );

    } catch (error) {

      console.error(error);

      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // =========================
  // CALCULATIONS
  // =========================
  const approvedCount =
    registrations.filter(
      (r) => r.status === "APPROVED"
    ).length;

  const pendingCount =
    registrations.filter(
      (r) => r.status === "PENDING"
    ).length;

  const rejectedCount =
    registrations.filter(
      (r) => r.status === "REJECTED"
    ).length;

  // =========================
  // UI
  // =========================
  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            UMS Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            University Management System
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* TOTAL STUDENTS */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-gray-500 text-sm">
              Total Students
            </h2>

            <p className="text-4xl font-bold mt-3">
              {studentCount}
            </p>

          </div>

          {/* APPROVED */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-gray-500 text-sm">
              Approved Registrations
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-600">
              {approvedCount}
            </p>

          </div>

          {/* PENDING */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-gray-500 text-sm">
              Pending Registrations
            </h2>

            <p className="text-4xl font-bold mt-3 text-yellow-500">
              {pendingCount}
            </p>

          </div>

          {/* REJECTED */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-gray-500 text-sm">
              Rejected Registrations
            </h2>

            <p className="text-4xl font-bold mt-3 text-red-600">
              {rejectedCount}
            </p>

          </div>

        </div>

        {/* RECENT REGISTRATIONS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Recent Course Registrations
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Student ID
                  </th>

                  <th className="p-4 text-left">
                    Credits
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  registrations.map((registration) => (

                    <tr
                      key={registration.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {registration.studentId}
                      </td>

                      <td className="p-4">
                        {registration.totalCredits}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            registration.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : registration.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {registration.status}
                        </span>

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
  );
}