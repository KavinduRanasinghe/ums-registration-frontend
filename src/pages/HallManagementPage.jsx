import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function HallManagementPage() {

  // =====================================
  // STATES
  // =====================================

  const [halls, setHalls] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [capacityEdit, setCapacityEdit] =
    useState("");

  const [formData, setFormData] =
    useState({

      hallCode: "",

      hallName: "",

      capacity: "",

      hallType: "Lecture Hall",

      active: true
    });

  // =====================================
  // LOAD HALLS
  // =====================================

  useEffect(() => {

    loadHalls();

  }, []);

  const loadHalls = async () => {

    try {

      const response =
        await api.get("/halls");

      setHalls(response.data);

    } catch (error) {

      console.error(error);
    }
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
  // SAVE HALL
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/halls",
        formData
      );

      alert(
        "Hall added successfully"
      );

      setFormData({

        hallCode: "",

        hallName: "",

        capacity: "",

        hallType: "Lecture Hall",

        active: true
      });

      loadHalls();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add hall"
      );
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this hall?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/halls/${id}`
      );

      loadHalls();

    } catch (error) {

      console.error(error);

      alert(
        "Delete failed"
      );
    }
  };

  // =====================================
  // START EDIT
  // =====================================

  const startEdit = (hall) => {

    setEditingId(hall.id);

    setCapacityEdit(
      hall.capacity
    );
  };

  // =====================================
  // UPDATE CAPACITY
  // =====================================

  const updateCapacity = async (id) => {

    try {

      await api.put(

        `/halls/${id}/capacity?capacity=${capacityEdit}`
      );

      setEditingId(null);

      loadHalls();

    } catch (error) {

      console.error(error);

      alert(
        "Update failed"
      );
    }
  };

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

            Hall Management

          </h1>

          <p className="text-slate-500 mb-8">

            Manage halls, capacities and venue allocations

          </p>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}

            className="
              grid
              grid-cols-1
              md:grid-cols-5
              gap-4
            "
          >

            {/* HALL CODE */}

            <input
              type="text"

              name="hallCode"

              placeholder="Hall Code"

              value={formData.hallCode}

              onChange={handleChange}

              className="
                border
                p-3
                rounded-xl
              "

              required
            />

            {/* HALL NAME */}

            <input
              type="text"

              name="hallName"

              placeholder="Hall Name"

              value={formData.hallName}

              onChange={handleChange}

              className="
                border
                p-3
                rounded-xl
              "

              required
            />

            {/* CAPACITY */}

            <input
              type="number"

              name="capacity"

              placeholder="Capacity"

              value={formData.capacity}

              onChange={handleChange}

              className="
                border
                p-3
                rounded-xl
              "

              required
            />

            {/* TYPE */}

            <select
              name="hallType"

              value={formData.hallType}

              onChange={handleChange}

              className="
                border
                p-3
                rounded-xl
              "
            >

              <option>
                Lecture Hall
              </option>

              <option>
                Computer Lab
              </option>

              <option>
                Auditorium
              </option>

            </select>

            {/* BUTTON */}

            <button
              type="submit"

              className="
                bg-slate-900
                text-white
                rounded-xl
                hover:bg-slate-700
                transition
              "
            >

              Add Hall

            </button>

          </form>

        </div>

        {/* ================================= */}
        {/* HALL TABLE */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

              Hall Details

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

              Total Halls:
              {" "}
              {halls.length}

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-4 text-left">
                    Hall Code
                  </th>

                  <th className="p-4 text-left">
                    Hall Name
                  </th>

                  <th className="p-4 text-left">
                    Capacity
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  halls.map((hall) => (

                    <tr
                      key={hall.id}

                      className="
                        border-b
                        hover:bg-slate-50
                      "
                    >

                      {/* CODE */}

                      <td className="p-4 font-semibold">

                        {hall.hallCode}

                      </td>

                      {/* NAME */}

                      <td className="p-4">

                        {hall.hallName}

                      </td>

                      {/* CAPACITY */}

                      <td className="p-4">

                        {
                          editingId === hall.id ? (

                            <div className="flex gap-2">

                              <input
                                type="number"

                                value={capacityEdit}

                                onChange={(e) =>
                                  setCapacityEdit(
                                    e.target.value
                                  )
                                }

                                className="
                                  border
                                  p-2
                                  rounded-lg
                                  w-24
                                "
                              />

                              <button
                                onClick={() =>
                                  updateCapacity(
                                    hall.id
                                  )
                                }

                                className="
                                  bg-green-600
                                  text-white
                                  px-3
                                  rounded-lg
                                "
                              >

                                Save

                              </button>

                            </div>

                          ) : (

                            <span>

                              {hall.capacity}

                            </span>
                          )
                        }

                      </td>

                      {/* TYPE */}

                      <td className="p-4">

                        {hall.hallType}

                      </td>

                      {/* STATUS */}

                      <td className="p-4">

                        {
                          hall.active ? (

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

                              Active

                            </span>

                          ) : (

                            <span
                              className="
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                              "
                            >

                              Inactive

                            </span>
                          )
                        }

                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex gap-3">

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              startEdit(hall)
                            }

                            className="
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            Edit Capacity

                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                hall.id
                              )
                            }

                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            Delete

                          </button>

                        </div>

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