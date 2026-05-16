import {
  useEffect,
  useState
} from "react";

import QRCode from "react-qr-code";

import api from "../api/axios";

export default function AttendanceManagementPage() {

  // =====================================
  // STATES
  // =====================================

  const [lecturers, setLecturers] =
    useState([]);

  const [modules, setModules] =
    useState([]);

  const [session, setSession] =
    useState(null);

  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      lecturerId: "",

      lecturerName: "",

      moduleCode: "",

      moduleName: "",

      hall: "HALL_A"
    });

  // =====================================
  // LOAD INITIAL DATA
  // =====================================

  useEffect(() => {

    loadLecturers();

    loadModules();

  }, []);

  // =====================================
  // LOAD LECTURERS
  // =====================================

  const loadLecturers = async () => {

    try {

      const response =
        await api.get(
          "/lecturers"
        );

      setLecturers(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to load lecturers",
        error
      );
    }
  };

  // =====================================
  // LOAD MODULES
  // =====================================

  const loadModules = async () => {

    try {

      const response =
        await api.get(
          "/modules"
        );

      setModules(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to load modules",
        error
      );
    }
  };

  // =====================================
  // HANDLE LECTURER
  // =====================================

  const handleLecturer = (e) => {

    const lecturer =
      lecturers.find(

        (l) =>
          l.lecturerId ===
          e.target.value
      );

    if (!lecturer) return;

    setFormData({

      ...formData,

      lecturerId:
        lecturer.lecturerId,

      lecturerName:
        lecturer.fullName
    });
  };

  // =====================================
  // HANDLE MODULE
  // =====================================

  const handleModule = (e) => {

    const module =
      modules.find(

        (m) =>
          m.code ===
          e.target.value
      );

    if (!module) return;

    setFormData({

      ...formData,

      moduleCode:
        module.code,

      moduleName:
        module.name
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
  // START SESSION
  // =====================================

  const startSession = async () => {

    try {

      if (
        !formData.lecturerId ||
        !formData.moduleCode
      ) {

        alert(
          "Please select lecturer and module"
        );

        return;
      }

      setLoading(true);

      const response =
        await api.post(

          "/attendance/session/start",

          formData
        );

      console.log(
        "SESSION RESPONSE:",
        response.data
      );

      if (!response.data) {

        alert(
          "Invalid session response"
        );

        return;
      }

      setSession(
        response.data
      );

      alert(
        "Attendance session started successfully"
      );

    } catch (error) {

      console.error(
        "Start session failed",
        error
      );

      alert(
        "Failed to start attendance session"
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // END SESSION
  // =====================================

  const endSession = async () => {

    try {

      if (!session?.sessionCode)
        return;

      await api.put(

        `/attendance/session/end/${session.sessionCode}`
      );

      alert(
        "Attendance session ended"
      );

      setSession(null);

      setAttendance([]);

    } catch (error) {

      console.error(
        "End session failed",
        error
      );

      alert(
        "Failed to end session"
      );
    }
  };

  // =====================================
  // LOAD ATTENDANCE
  // =====================================

  const loadAttendance = async () => {

    try {

      if (!session?.sessionCode)
        return;

      const response =
        await api.get(

          `/attendance/${session.sessionCode}`
        );

      setAttendance(

        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to load attendance",
        error
      );
    }
  };

  // =====================================
  // AUTO REFRESH
  // =====================================

  useEffect(() => {

    if (!session?.sessionCode)
      return;

    loadAttendance();

    const interval =
      setInterval(() => {

        loadAttendance();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [session]);

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

          <h1 className="text-4xl font-bold mb-2">

            Attendance Management

          </h1>

          <p className="text-slate-500 mb-8">

            QR-based lecture attendance system

          </p>

          {/* ================================= */}
          {/* SESSION FORM */}
          {/* ================================= */}

          {
            !session && (

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-4
                "
              >

                {/* LECTURER */}

                <select
                  onChange={
                    handleLecturer
                  }

                  className="
                    border
                    p-3
                    rounded-xl
                  "
                >

                  <option value="">
                    Select Lecturer
                  </option>

                  {
                    lecturers.map((lecturer) => (

                      <option
                        key={
                          lecturer.lecturerId
                        }

                        value={
                          lecturer.lecturerId
                        }
                      >

                        {
                          lecturer.lecturerId
                        }
                        {" - "}
                        {
                          lecturer.fullName
                        }

                      </option>
                    ))
                  }

                </select>

                {/* MODULE */}

                <select
                  onChange={
                    handleModule
                  }

                  className="
                    border
                    p-3
                    rounded-xl
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

                {/* HALL */}

                <input
                  type="text"

                  name="hall"

                  value={
                    formData.hall
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Hall"

                  className="
                    border
                    p-3
                    rounded-xl
                  "
                />

                {/* START BUTTON */}

                <button
                  onClick={
                    startSession
                  }

                  disabled={loading}

                  className="
                    bg-slate-900
                    text-white
                    rounded-xl
                    hover:bg-slate-700
                    transition
                    disabled:opacity-50
                  "
                >

                  {
                    loading
                      ? "Starting..."
                      : "Start Session"
                  }

                </button>

              </div>
            )
          }

        </div>

        {/* ================================= */}
        {/* ACTIVE SESSION */}
        {/* ================================= */}

        {
          session && (

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-8
              "
            >

              {/* ================================= */}
              {/* QR PANEL */}
              {/* ================================= */}

              <div
  className="
    bg-white
    p-6
    rounded-2xl
    border
    shadow
  "
>

  {
    session?.sessionCode ? (

      <QRCode
        value={session.sessionCode}

        size={250}

        bgColor="#FFFFFF"

        fgColor="#000000"

        level="H"
      />

    ) : (

      <div
        className="
          w-[250px]
          h-[250px]
          flex
          items-center
          justify-center
          border
        "
      >

        No QR Available

      </div>
    )
  }

</div>

              {/* ================================= */}
              {/* SESSION DETAILS */}
              {/* ================================= */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-8
                "
              >

                <h2 className="text-2xl font-bold mb-6">

                  Session Details

                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-slate-500 text-sm">
                      Lecturer
                    </p>

                    <p className="font-semibold">

                      {
                        session?.lecturerName
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Module
                    </p>

                    <p className="font-semibold">

                      {
                        session?.moduleCode
                      }
                      {" - "}
                      {
                        session?.moduleName
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Hall
                    </p>

                    <p className="font-semibold">

                      {
                        session?.hall
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Attendance Count
                    </p>

                    <p
                      className="
                        text-5xl
                        font-bold
                        text-green-600
                      "
                    >

                      {
                        attendance.length
                      }

                    </p>

                  </div>

                </div>

              </div>

              {/* ================================= */}
              {/* LIVE ATTENDANCE */}
              {/* ================================= */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-8
                "
              >

                <h2 className="text-2xl font-bold mb-6">

                  Live Attendance

                </h2>

                <div
                  className="
                    max-h-[500px]
                    overflow-y-auto
                    space-y-3
                  "
                >

                  {
                    attendance.length > 0 ? (

                      attendance.map((record) => (

                        <div
                          key={record.id}

                          className="
                            border
                            rounded-xl
                            p-4
                            flex
                            justify-between
                            items-center
                          "
                        >

                          <div>

                            <p className="font-semibold">

                              {
                                record.studentName
                              }

                            </p>

                            <p
                              className="
                                text-sm
                                text-slate-500
                              "
                            >

                              {
                                record.regNo
                              }

                            </p>

                          </div>

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

                            PRESENT

                          </span>

                        </div>
                      ))

                    ) : (

                      <div
                        className="
                          text-center
                          text-slate-500
                          py-10
                        "
                      >

                        No attendance records yet

                      </div>
                    )
                  }

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}