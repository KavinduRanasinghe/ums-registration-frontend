import { useState } from "react";
import api from "../api/axios";

export default function CourseRegistrationPage() {

  const [regNo, setRegNo] = useState("");
  const [combination, setCombination] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [credits, setCredits] = useState(0);

  const loadModules = async () => {

    try {

      const response = await api.get(
        `/modules/by-combination?combination=${combination}&level=1`
      );

      setModules(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const toggleModule = (module) => {

    let updated = [...selectedModules];

    const exists = updated.find(
      (m) => m.code === module.code
    );

    if (exists) {

      updated = updated.filter(
        (m) => m.code !== module.code
      );

    } else {

      updated.push(module);
    }

    setSelectedModules(updated);

    const total = updated.reduce(
      (sum, m) => sum + m.credits,
      0
    );

    setCredits(total);
  };

  const submitRegistration = async () => {

    try {

      await api.post("/course-registration", {
        regNo,
        moduleCodes: selectedModules.map(
          (m) => m.code
        )
      });

      alert("Course Registration Successful");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.error ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Course Registration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <select
            value={combination}
            onChange={(e) => setCombination(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Combination</option>
            <option value="COMB1">COMB1</option>
            <option value="COMB2">COMB2</option>
            <option value="COMB3">COMB3</option>
          </select>

          <button
            onClick={loadModules}
            className="bg-slate-900 text-white rounded-lg"
          >
            Load Modules
          </button>

        </div>

        <div className="mb-6">

          <h2 className="text-xl font-bold mb-3">
            Available Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {
              modules.map((module) => (

                <div
                  key={module.code}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold">
                      {module.code}
                    </h3>

                    <p>{module.name}</p>

                    <p className="text-sm text-gray-500">
                      {module.credits} Credits
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    onChange={() => toggleModule(module)}
                  />

                </div>
              ))
            }

          </div>

        </div>

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Total Credits: {credits}
          </h2>

          <button
            onClick={submitRegistration}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Submit Registration
          </button>

        </div>

      </div>

    </div>
  );
}