import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ModuleManagementPage() {

  // =========================
  // STATES
  // =========================
  const [modules, setModules] = useState([]);

  const [formData, setFormData] = useState({

    code: "",
    name: "",
    credits: "",
    level: "",
    semester: "",
    department: "",
    compulsory: true
  });

  // =========================
  // LOAD MODULES
  // =========================
  const fetchModules = async () => {

    try {

      const response = await api.get(
        "/modules"
      );

      setModules(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load modules");
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value
    });
  };

  // =========================
  // ADD MODULE
  // =========================
  const addModule = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/modules",
        formData
      );

      alert("Module Added");

      setFormData({

        code: "",
        name: "",
        credits: "",
        level: "",
        semester: "",
        department: "",
        compulsory: true
      });

      fetchModules();

    } catch (error) {

      console.error(error);

      alert("Failed to add module");
    }
  };

  // =========================
  // DELETE MODULE
  // =========================
  const deleteModule = async (code) => {

    const confirmDelete = window.confirm(
      "Delete this module?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/modules/${code}`
      );

      alert("Module Deleted");

      fetchModules();

    } catch (error) {

      console.error(error);

      alert("Failed to delete module");
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Module Management
          </h1>

          <p className="text-gray-500 mt-2">
            Add and manage academic modules
          </p>

        </div>

        {/* ========================= */}
        {/* ADD MODULE FORM */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Add Module
          </h2>

          <form
            onSubmit={addModule}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >

            {/* CODE */}
            <input
              type="text"
              name="code"
              placeholder="Module Code"
              value={formData.code}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Module Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* CREDITS */}
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={formData.credits}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* LEVEL */}
            <input
              type="number"
              name="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* SEMESTER */}
            <input
              type="number"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* DEPARTMENT */}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            >

              <option value="">
                Select Department
              </option>

              <option value="CMIS">
                CMIS
              </option>

              <option value="ELTN">
                ELTN
              </option>

              <option value="MATH_STAT">
                MATH & STAT
              </option>

              <option value="IMGT">
                IMGT
              </option>

            </select>

            {/* COMPULSORY */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="compulsory"
                checked={formData.compulsory}
                onChange={handleChange}
              />

              <label>
                Compulsory Module
              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
            >
              Add Module
            </button>

          </form>

        </div>

        {/* ========================= */}
        {/* MODULE TABLE */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            All Modules
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Code
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Credits
                  </th>

                  <th className="p-4 text-left">
                    Level
                  </th>

                  <th className="p-4 text-left">
                    Semester
                  </th>

                  <th className="p-4 text-left">
                    Department
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  modules.map((module) => (

                    <tr
                      key={module.code}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {module.code}
                      </td>

                      <td className="p-4">
                        {module.name}
                      </td>

                      <td className="p-4">
                        {module.credits}
                      </td>

                      <td className="p-4">
                        {module.level}
                      </td>

                      <td className="p-4">
                        {module.semester}
                      </td>

                      <td className="p-4">
                        {module.department}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            module.compulsory
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            module.compulsory
                              ? "Compulsory"
                              : "Optional"
                          }
                        </span>

                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            deleteModule(module.code)
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Delete
                        </button>

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