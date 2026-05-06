import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import StudentRegistrationPage from "../pages/StudentRegistrationPage";
import StudentsPage from "../pages/StudentsPage";
import AllocationPage from "../pages/AllocationPage";
import CourseRegistrationPage from "../pages/CourseRegistrationPage";
import AdminApprovalPage from "../pages/AdminApprovalPage";
import ModuleManagementPage from "../pages/ModuleManagementPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/student-registration"
            element={<StudentRegistrationPage />}
          />

          <Route
            path="/students"
            element={<StudentsPage />}
          />

          <Route
            path="/allocation"
            element={<AllocationPage />}
          />

          <Route
            path="/course-registration"
            element={<CourseRegistrationPage />}
          />

          <Route
            path="/admin-approval"
            element={<AdminApprovalPage />}
          />

          <Route
            path="/modules-management"
            element={<ModuleManagementPage />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}