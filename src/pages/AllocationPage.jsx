import api from "../api/axios";

export default function AllocationPage() {

  const runAllocation = async () => {

    try {

      await api.post("/allocation");

      alert("Allocation Completed");

    } catch (error) {

      console.error(error);

      alert("Allocation Failed");
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-4">
          Allocation Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Run student combination allocation
        </p>

        <button
          onClick={runAllocation}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          Run Allocation
        </button>

      </div>

    </div>
  );
}