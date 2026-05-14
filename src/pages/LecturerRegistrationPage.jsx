import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function LecturerRegistrationPage() {

  const [formData, setFormData] =
    useState({

      lecturerId: "",
      fullName: "",
      initials: "",
      gender: "",
      email: "",
      mobile: "",
      department: "",
      designation: "",
      qualification: ""
    });

  const [lecturers, setLecturers] =
    useState([]);

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
        "/lecturers",
        formData
      );

      alert(
        "Lecturer registered successfully"
      );

      setFormData({

        lecturerId: "",
        fullName: "",
        initials: "",
        gender: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        qualification: ""
      });

      loadLecturers();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to register lecturer"
      );
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-3xl font-bold mb-8">
            Lecturer Registration
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="lecturerId"
              placeholder="Lecturer ID"
              value={formData.lecturerId}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="initials"
              placeholder="Initials"
              value={formData.initials}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

           <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="">
                Select Department
              </option>

              <option value="IMGT">
                IMGT
              </option>

              <option value="MATH&STAT">
                MATH&STAT
              </option>

              <option value="CMIS">
                CMIS
              </option>

              <option value="ETLN">
                ETLN
              </option>

            </select>

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="">
                Select Qualification
              </option>

              <option value="BSC">
                BSc
              </option>

              <option value="MSC">
                MSc
              </option>

              <option value="MPHIL">
                MPhil
              </option>

              <option value="PHD">
                PhD
              </option>

            </select>

            <button
              type="submit"
              className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700 transition"
            >
              Register Lecturer
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}