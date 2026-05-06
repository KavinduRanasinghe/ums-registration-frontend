import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminApprovalPage() {

  const [registrations, setRegistrations] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  // =========================
  // FETCH ALL REGISTRATIONS
  // =========================
  const fetchRegistrations = async () => {

    try {

      const response = await api.get(
        "/course-registration"
      );

      setRegistrations(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load registrations");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // =========================
  // APPROVE REGISTRATION
  // =========================
  const approveRegistration = async (id) => {

    try {

      await api.put(
        `/course-registration/${id}/approve`
      );

      alert("Registration Approved");

      fetchRegistrations();

    } catch (error) {

      console.error(error);

      alert("Approval Failed");
    }
  };

  // =========================
  // REJECT REGISTRATION
  // =========================
  const rejectRegistration = async (id) => {

    try {

      await api.put(
        `/course-registration/${id}/reject`
      );

      alert("Registration Rejected");

      fetchRegistrations();

    } catch (error) {

      console.error(error);

      alert("Rejection Failed");
    }
  };

  // =========================
  // LOAD REGISTERED MODULES
  // =========================
  const loadModules = async (id) => {

    try {

      const response = await api.get(
        `/course-registration/${id}/modules`
      );

      setSelectedModules(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load modules");
    }
  };

  // =========================
  // STATUS COLORS
  // =========================
  const getStatusColor = (status) => {

    switch (status) {

      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* ========================= */}
        {/* PAGE HEADER */}
        {/* ========================= */}

        <h1 className="text-3xl font-bold mb-2">
          Admin Approval Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Review and approve course registrations
        </p>

        {/* ========================= */}
        {/* REGISTRATION TABLE */}
        {/* ========================= */}

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-900 text-white">

                <th className="p-4 text-left">
                  Student ID
                </th>

                <th className="p-4 text-left">
                  Total Credits
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
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

                    {/* STUDENT ID */}
                    <td className="p-4">
                      {registration.studentId}
                    </td>

                    {/* TOTAL CREDITS */}
                    <td className="p-4">
                      {registration.totalCredits}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          registration.status
                        )}`}
                      >
                        {registration.status}
                      </span>

                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="p-4 flex gap-3 flex-wrap">

                      {/* APPROVE */}
                      <button
                        onClick={() =>
                          approveRegistration(
                            registration.id
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Approve
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() =>
                          rejectRegistration(
                            registration.id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Reject
                      </button>

                      {/* VIEW MODULES */}
                      <button
                        onClick={() =>
                          loadModules(
                            registration.id
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View Modules
                      </button>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

        {/* ========================= */}
        {/* REGISTERED MODULES */}
        {/* ========================= */}

        {
          selectedModules.length > 0 && (

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Registered Modules
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {
                  selectedModules.map((module) => (

                    <div
                      key={module.code}
                      className="border rounded-xl p-4 bg-slate-50"
                    >

                      <h3 className="font-bold text-lg">
                        {module.code}
                      </h3>

                      <p className="text-gray-700">
                        {module.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Department: {module.department}
                      </p>

                      <p className="font-semibold mt-3">
                        {module.credits} Credits
                      </p>

                    </div>
                  ))
                }

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}