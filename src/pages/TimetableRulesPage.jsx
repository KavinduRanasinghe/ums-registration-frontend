import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function TimetableRulesPage() {

  // =====================================
  // STATES
  // =====================================

  const [rules, setRules] =
    useState([]);

  const [formData, setFormData] =
    useState({

      workingDays:
        "MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY",

      startTime: "08:00",

      endTime: "17:00",

      slotDuration: 2,

      lunchStart: "12:00",

      lunchEnd: "13:00",

      maxLecturesPerDay: 4,

      maxHoursPerLecturer: 6
    });

  // =====================================
  // LOAD RULES
  // =====================================

  useEffect(() => {

    loadRules();

  }, []);

  const loadRules = async () => {

    try {

      const response =
        await api.get(
          "/timetable-rules"
        );

      setRules(response.data);

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

      [e.target.name]:
        e.target.value
    });
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/timetable-rules",
        formData
      );

      alert(
        "Rules saved successfully"
      );

      loadRules();

    } catch (error) {

      console.error(error);

      alert("Failed to save");
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {

    try {

      await api.delete(
        `/timetable-rules/${id}`
      );

      loadRules();

    } catch (error) {

      console.error(error);
    }
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold mb-2">

            Timetable Rules

          </h1>

          <p className="text-slate-500 mb-8">

            Configure timetable generation constraints

          </p>

          <form
            onSubmit={handleSubmit}
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            {/* WORKING DAYS */}

            <div>

              <label className="block mb-2 font-semibold">

                Working Days

              </label>

              <input
                type="text"

                name="workingDays"

                value={formData.workingDays}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* START TIME */}

            <div>

              <label className="block mb-2 font-semibold">

                Start Time

              </label>

              <input
                type="time"

                name="startTime"

                value={formData.startTime}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* END TIME */}

            <div>

              <label className="block mb-2 font-semibold">

                End Time

              </label>

              <input
                type="time"

                name="endTime"

                value={formData.endTime}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* SLOT DURATION */}

            <div>

              <label className="block mb-2 font-semibold">

                Slot Duration (Hours)

              </label>

              <input
                type="number"

                name="slotDuration"

                value={formData.slotDuration}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* LUNCH START */}

            <div>

              <label className="block mb-2 font-semibold">

                Lunch Start

              </label>

              <input
                type="time"

                name="lunchStart"

                value={formData.lunchStart}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* LUNCH END */}

            <div>

              <label className="block mb-2 font-semibold">

                Lunch End

              </label>

              <input
                type="time"

                name="lunchEnd"

                value={formData.lunchEnd}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* MAX LECTURES */}

            <div>

              <label className="block mb-2 font-semibold">

                Max Lectures Per Day

              </label>

              <input
                type="number"

                name="maxLecturesPerDay"

                value={formData.maxLecturesPerDay}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* MAX HOURS */}

            <div>

              <label className="block mb-2 font-semibold">

                Max Hours Per Lecturer

              </label>

              <input
                type="number"

                name="maxHoursPerLecturer"

                value={formData.maxHoursPerLecturer}

                onChange={handleChange}

                className="
                  border
                  p-3
                  rounded-xl
                  w-full
                "
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"

              className="
                bg-slate-900
                text-white
                py-3
                rounded-xl
                hover:bg-slate-700
                transition
                md:col-span-2
              "
            >

              Save Rules

            </button>

          </form>

        </div>

        {/* ================================= */}
        {/* RULES TABLE */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">

            Existing Rules

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Working Days
                  </th>

                  <th className="p-4 text-left">
                    Time
                  </th>

                  <th className="p-4 text-left">
                    Slot Duration
                  </th>

                  <th className="p-4 text-left">
                    Max Lectures
                  </th>

                  <th className="p-4 text-left">
                    Max Hours
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  rules.map((rule) => (

                    <tr
                      key={rule.id}
                      className="
                        border-b
                        hover:bg-slate-50
                      "
                    >

                      <td className="p-4">
                        {rule.workingDays}
                      </td>

                      <td className="p-4">
                        {rule.startTime}
                        {" - "}
                        {rule.endTime}
                      </td>

                      <td className="p-4">
                        {rule.slotDuration} hrs
                      </td>

                      <td className="p-4">
                        {rule.maxLecturesPerDay}
                      </td>

                      <td className="p-4">
                        {rule.maxHoursPerLecturer}
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            handleDelete(rule.id)
                          }

                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                          "
                        >

                          Delete

                        </button>

                      </td>

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