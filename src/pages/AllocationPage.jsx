import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

export default function AllocationPage() {

  // =====================================
  // STATES
  // =====================================

  const [capacities, setCapacities] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // LOAD CAPACITIES
  // =====================================

  useEffect(() => {

    loadCapacities();

  }, []);

  const loadCapacities = async () => {

    try {

      const response =
        await api.get(
          "/allocation/capacities"
        );

      setCapacities(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load capacities");
    }
  };

  // =====================================
  // UPDATE CAPACITY
  // =====================================

  const updateCapacity =
    async (combination, capacity) => {

      try {

        await api.put(

          `/allocation/capacity/${combination}?capacity=${capacity}`

        );

        alert(
          `${combination} capacity updated`
        );

      } catch (error) {

        console.error(error);

        alert("Failed to update capacity");
      }
    };

  // =====================================
  // RUN ALLOCATION
  // =====================================

  const runAllocation = async () => {

    try {

      setLoading(true);

      await api.post("/allocation");

      alert("Allocation Completed");

    } catch (error) {

      console.error(error);

      alert("Allocation Failed");

    } finally {

      setLoading(false);
    }
  };

  const resetAllocation = async () => {

  const confirmReset =
    window.confirm(
      "Are you sure you want to reset allocation?"
    );

  if (!confirmReset) return;

  try {

    await api.delete(
      "/allocation/reset"
    );

    alert(
      "Allocation reset successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to reset allocation"
    );
  }
};

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

          <h1 className="text-3xl font-bold mb-4">
            Allocation Dashboard
          </h1>

          <p className="text-gray-500">
            Manage combination capacities
            and run student allocation
          </p>

        </div>

        {/* ================================= */}
        {/* CAPACITY MANAGEMENT */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Combination Capacities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {
              capacities.map(
                (item, index) => (

                  <div
                    key={index}
                    className="
                      border
                      rounded-2xl
                      p-6
                      bg-slate-50
                    "
                  >

                    <h3 className="text-xl font-bold mb-4">

                      {item.combination}

                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                      Student Capacity
                    </p>

                    <input
                      type="number"

                      value={item.capacity}

                      onChange={(e) => {

                        const updated =
                          [...capacities];

                        updated[index].capacity =
                          Number(
                            e.target.value
                          );

                        setCapacities(updated);
                      }}

                      className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                      "
                    />

                    <button

                      onClick={() =>
                        updateCapacity(
                          item.combination,
                          item.capacity
                        )
                      }

                      className="
                        w-full
                        bg-slate-900
                        text-white
                        py-3
                        rounded-lg
                        hover:bg-slate-700
                        transition
                      "
                    >
                      Save Capacity
                    </button>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* ================================= */}
        {/* RUN ALLOCATION */}
        {/* ================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-4">
            Run Allocation
          </h2>

          <p className="text-gray-500 mb-6">
            Execute the allocation process
            based on current capacities
          </p>

          <button
            onClick={runAllocation}

            disabled={loading}

            className={`
              px-8
              py-4
              rounded-xl
              text-white
              font-semibold
              transition

              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >

            {
              loading
                ? "Running Allocation..."
                : "Run Allocation"
            }

          </button>

          <button
            onClick={resetAllocation}

            className="
              ml-4
              px-8
              py-4
              rounded-xl
              text-white
              font-semibold
              bg-red-600
              hover:bg-red-700
              transition
            "
          >
            Reset Allocation
          </button>

        </div>

      </div>

    </div>
  );
}
