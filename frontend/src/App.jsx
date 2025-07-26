import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import Auth from "./components/Auth";
import LandingPage from "./components/LandingPage";
import HabitTracker from "./components/HabitTracker";
import HighlightLogger from "./components/HighlightLogger";
import ProtectedRoute from "./components/ProtectedRoute";

function MainApp() {
  const [showMain, setShowMain] = useState(false);
  const { user } = useContext(AuthContext);

  if (!showMain) {
    return <LandingPage onEnter={() => setShowMain(true)} />;
  }

  return (
    <div className="App">
      <h1>Chrono Productivity App</h1>
      <Auth />
      <ProtectedRoute>
        <HabitTracker />
        <HighlightLogger />
      </ProtectedRoute>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

