import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function ResultsManagementPage() {

  // =====================================
  // STATES
  // =====================================

  const [students, setStudents] =
    useState([]);

  const [modules, setModules] =
    useState([]);

  const [results, setResults] =
    useState([]);

  const [formData, setFormData] =
    useState({

      studentId: "",

      regNo: "",

      studentName: "",

      moduleCode: "",

      moduleName: "",

      credits: "",

      grade: "",

      semester: 1,

      academicYear: "2026"
    });

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadStudents();

    loadModules();

  }, []);

  const loadStudents = async () => {

    try {

      const response =
        await api.get("/student-registration");

      setStudents(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const loadModules = async () => {

    try {

      const response =
        await api.get("/modules");

      setModules(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // =====================================
  // HANDLE STUDENT
  // =====================================

  const handleStudent = (e) => {

    const student =
      students.find(

        (s) =>
          s.id === e.target.value
      );

    setFormData({

      ...formData,

      studentId: student.id,

      regNo: student.regNo,

      studentName: student.name
    });
  };

  // =====================================
  // HANDLE MODULE
  // =====================================

  const handleModule = (e) => {

    const module =
      modules.find(

        (m) =>
          m.code === e.target.value
      );

    setFormData({

      ...formData,

      moduleCode: module.code,

      moduleName: module.name,

      credits: module.credits
    });
  };

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value
    });
  };

  // =====================================
  // SAVE RESULT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/results",
          formData
        );

      setResults([
        ...results,
        response.data
      ]);

      alert(
        "Result saved successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save result"
      );
    }
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold mb-2">

            Results Management

          </h1>

          <p className="text-slate-500 mb-8">

            Manage student academic results and GPA

          </p>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}

            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-4
            "
          >

            {/* STUDENT */}

            <select
              onChange={handleStudent}

              className="
                border
                p-3
                rounded-xl
              "

              required
            >

              <option value="">
                Select Student
              </option>

              {
                students.map((student) => (

                  <option
                    key={student.id}
                    value={student.id}
                  >

                    {student.regNo}
                    {" - "}
                    {student.name}

                  </option>
                ))
              }

            </select>

            {/* MODULE */}

            <select
              onChange={handleModule}

              className="
                border
                p-3
                rounded-xl
              "

              required
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

            {/* GRADE */}

            <select
              name="grade"

              value={formData.grade}

              onChange={handleChange}

              className="
                border
                p-3
                rounded-xl
              "

              required
            >

              <option value="">
                Select Grade
              </option>

              <option>A</option>
              <option>A-</option>
              <option>B+</option>
              <option>B</option>
              <option>B-</option>
              <option>C+</option>
              <option>C</option>
              <option>C-</option>
              <option>D</option>
              <option>F</option>

            </select>

            {/* BUTTON */}

            <button
              type="submit"

              className="
                bg-slate-900
                text-white
                rounded-xl
                hover:bg-slate-700
              "
            >

              Save Result

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}