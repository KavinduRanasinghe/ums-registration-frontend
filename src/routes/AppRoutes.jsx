import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";

import LoginPage from "../pages/LoginPage";

import StudentRegistrationPage
  from "../pages/StudentRegistrationPage";

import StudentsPage
  from "../pages/StudentsPage";

import AllocationPage
  from "../pages/AllocationPage";

import CourseRegistrationPage
  from "../pages/CourseRegistrationPage";

import AdminApprovalPage
  from "../pages/AdminApprovalPage";

import ModuleManagementPage
  from "../pages/ModuleManagementPage";

import LecturerRegistrationPage
  from "../pages/LecturerRegistrationPage";

import StudentProfilePage
  from "../pages/StudentProfilePage";

import LecturersPage
  from "../pages/LecturersPage";

import LecturerProfilePage
  from "../pages/LecturerProfilePage";

import LecturerModuleAssignmentPage
  from "../pages/LecturerModuleAssignmentPage";

import TimeTableRulesPage
  from "../pages/TimeTableRulesPage";

import TimetableGenerationPage
  from "../pages/TimetableGenerationPage";

import HallManagementPage
  from "../pages/HallManagementPage";

import ResultsManagementPage
  from "../pages/ResultsManagementPage";

import AttendanceManagementPage
  from "../pages/AttendanceManagementPage";

import AttendanceAnalyticsPage
  from "../pages/AttendanceAnalyticsPage";

import AttendanceScannerPage
  from "../pages/AttendanceScannerPage";

// =========================================
// PROTECTED ROUTE
// =========================================

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" />;
  }

  return children;
}

// =========================================
// APP ROUTES
// =========================================

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ================================= */}
        {/* DASHBOARD */}
        {/* ================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>

              <MainLayout>

                <Dashboard />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* STUDENTS */}
        {/* ================================= */}

        <Route
          path="/student-registration"
          element={
            <ProtectedRoute>

              <MainLayout>

                <StudentRegistrationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>

              <MainLayout>

                <StudentsPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/students/:regNo"
          element={
            <ProtectedRoute>

              <MainLayout>

                <StudentProfilePage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* LECTURERS */}
        {/* ================================= */}

        <Route
          path="/lecturer-registration"
          element={
            <ProtectedRoute>

              <MainLayout>

                <LecturerRegistrationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturers"
          element={
            <ProtectedRoute>

              <MainLayout>

                <LecturersPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturers/:lecturerId"
          element={
            <ProtectedRoute>

              <MainLayout>

                <LecturerProfilePage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturer-module-assignment"
          element={
            <ProtectedRoute>

              <MainLayout>

                <LecturerModuleAssignmentPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* MODULES */}
        {/* ================================= */}

        <Route
          path="/modules-management"
          element={
            <ProtectedRoute>

              <MainLayout>

                <ModuleManagementPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* ALLOCATION */}
        {/* ================================= */}

        <Route
          path="/allocation"
          element={
            <ProtectedRoute>

              <MainLayout>

                <AllocationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* COURSE REGISTRATION */}
        {/* ================================= */}

        <Route
          path="/course-registration"
          element={
            <ProtectedRoute>

              <MainLayout>

                <CourseRegistrationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* ADMIN APPROVAL */}
        {/* ================================= */}

        <Route
          path="/admin-approval"
          element={
            <ProtectedRoute>

              <MainLayout>

                <AdminApprovalPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* TIMETABLE */}
        {/* ================================= */}

        <Route
          path="/timetable-rules"
          element={
            <ProtectedRoute>

              <MainLayout>

                <TimeTableRulesPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/timetable-generation"
          element={
            <ProtectedRoute>

              <MainLayout>

                <TimetableGenerationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* HALLS */}
        {/* ================================= */}

        <Route
          path="/halls"
          element={
            <ProtectedRoute>

              <MainLayout>

                <HallManagementPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* RESULTS */}
        {/* ================================= */}

        <Route
          path="/results-management"
          element={
            <ProtectedRoute>

              <MainLayout>

                <ResultsManagementPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================================= */}
      {/* RESULTS */}
      {/* ================================= */}

      <Route
        path="/results-management"
        element={
          <ProtectedRoute>

            <MainLayout>

              <ResultsManagementPage />

            </MainLayout>

          </ProtectedRoute>
        }
      />

      {/* ================================= */}
      {/* ATTENDANCE MANAGEMENT */}
      {/* ================================= */}

      <Route
        path="/attendance-management"
        element={
          <ProtectedRoute>

            <MainLayout>

              <AttendanceManagementPage />

            </MainLayout>

          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance-analytics"
        element={
          <ProtectedRoute>

            <MainLayout>

              <AttendanceAnalyticsPage />

            </MainLayout>

          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance-scanner"
        element={
          <ProtectedRoute>

            <MainLayout>

              <AttendanceScannerPage />

            </MainLayout>

          </ProtectedRoute>
        }
      />

      </Routes>

    </BrowserRouter>
  );
}