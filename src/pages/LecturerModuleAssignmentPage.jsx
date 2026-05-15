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

  const [modules, setModules] =
    useState([]);

  const [assignments, setAssignments] =
    useState([]);

  const [selectedLecturer, setSelectedLecturer] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

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
  // HANDLE LECTURER CHANGE
  // =====================================

  const handleLecturerChange = async (e) => {

    const lecturerId =
      e.target.value;

    const lecturer =
      lecturers.find(

        (l) =>
          l.lecturerId === lecturerId
      );

    setSelectedLecturer(lecturer);

    setFormData({

      ...formData,

      lecturerId,

      moduleCode: "",
      moduleName: ""
    });

    try {

      const response =
        await api.get(

          `/modules/department/${lecturer.department}`
        );

      setModules(

        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);

      setModules([]);
    }
  };

  // =====================================
  // HANDLE MODULE CHANGE
  // =====================================

  const handleModuleChange = (e) => {

    const selectedModule =
      modules.find(

        (m) =>
          m.code ===
          e.target.value
      );

    setFormData({

      ...formData,

      moduleCode:
        selectedModule.code,

      moduleName:
        selectedModule.name
    });
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = async (item) => {

    setEditingId(item.id);

    const lecturer =
      lecturers.find(

        (l) =>
          l.lecturerId ===
          item.lecturerId
      );

    setSelectedLecturer(lecturer);

    try {

      const response =
        await api.get(

          `/modules/department/${lecturer.department}`
        );

      setModules(response.data);

    } catch (error) {

      console.error(error);
    }

    setFormData({

      lecturerId:
        item.lecturerId,

      moduleCode:
        item.moduleCode,

      moduleName:
        item.moduleName
    });
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this assignment?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/lecturer-modules/${id}`
      );

      loadAssignments();

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(

          `/lecturer-modules/${editingId}`,

          formData
        );

      } else {

        await api.post(
          "/lecturer-modules",
          formData
        );
      }

      alert(
        editingId
          ? "Assignment updated"
          : "Module assigned successfully"
      );

      // RESET

      setEditingId(null);

      setFormData({

        lecturerId: "",
        moduleCode: "",
        moduleName: ""
      });

      setSelectedLecturer(null);

      setModules([]);

      loadAssignments();

    } catch (error) {

      console.error(error);

      alert(
        "Operation failed"
      );
    }
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              Lecturer Module Assignment
            </h1>

            <p className="text-slate-500 mt-2">
              Assign modules based on lecturer department
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* SELECT LECTURER */}

            <div>

              <label className="block mb-2 font-semibold">

                Select Lecturer

              </label>

              <select
                name="lecturerId"

                value={formData.lecturerId}

                onChange={handleLecturerChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
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

                      {lecturer.lecturerId}
                      {" - "}
                      {lecturer.fullName}

                    </option>
                  ))
                }

              </select>

            </div>

            {/* DETAILS */}

            {
              selectedLecturer && (

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                  "
                >

                  <div>

                    <label className="block mb-2 font-semibold">
                      Lecturer ID
                    </label>

                    <input
                      type="text"

                      value={selectedLecturer.lecturerId}

                      disabled

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                        bg-slate-100
                      "
                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-semibold">
                      Lecturer Name
                    </label>

                    <input
                      type="text"

                      value={selectedLecturer.fullName}

                      disabled

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                        bg-slate-100
                      "
                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-semibold">
                      Designation
                    </label>

                    <input
                      type="text"

                      value={selectedLecturer.designation}

                      disabled

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                        bg-slate-100
                      "
                    />

                  </div>

                </div>
              )
            }

            {/* MODULES */}

            <div>

              <label className="block mb-2 font-semibold">

                Subject / Module

              </label>

              <select
                name="moduleCode"

                value={formData.moduleCode}

                onChange={handleModuleChange}

                disabled={!selectedLecturer}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              >

                <option value="">
                  Select Module
                </option>

                {
                  modules.map((module) => (

                    <option
                      key={module.code}
                      value={module.code}
                    >

                      {module.code}
                      {" - "}
                      {module.name}

                    </option>
                  ))
                }

              </select>

            </div>

            {/* BUTTON */}

            <button
              type="submit"

              className="
                bg-slate-900
                text-white
                px-8
                py-3
                rounded-xl
                hover:bg-slate-700
                transition
                font-semibold
              "
            >

              {
                editingId
                  ? "Update Assignment"
                  : "Assign Module"
              }

            </button>

          </form>

        </div>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="mb-6">

            <h2 className="text-3xl font-bold">
              Assigned Modules
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Lecturer ID
                  </th>

                  <th className="p-4 text-left">
                    Lecturer Name
                  </th>

                  <th className="p-4 text-left">
                    Designation
                  </th>

                  <th className="p-4 text-left">
                    Subject
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  assignments.map((item) => {

                    const lecturer =
                      lecturers.find(
                        (l) =>
                          l.lecturerId ===
                          item.lecturerId
                      );

                    return (

                      <tr
                        key={item.id}
                        className="
                          border-b
                          hover:bg-slate-50
                        "
                      >

                        <td className="p-4 font-semibold">
                          {item.lecturerId}
                        </td>

                        <td className="p-4">
                          {lecturer?.fullName || "-"}
                        </td>

                        <td className="p-4">
                          {lecturer?.designation || "-"}
                        </td>

                        <td className="p-4">
                          {item.moduleName}
                        </td>

                        {/* ACTIONS */}

                        <td className="p-4">

                          <div className="flex gap-3">

                            {/* EDIT */}

                            <button
                              onClick={() =>
                                handleEdit(item)
                              }

                              className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                              "
                            >

                              Edit

                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDelete(item.id)
                              }

                              className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                              "
                            >

                              Delete

                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}