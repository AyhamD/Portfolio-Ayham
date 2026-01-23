import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home";
import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./context.tsx/authContext";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminAbout } from "./pages/AdminAbout";
import AdminSkills from "./pages/AdminSkills";
import AdminExperience from "./pages/AdminExperience";
import AdminProjects from "./pages/AdminProjects";
import AdminEducation from "./pages/AdminEducation";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/skills" element={<AdminSkills />} />
          <Route path="/admin/experience" element={<AdminExperience />} />
          <Route path="/admin/education" element={<AdminEducation />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/Portfolio" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/Portfolio" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
