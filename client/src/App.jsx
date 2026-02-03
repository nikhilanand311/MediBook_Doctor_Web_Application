import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/Landing/LandingPage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Landing Page - Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes - Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:doctorId"
            element={
              // Keeping it public for now, but pre-filling if user exists. 
              // Alternatively, specificy <ProtectedRoute><BookingPage /></ProtectedRoute> if it must be protected.
              // User request implied they might not be logged in ("get the details from register page if they logined"), 
              // so public route with optional auth seems best.
              <BookingPage />
            }
          />

          {/* Fallback - Redirect to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router >
  );
}

export default App;
