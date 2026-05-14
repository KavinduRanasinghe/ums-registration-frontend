import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../api/axios";

export default function LecturerProfilePage() {

  // =====================================
  // ROUTE PARAM
  // =====================================

  const { lecturerId } = useParams();

  // =====================================
  // STATES
  // =====================================

  const [lecturer, setLecturer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD LECTURER
  // =====================================

  useEffect(() => {

    loadLecturer();

  }, [lecturerId]);

  const loadLecturer = async () => {

    try {

      const response =
        await api.get(
          `/lecturers/${lecturerId}`
        );

      setLecturer(response.data);

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
          Loading Lecturer Profile...
        </h1>

      </div>
    );
  }

  // =====================================
  // NOT FOUND
  // =====================================

  if (!lecturer) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">
          Lecturer Not Found
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
        {/* PROFILE HEADER */}
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

              {lecturer.fullName?.charAt(0)}

            </div>

            {/* BASIC DETAILS */}
            <div className="flex-1">

              <h1 className="text-4xl font-bold mb-3">

                {lecturer.fullName}

              </h1>

              <p className="text-slate-500 text-lg mb-2">

                Lecturer ID:
                {" "}
                {lecturer.lecturerId}

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

                  {lecturer.department}

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

                  {lecturer.designation}

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
                    {lecturer.fullName}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Initials
                  </p>

                  <p className="font-semibold">
                    {lecturer.initials}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Gender
                  </p>

                  <p className="font-semibold">
                    {lecturer.gender}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Email
                  </p>

                  <p className="font-semibold">
                    {lecturer.email}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Mobile
                  </p>

                  <p className="font-semibold">
                    {lecturer.mobile}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="xl:col-span-2 space-y-8">

            {/* ACADEMIC DETAILS */}
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                Academic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Department
                  </p>

                  <h3 className="text-2xl font-bold">
                    {lecturer.department}
                  </h3>

                </div>

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Designation
                  </p>

                  <h3 className="text-2xl font-bold">
                    {lecturer.designation}
                  </h3>

                </div>

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Qualification
                  </p>

                  <h3 className="text-2xl font-bold">
                    {lecturer.qualification}
                  </h3>

                </div>

                <div
                  className="
                    bg-slate-100
                    rounded-xl
                    p-6
                  "
                >

                  <p className="text-slate-500 text-sm mb-2">
                    Status
                  </p>

                  <h3 className="text-2xl font-bold">

                    {
                      lecturer.active
                        ? "Active"
                        : "Inactive"
                    }

                  </h3>

                </div>

              </div>

            </div>

            {/* SYSTEM STATUS */}
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6">
                System Status
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
                    Current Role
                  </p>

                  <h1 className="text-4xl font-bold">
                    Lecturer
                  </h1>

                </div>

                <div className="text-right">

                  <p className="text-slate-300 mb-2">
                    Account Status
                  </p>

                  <h2 className="text-2xl font-semibold">

                    {
                      lecturer.active
                        ? "Active"
                        : "Disabled"
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