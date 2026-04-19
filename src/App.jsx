import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import FeedbackPage from "./pages/FeedbackPage";
import Chatbot from "./components/Chatbot";
import About from "./pages/About";
import FeaturesPage from "./pages/Features";
import Team from "./pages/Team";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
    
  );
}
