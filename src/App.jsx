import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import FeedbackPage from "./pages/FeedbackPage";
import About from "./pages/About";
import FeaturesPage from "./pages/Features";
import Team from "./pages/Team";
import Error404 from "./pages/Error404";
import Chatbot from "./components/Chatbot";
import AdminDashboard from "./admin/adminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function AppContent() {
  const location = useLocation();

  const hideChatbotRoutes = ["/login", "/signup"];

  const validRoutes = ["/", "/login", "/signup", "/feedback", "/about", "/feature", "/team", "/dashboard",];

  const is404 = !validRoutes.includes(location.pathname);

  const shouldHideChatbot = hideChatbotRoutes.includes(location.pathname) || is404;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/feature" element={<FeaturesPage />} />
        <Route path="/team" element={<Team />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>

      {!shouldHideChatbot && <Chatbot />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}