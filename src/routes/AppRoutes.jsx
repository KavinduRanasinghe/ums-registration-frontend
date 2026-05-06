import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import StudentRegistrationPage from "../pages/StudentRegistrationPage";
import StudentsPage from "../pages/StudentsPage";
import Navbar from "../components/NavBar";
import AllocationPage from "../pages/AllocationPage";
import CourseRegistrationPage from "../pages/CourseRegistrationPage";

export default function AppRoutes() {

  return (
    <BrowserRouter>

    <Navbar />

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

      </Routes>

    </BrowserRouter>
  );
}