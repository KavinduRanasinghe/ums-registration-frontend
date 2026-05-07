import { useState } from "react";

import toast from "react-hot-toast";

import api from "../api/axios";

export default function CourseRegistrationPage() {

  // =========================
  // STATES
  // =========================
  const [regNo, setRegNo] = useState("");

  const [student, setStudent] = useState(null);

  const [modules, setModules] = useState([]);

  const [selectedModules, setSelectedModules] = useState([]);

  const [credits, setCredits] = useState(0);

  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD MODULES
  // =========================
  const loadModules = async () => {

    try {

      if (!regNo) {

        toast.error(
          "Please enter registration number"
        );

        return;
      }

      setLoading(true);

      // GET STUDENT
      const studentResponse = await api.get(
        `/student-registration/${regNo}`
      );

      const studentData = studentResponse.data;

      setStudent(studentData);

      // GET MODULES
      const moduleResponse = await api.get(
        `/modules/by-combination?combination=${studentData.assignedCombination}&level=${studentData.level}`
      );

      const loadedModules = moduleResponse.data;

      setModules(loadedModules);

      // AUTO SELECT COMPULSORY
      const compulsoryModules =
        loadedModules.filter(
          (m) => m.compulsory
        );

      setSelectedModules(compulsoryModules);

      // CALCULATE INITIAL CREDITS
      const compulsoryCredits =
        compulsoryModules.reduce(
          (sum, module) =>
            sum + module.credits,
          0
        );

      setCredits(compulsoryCredits);

      toast.success(
        "Modules loaded successfully"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load modules"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // TOGGLE MODULE
  // =========================
  const toggleModule = (module) => {

    // PREVENT REMOVING COMPULSORY
    if (module.compulsory) return;

    const exists = selectedModules.find(
      (m) => m.code === module.code
    );

    let updatedModules;

    if (exists) {

      updatedModules =
        selectedModules.filter(
          (m) => m.code !== module.code
        );

    } else {

      updatedModules = [
        ...selectedModules,
        module
      ];
    }

    setSelectedModules(updatedModules);

    // UPDATE CREDITS
    const totalCredits =
      updatedModules.reduce(
        (sum, m) =>
          sum + m.credits,
        0
      );

    setCredits(totalCredits);
  };

  // =========================
  // SUBMIT REGISTRATION
  // =========================
  const submitRegistration = async () => {

    try {

      // CREDIT VALIDATION
      if (credits < 30 || credits > 33) {

        toast.error(
          "Credits must be between 30 and 33"
        );

        return;
      }

      setLoading(true);

      await api.post(
        "/course-registration",
        {
          regNo,
          moduleCodes:
            selectedModules.map(
              (m) => m.code
            )
        }
      );

      toast.success(
        "Registration Successful"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.error ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">
          Course Registration
        </h1>

        {/* ========================= */}
        {/* TOP SECTION */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

          {/* REGISTRATION NUMBER */}
          <input
            type="text"
            placeholder="Registration Number"
            value={regNo}
            onChange={(e) =>
              setRegNo(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          {/* LOAD MODULES BUTTON */}
          <button
            onClick={loadModules}
            disabled={loading}
            className={`rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-700"
            }`}
          >
            {
              loading
                ? "Loading..."
                : "Load Modules"
            }
          </button>

        </div>

        {/* ========================= */}
        {/* AVAILABLE MODULES */}
        {/* ========================= */}

        <h2 className="text-2xl font-bold mb-6">
          Available Modules
        </h2>

        {
          modules.length === 0 ? (

            <div className="bg-slate-50 border rounded-xl p-10 text-center text-gray-500">
              No modules loaded
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {
                modules.map((module) => {

                  const checked =
                    selectedModules.find(
                      (m) =>
                        m.code === module.code
                    );

                  return (

                    <div
                      key={module.code}
                      className="border rounded-xl p-5 flex justify-between items-start bg-slate-50"
                    >

                      <div>

                        <h3 className="font-bold text-lg">
                          {module.code}
                        </h3>

                        <p>{module.name}</p>

                        <p className="text-sm text-gray-500 mt-1">
                          {module.credits} Credits
                        </p>

                        <p className="text-sm text-blue-600 mt-1">
                          Semester {module.semester}
                        </p>

                        {
                          module.compulsory && (

                            <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                              Compulsory
                            </span>
                          )
                        }

                      </div>

                      {/* CHECKBOX */}
                      <input
                        type="checkbox"
                        checked={!!checked}
                        disabled={
                          module.compulsory ||
                          loading
                        }
                        onChange={() =>
                          toggleModule(module)
                        }
                        className="w-5 h-5"
                      />

                    </div>
                  );
                })
              }

            </div>
          )
        }

        {/* ========================= */}
        {/* REGISTRATION SUMMARY */}
        {/* ========================= */}

        {
          student && (

            <div className="mt-10 bg-slate-50 border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Registration Summary
              </h2>

              {/* STUDENT DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                <div>

                  <p className="text-gray-500 text-sm">
                    Registration Number
                  </p>

                  <h3 className="font-semibold text-lg">
                    {student.regNo}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Student Name
                  </p>

                  <h3 className="font-semibold text-lg">
                    {student.name}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Assigned Combination
                  </p>

                  <h3 className="font-semibold text-lg">
                    {student.assignedCombination}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Level
                  </p>

                  <h3 className="font-semibold text-lg">
                    {student.level}
                  </h3>

                </div>

              </div>

              {/* SELECTED MODULES TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>

                    <tr className="bg-slate-900 text-white">

                      <th className="p-3 text-left">
                        Module Code
                      </th>

                      <th className="p-3 text-left">
                        Module Name
                      </th>

                      <th className="p-3 text-left">
                        Credits
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      selectedModules.map((module) => (

                        <tr
                          key={module.code}
                          className="border-b"
                        >

                          <td className="p-3">
                            {module.code}
                          </td>

                          <td className="p-3">
                            {module.name}
                          </td>

                          <td className="p-3">
                            {module.credits}
                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>
          )
        }

        {/* ========================= */}
        {/* CREDIT DISPLAY */}
        {/* ========================= */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <h2
              className={`text-3xl font-bold ${
                credits >= 30 &&
                credits <= 33
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Total Credits: {credits}
            </h2>

            <p className="text-gray-500 mt-2">
              Valid range: 30 - 33
            </p>

          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitRegistration}
            disabled={
              credits < 30 ||
              credits > 33 ||
              loading
            }
            className={`px-8 py-4 rounded-xl text-white font-semibold transition ${
              credits >= 30 &&
              credits <= 33 &&
              !loading
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {
              loading
                ? "Submitting..."
                : "Submit Registration"
            }
          </button>

        </div>

      </div>

    </div>
  );
}