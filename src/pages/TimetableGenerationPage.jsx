import {
  useState
} from "react";

import api from "../api/axios";

export default function TimetableGenerationPage() {



  const [timetable, setTimetable] =
    useState([]);

  // =====================================
  // GENERATE
  // =====================================

  const generate = async () => {

  try {

    const response =
      await api.post(
        "/timetable/generate"
      );

    setTimetable(response.data);

    alert(
      "Timetable generated successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Generation failed"
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

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

          <h1 className="text-4xl font-bold mb-2">

            Timetable Generation

          </h1>

          <p className="text-slate-500 mb-8">

            Generate combination-wise timetable

          </p>

          {/* CONTROLS */}

          <div className="flex gap-4">

            <button
              onClick={generate}

              className="
                bg-slate-900
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-slate-700
              "
            >

              Generate Timetable

            </button>

          </div>

        </div>

        {/* TIMETABLE */}

        {/* ===================================== */}
{/* TIMETABLE TABLE */}
{/* ===================================== */}

<div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

  <h2 className="text-3xl font-bold mb-6">

    Generated Timetable

  </h2>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="bg-slate-900 text-white">

          <th className="p-4 text-left">
            Day
          </th>

          <th className="p-4 text-left">
            Time
          </th>

          <th className="p-4 text-left">
            Module
          </th>

          <th className="p-4 text-left">
            Lecturer
          </th>

          <th className="p-4 text-left">
            Venue
          </th>

        </tr>

      </thead>

      <tbody>

        {
          timetable.map((item) => (

            <tr
              key={item.id}
              className="
                border-b
                hover:bg-slate-50
              "
            >

              <td className="p-4">
                {item.day}
              </td>

              <td className="p-4">

                {item.startTime}
                {" - "}
                {item.endTime}

              </td>

              <td className="p-4">

                {item.moduleCode}
                {" - "}
                {item.moduleName}

              </td>

              <td className="p-4">

                {item.lecturerName}

              </td>

              <td className="p-4">

                {item.venue}

              </td>

            </tr>
          ))
        }

      </tbody>

    </table>

  </div>

</div>

{/* ===================================== */}
{/* WEEKLY TIMETABLE GRID */}
{/* ===================================== */}

<div className="bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-3xl font-bold mb-6">

    Weekly Timetable View

  </h2>

  <div className="overflow-x-auto">

    <table className="w-full border-collapse">

      <thead>

        <tr className="bg-slate-900 text-white">

          <th className="p-4 border">
            Time
          </th>

          <th className="p-4 border">
            Monday
          </th>

          <th className="p-4 border">
            Tuesday
          </th>

          <th className="p-4 border">
            Wednesday
          </th>

          <th className="p-4 border">
            Thursday
          </th>

          <th className="p-4 border">
            Friday
          </th>

        </tr>

      </thead>

      <tbody>

        {
          [

            "08:00",
            "10:00",
            "13:00",
            "15:00"

          ].map((time) => (

            <tr
              key={time}
              className="border-b"
            >

              {/* TIME SLOT */}

              <td
                className="
                  p-4
                  border
                  font-semibold
                  bg-slate-50
                "
              >

                {time}

              </td>

              {/* MONDAY */}

              {
                [

                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY"

                ].map((day) => {

                  const session =
                    timetable.find(

                      (t) =>

                        t.day === day &&

                        t.startTime
                          ?.substring(0, 5) ===
                        time
                    );

                  return (

                    <td
                      key={day}

                      className="
                        p-3
                        border
                        align-top
                        h-32
                      "
                    >

                      {
                        session && (

                          <div
                            className="
                              bg-slate-900
                              text-white
                              rounded-xl
                              p-3
                              text-sm
                            "
                          >

                            <p className="font-bold">

                              {
                                session.moduleCode
                              }

                            </p>

                            <p className="mt-1">

                              {
                                session.moduleName
                              }

                            </p>

                            <p className="mt-2 text-xs">

                              {
                                session.lecturerName
                              }

                            </p>

                            <p className="text-xs">

                              {
                                session.venue
                              }

                            </p>

                          </div>
                        )
                      }

                    </td>
                  );
                })
              }

            </tr>
          ))
        }

      </tbody>

    </table>

  </div>

</div>
      </div>

    </div>
  );
}