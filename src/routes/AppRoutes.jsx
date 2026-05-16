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
import LecturersPage from "../pages/LecturersPage";

import LecturerProfilePage
  from "../pages/LecturerProfilePage";

import LecturerModuleAssignmentPage 
  from "../pages/LecturerModuleAssignmentPage";

import TimeTableRulesPage 
  from "../pages/TimeTableRulesPage";
import TimetableGenerationPage from "../pages/TimetableGenerationPage";
import HallManagementPage from "../pages/HallManagementPage";


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
        {/* PUBLIC ROUTE */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ================================= */}
        {/* PROTECTED ROUTES */}
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
          path="/allocation"
          element={
            <ProtectedRoute>

              <MainLayout>

                <AllocationPage />

              </MainLayout>

            </ProtectedRoute>
          }
        />

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
          path="/students/:regNo"
          element={<StudentProfilePage />}
        />

        <Route
          path="/lecturers/:id"
          element={<LecturerProfilePage />}
        />  
        
        <Route
          path="/lecturers"
          element={<LecturersPage />}
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

         <Route
          path="/timetable-rules"
          element={<TimeTableRulesPage />}
        />

        <Route
          path="/timetable-generation"
          element={<TimetableGenerationPage />}
        />

        <Route
        path="/halls"
        element={<HallManagementPage />}
        />

       

      </Routes>



    </BrowserRouter>
  );
}