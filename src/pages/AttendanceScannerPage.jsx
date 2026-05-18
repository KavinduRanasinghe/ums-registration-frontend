import {
  useState
} from "react";

import api from "../api/axios";

export default function AttendanceScannerPage() {

  // =====================================
  // STATES
  // =====================================

  const [sessionCode, setSessionCode] =
    useState("");

  const [regNo, setRegNo] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // SUBMIT
  // =====================================

  const submitAttendance = async () => {

    try {

      if (
        !sessionCode ||
        !regNo ||
        !studentName
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      setLoading(true);

      await api.post(

        "/attendance/scan",

        {

          sessionCode,

          regNo,

          studentName
        }
      );

      alert(
        "Attendance marked successfully"
      );

      setSessionCode("");

    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Attendance failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-10
          w-full
          max-w-xl
        "
      >

        <h1 className="text-4xl font-bold mb-2 text-center">

          Attendance Scanner

        </h1>

        <p className="text-slate-500 text-center mb-8">

          Scan or enter attendance session code

        </p>

        {/* SESSION CODE */}

        <div className="mb-5">

          <label className="block mb-2 font-semibold">

            Session Code

          </label>

          <input
            type="text"

            value={sessionCode}

            onChange={(e) =>
              setSessionCode(
                e.target.value
              )
            }

            placeholder="Enter session code"

            className="
              w-full
              border
              p-4
              rounded-xl
              text-lg
              uppercase
            "
          />

        </div>

        {/* REG NO */}

        <div className="mb-5">

          <label className="block mb-2 font-semibold">

            Registration Number

          </label>

          <input
            type="text"

            value={regNo}

            onChange={(e) =>
              setRegNo(
                e.target.value
              )
            }

            placeholder="2022ICT01"

            className="
              w-full
              border
              p-4
              rounded-xl
            "
          />

        </div>

        {/* STUDENT NAME */}

        <div className="mb-8">

          <label className="block mb-2 font-semibold">

            Student Name

          </label>

          <input
            type="text"

            value={studentName}

            onChange={(e) =>
              setStudentName(
                e.target.value
              )
            }

            placeholder="Student name"

            className="
              w-full
              border
              p-4
              rounded-xl
            "
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={submitAttendance}

          disabled={loading}

          className="
            w-full
            bg-slate-900
            hover:bg-slate-700
            text-white
            py-4
            rounded-xl
            text-lg
            font-semibold
            transition
            disabled:opacity-50
          "
        >

          {
            loading
              ? "Submitting..."
              : "Mark Attendance"
          }

        </button>

      </div>

    </div>
  );
}