import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import NewReportPage from "./components/NewReportPage";
import MyReportsPage from "./components/MyReportsPage";
import ReportDetailsPage from "./components/ReportDetailsPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white font-bold text-2xl">
        Loading...
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
        />
        <Route path="/" element={<ProtectedRoute><HomePage user={user} /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><NewReportPage user={user} /></ProtectedRoute>} />
        <Route path="/myreports" element={<ProtectedRoute><MyReportsPage user={user} /></ProtectedRoute>} />
        <Route path="/report/:id" element={<ProtectedRoute><ReportDetailsPage user={user} /></ProtectedRoute>} />

        {/* Optional: Keep wildcard to home, but can comment during testing */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
