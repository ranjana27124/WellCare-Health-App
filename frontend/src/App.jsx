import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PersonalInfo from "./pages/PersonalInfo";
import PhysicalAttributes from "./pages/PhysicalAttributes";
import Lifestyle from "./pages/Lifestyle";
import MentalEmotional from "./pages/MentalEmotional";
import ClimatePreferences from "./pages/ClimatePreferences";
import Certificate from "./pages/Certificate";
import Navbar from "./components/Navbar";
import Welcome from "./pages/welcome"; // Ensure the import is correct
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/TermsAndConditions";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar component */}
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} /> {/* Redirect root to Welcome */}
        <Route path="/welcome" element={<Welcome />} /> {/* Welcome page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/home" element={<Home />} /> {/* Home page */}
        <Route path="/personal-info" element={<PersonalInfo />} /> {/* Personal Info */}
        <Route path="/physical-attributes" element={<PhysicalAttributes />} /> {/* Physical Attributes */}
        <Route path="/lifestyle" element={<Lifestyle />} /> {/* Lifestyle */}
        <Route path="/mental-emotional" element={<MentalEmotional />} /> {/* Mental & Emotional */}
        <Route path="/climate-preferences" element={<ClimatePreferences />} /> {/* Climate Preferences */}
        <Route path="/certificate" element={<Certificate email="user@actualemail.com" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>

  );
}

export default App;