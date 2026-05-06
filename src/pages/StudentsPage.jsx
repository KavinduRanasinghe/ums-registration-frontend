import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentsPage() {

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {

    try {

      const response = await api.get("/student-registration");

      setStudents(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Registered Students
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-900 text-white">

                <th className="p-3 text-left">Reg No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Z-Score</th>
                <th className="p-3 text-left">Combination</th>

              </tr>

            </thead>

            <tbody>

              {
                students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-3">{student.regNo}</td>

                    <td className="p-3">{student.name}</td>

                    <td className="p-3">{student.district}</td>

                    <td className="p-3">{student.zscore}</td>

                    <td className="p-3">
                      {student.assignedCombination}
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}