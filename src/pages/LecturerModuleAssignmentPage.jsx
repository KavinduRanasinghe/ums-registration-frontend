import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function LecturerModuleAssignmentPage() {

  // =====================================
  // STATES
  // =====================================

  const [lecturers, setLecturers] =
    useState([]);

  const [assignments, setAssignments] =
    useState([]);

  const [formData, setFormData] =
    useState({

      lecturerId: "",
      moduleCode: "",
      moduleName: ""
    });

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadLecturers();

    loadAssignments();

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

  const loadAssignments = async () => {

    try {

      const response =
        await api.get(
          "/lecturer-modules"
        );

      setAssignments(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/lecturer-modules",
        formData
      );

      alert(
        "Module assigned successfully"
      );

      setFormData({

        lecturerId: "",
        moduleCode: "",
        moduleName: ""
      });

      loadAssignments();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to assign module"
      );
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-3xl font-bold mb-8">
            Lecturer Module Assignment
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >

            {/* LECTURER */}
            <select
              name="lecturerId"
              value={formData.lecturerId}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="">
                Select Lecturer
              </option>

              {
                lecturers.map((lecturer) => (

                  <option
                    key={lecturer.id}
                    value={lecturer.lecturerId}
                  >

                    {lecturer.fullName}

                  </option>
                ))
              }

            </select>

            {/* MODULE CODE */}
            <input
              type="text"
              name="moduleCode"
              placeholder="Module Code"
              value={formData.moduleCode}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            {/* MODULE NAME */}
            <input
              type="text"
              name="moduleName"
              placeholder="Module Name"
              value={formData.moduleName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="
                bg-slate-900
                text-white
                py-3
                rounded-lg
                hover:bg-slate-700
                transition
              "
            >
              Assign Module
            </button>

          </form>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Assigned Modules
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Lecturer ID
                  </th>

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
                  assignments.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="p-4">

                        {item.lecturerId}

                      </td>

                      <td className="p-4">

                        {item.moduleCode}

                      </td>

                      <td className="p-4">

                        {item.moduleName}

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