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

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD STUDENT
  // =====================================

  useEffect(() => {

    loadStudent();

  }, [regNo]);

  const loadStudent = async () => {

    try {

      const response =
        await api.get(
          `/student-registration/${regNo}`
        );

      setStudent(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
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
  // NO STUDENT
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

            {/* BASIC DETAILS */}
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

                  {student.assignedCombination ||
                    "Not Allocated"}

                </span>

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

              </div>

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* PROFILE CONTENT */}
        {/* ================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
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

              <div className="space-y-4">

                <div>

                  <p className="text-slate-500 text-sm">
                    Z-Score
                  </p>

                  <p className="font-semibold text-xl">
                    {student.zScore}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Current Level
                  </p>

                  <p className="font-semibold">
                    Level {student.level}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Assigned Combination
                  </p>

                  <p className="font-semibold">
                    {
                      student.assignedCombination ||
                      "Pending"
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="xl:col-span-2 space-y-8">

            {/* PREFERENCES */}
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Combination Preferences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                    text-center
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Preference 1
                  </p>

                  <h3 className="text-2xl font-bold">
                    {student.preference1}
                  </h3>

                </div>

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                    text-center
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Preference 2
                  </p>

                  <h3 className="text-2xl font-bold">
                    {student.preference2}
                  </h3>

                </div>

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                    text-center
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Preference 3
                  </p>

                  <h3 className="text-2xl font-bold">
                    {student.preference3}
                  </h3>

                </div>

              </div>

            </div>

            {/* ALLOCATION RESULT */}
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Allocation Result
              </h2>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-slate-900
                  text-white
                  rounded-2xl
                  p-8
                "
              >

                <div>

                  <p className="text-slate-300 mb-2">
                    Assigned Combination
                  </p>

                  <h1 className="text-5xl font-bold">

                    {
                      student.assignedCombination ||
                      "Pending"
                    }

                  </h1>

                </div>

                <div className="text-right">

                  <p className="text-slate-300 mb-2">
                    Allocation Status
                  </p>

                  <h2 className="text-2xl font-semibold">

                    {
                      student.assignedCombination
                        ? "Allocated"
                        : "Pending"
                    }

                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}