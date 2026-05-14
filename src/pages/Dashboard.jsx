import {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import api from "../api/axios";

export default function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD DASHBOARD DATA
  // =====================================

  useEffect(() => {

    loadDashboardStats();

  }, []);

  const loadDashboardStats =
    async () => {

      try {

        const response =
          await api.get(
            "/dashboard/stats"
          );

        setStats(response.data);

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
          Loading Dashboard...
        </h1>

      </div>
    );
  }

  // =====================================
  // SAFETY
  // =====================================

  if (!stats) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">
          Failed to load dashboard
        </h1>

      </div>
    );
  }

  // =====================================
  // CHART COLORS
  // =====================================

  const COLORS = [
    "#0f172a",
    "#334155",
    "#64748b"
  ];

  // =====================================
  // SAMPLE DISTRICT DATA
  // =====================================

  const districtData = [

    {
      district: "Colombo",
      students: 65
    },

    {
      district: "Kandy",
      students: 52
    },

    {
      district: "Galle",
      students: 40
    },

    {
      district: "Kurunegala",
      students: 48
    },

    {
      district: "Jaffna",
      students: 25
    }
  ];

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          University Management System Overview
        </p>

      </div>

      {/* ================================= */}
      {/* TOP CARDS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL STUDENTS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Total Students
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.totalStudents}
          </h2>

        </div>

        {/* ALLOCATED */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Allocated Students
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            {stats.allocatedStudents}
          </h2>

        </div>

        {/* UNALLOCATED */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Unallocated Students
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-3">
            {stats.unallocatedStudents}
          </h2>

        </div>

        {/* SUCCESS RATE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Allocation Success
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">

            {
              Math.round(
                (
                  stats.allocatedStudents /
                  stats.totalStudents
                ) * 100
              )
            }%

          </h2>

        </div>

      </div>

      {/* ================================= */}
      {/* SECOND ROW */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* HIGHEST */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Highest Z-Score
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-3">
            {stats.highestZScore}
          </h2>

        </div>

        {/* LOWEST */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Lowest Z-Score
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-3">
            {stats.lowestZScore}
          </h2>

        </div>

        {/* AVERAGE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-slate-500 text-sm">
            Average Z-Score
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-3">
            {stats.averageZScore}
          </h2>

        </div>

      </div>

      {/* ================================= */}
      {/* CHARTS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Combination Distribution
          </h2>

          <div className="h-96">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={stats.combinationStats}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  label
                >

                  {
                    stats.combinationStats.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index %
                            COLORS.length]
                          }
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* DISTRICT CHART */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Students by District
          </h2>

          <div className="h-96">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={districtData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="district"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="students"
                  fill="#0f172a"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* CAPACITY TRACKER */}
      {/* ================================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Combination Capacity Tracker
        </h2>

        <div className="space-y-6">

          {
            stats.combinationStats.map(
              (combination) => (

                <div
                  key={combination.name}
                >

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {combination.name}
                    </span>

                    <span>

                      {combination.value}
                      /
                      {combination.capacity}

                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-4">

                    <div
                      className="bg-slate-900 h-4 rounded-full"
                      style={{
                        width: `${

                          (
                            combination.value /
                            combination.capacity
                          ) * 100

                        }%`
                      }}
                    />

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}