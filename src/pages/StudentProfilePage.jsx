import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../api/axios";

export default function StudentProfilePage() {

  // =====================================
  // ROUTE PARAM
  // =====================================

  const { regNo } = useParams();

  // =====================================
  // STATES
  // =====================================

  const [student, setStudent] =
    useState(null);

  const [modules, setModules] =
    useState([]);

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    loadStudent();

  }, [regNo]);

  const loadStudent = async () => {

    try {

      // =====================================
      // STUDENT
      // =====================================

      const response =
        await api.get(
          `/student-registration/${regNo}`
        );

      setStudent(
        response.data
      );

      // =====================================
      // REGISTERED MODULES
      // =====================================

      const moduleResponse =
        await api.get(
          `/registered-modules/student/${regNo}`
        );

      setModules(
        moduleResponse.data
      );

      // =====================================
      // RESULTS
      // =====================================

      const resultsResponse =
        await api.get(
          `/results/${regNo}`
        );

      setResults(
        resultsResponse.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // GPA CALCULATION
  // =====================================

  const calculateGPA = () => {

    if (results.length === 0)
      return "0.00";

    let totalPoints = 0;

    let totalCredits = 0;

    results.forEach((result) => {

      if (
        result.gpaPoint &&
        result.credits
      ) {

        totalPoints +=
          result.gpaPoint *
          result.credits;

        totalCredits +=
          result.credits;
      }
    });

    if (totalCredits === 0)
      return "0.00";

    return (
      totalPoints / totalCredits
    ).toFixed(2);
  };

  // =====================================
  // ACADEMIC STANDING
  // =====================================

  const getAcademicStanding = () => {

    const gpa =
      parseFloat(
        calculateGPA()
      );

    if (gpa >= 3.5)
      return "Dean's List";

    if (gpa >= 2.0)
      return "Good Standing";

    return "Academic Warning";
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold">

          Loading Student Profile...

        </h1>

      </div>
    );
  }

  // =====================================
  // STUDENT NOT FOUND
  // =====================================

  if (!student) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">

          Student Not Found

        </h1>

      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* PROFILE IMAGE */}

            <div
              className="
                w-40
                h-40
                rounded-full
                bg-slate-900
                flex
                items-center
                justify-center
                text-white
                text-5xl
                font-bold
              "
            >

              {student.name?.charAt(0)}

            </div>

            {/* DETAILS */}

            <div className="flex-1">

              <h1 className="text-4xl font-bold mb-3">

                {student.name}

              </h1>

              <p className="text-slate-500 text-lg mb-2">

                Registration Number:
                {" "}
                {student.regNo}

              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                {/* COMBINATION */}

                <span
                  className="
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  {
                    student.assignedCombination ||
                    "Not Allocated"
                  }

                </span>

                {/* LEVEL */}

                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  Level {student.level}

                </span>

                {/* GPA */}

                <span
                  className="
                    bg-purple-100
                    text-purple-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >

                  GPA {calculateGPA()}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="space-y-8">

            {/* PERSONAL INFO */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Personal Information

              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {student.name}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Initials
                  </p>

                  <p className="font-semibold">
                    {student.initials}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Gender
                  </p>

                  <p className="font-semibold">
                    {student.gender}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    District
                  </p>

                  <p className="font-semibold">
                    {student.district}
                  </p>

                </div>

              </div>

            </div>

            {/* ACADEMIC STATUS */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Academic Status

              </h2>

              <div className="space-y-5">

                <div>

                  <p className="text-slate-500 text-sm">
                    Current GPA
                  </p>

                  <p
                    className="
                      text-4xl
                      font-bold
                      text-green-600
                    "
                  >

                    {calculateGPA()}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Academic Standing
                  </p>

                  <p className="font-semibold text-lg">

                    {getAcademicStanding()}

                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Current Class
                  </p>

                  <p className="font-semibold">
                    HALL_A
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Registered Modules
                  </p>

                  <p className="font-semibold">
                    {modules.length}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <div className="xl:col-span-2 space-y-8">

            {/* RESULTS TABLE */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                  Registered Modules & Results

                </h2>

                <div
                  className="
                    bg-slate-100
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                  "
                >

                  Total Results:
                  {" "}
                  {results.length}

                </div>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-slate-900 text-white">

                      <th className="p-4 text-left">
                        Module Code
                      </th>

                      <th className="p-4 text-left">
                        Module Name
                      </th>

                      <th className="p-4 text-left">
                        Credits
                      </th>

                      <th className="p-4 text-left">
                        Grade
                      </th>

                      <th className="p-4 text-left">
                        GPA Point
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      results.length > 0 ? (

                        results.map((result) => (

                          <tr
                            key={result.id}

                            className="
                              border-b
                              hover:bg-slate-50
                            "
                          >

                            <td className="p-4 font-semibold">

                              {result.moduleCode}

                            </td>

                            <td className="p-4">

                              {result.moduleName}

                            </td>

                            <td className="p-4">

                              {result.credits}

                            </td>

                            <td className="p-4">

                              <span
                                className="
                                  bg-green-100
                                  text-green-700
                                  px-3
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-semibold
                                "
                              >

                                {result.grade}

                              </span>

                            </td>

                            <td className="p-4 font-bold">

                              {result.gpaPoint}

                            </td>

                          </tr>
                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="5"

                            className="
                              text-center
                              p-8
                              text-slate-500
                            "
                          >

                            No Results Available

                          </td>

                        </tr>
                      )
                    }

                  </tbody>

                </table>

              </div>

            </div>

            {/* SEMESTER PERFORMANCE */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Semester Performance

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-slate-100 rounded-xl p-6">

                  <p className="text-slate-500 text-sm">
                    GPA
                  </p>

                  <h1 className="text-4xl font-bold mt-2">

                    {calculateGPA()}

                  </h1>

                </div>

                <div className="bg-slate-100 rounded-xl p-6">

                  <p className="text-slate-500 text-sm">
                    Credits Earned
                  </p>

                  <h1 className="text-4xl font-bold mt-2">

                    {
                      results.reduce(

                        (sum, result) =>

                          sum + result.credits,

                        0
                      )
                    }

                  </h1>

                </div>

                <div className="bg-slate-100 rounded-xl p-6">

                  <p className="text-slate-500 text-sm">
                    Completed Modules
                  </p>

                  <h1 className="text-4xl font-bold mt-2">

                    {results.length}

                  </h1>

                </div>

                <div className="bg-slate-100 rounded-xl p-6">

                  <p className="text-slate-500 text-sm">
                    Academic Standing
                  </p>

                  <h1
                    className="
                      text-xl
                      font-bold
                      mt-4
                      text-green-600
                    "
                  >

                    {getAcademicStanding()}

                  </h1>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}