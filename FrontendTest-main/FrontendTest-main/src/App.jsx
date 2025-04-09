import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Signup from "./components/SignUp";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import SensorData from "./components/SensorData.jsx";
import FindMyDevice from "./components/FindMyDevice.jsx";
import UserProfile from "./components/UserProfile.jsx";
import AlertHistory from "./components/AlertHistory.jsx";

function App() {
  return (
    <Routes>
      {/* Show Splash Screen initially */}
      <Route path="/" element={<SplashScreen />} />

      {/* Signup Page - Always accessible */}
      <Route path="/signup" element={<Signup />} />

      {/* Profile Page - Navigate to it directly after signup */}
      <Route path="/profile" element={<Profile />} />

      {/* Other routes */}
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reminder" element={<Reminder />} />
      <Route path="/sensor-data" element={<SensorData />} />
      <Route path="/find-my-device" element={<FindMyDevice />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/alert-history" element={<AlertHistory />} />

      {/* Redirect to Dashboard if no match */}
    </Routes>
  );
}

export default App;
