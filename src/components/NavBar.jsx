import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/student-registration">Student Registration</Link>
      <Link to="/students">Students</Link>
      <Link to="/allocation">Allocation</Link>
      <Link to="/course-registration">Course Registration</Link>
    </nav>
  );
}