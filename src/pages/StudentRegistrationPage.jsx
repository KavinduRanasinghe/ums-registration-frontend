import { useState } from "react";
import api from "../api/axios";

export default function StudentRegistrationPage() {

  const [formData, setFormData] = useState({
    regNo: "",
    name: "",
    initials: "",
    gender: "",
    district: "",
    zScore: "",
    level: 1,
    preference1: "",
    preference2: "",
    preference3: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,
        zScore: parseFloat(formData.zScore),
        level: parseInt(formData.level)
      };

      const response = await api.post(
        "/student-registration",
        payload
      );

      console.log(response.data);

      alert("Student Registered Successfully");

      setFormData({
        regNo: "",
        name: "",
        initials: "",
        gender: "",
        district: "",
        zScore: "",
        level: 1,
        preference1: "",
        preference2: "",
        preference3: ""
      });

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.error ||
        "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Student Registration
        </h1>

        <p className="text-gray-500 mb-8">
          University Management System
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            value={formData.regNo}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
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
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            step="0.01"
            name="zScore"
            placeholder="Z-Score"
            value={formData.zScore}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="preference1"
            value={formData.preference1}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Preference 1</option>
            <option value="COMB1">COMB1</option>
            <option value="COMB2">COMB2</option>
            <option value="COMB3">COMB3</option>
          </select>

          <select
            name="preference2"
            value={formData.preference2}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Preference 2</option>
            <option value="COMB1">COMB1</option>
            <option value="COMB2">COMB2</option>
            <option value="COMB3">COMB3</option>
          </select>

          <select
            name="preference3"
            value={formData.preference3}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            required
          >
            <option value="">Preference 3</option>
            <option value="COMB1">COMB1</option>
            <option value="COMB2">COMB2</option>
            <option value="COMB3">COMB3</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white py-3 rounded-lg md:col-span-2 hover:bg-slate-700 transition"
          >
            {
              loading
                ? "Registering..."
                : "Register Student"
            }
          </button>

        </form>

      </div>

    </div>
  );
}