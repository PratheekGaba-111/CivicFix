import React from "react";
import { signInWithGoogle, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/home");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Logout failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="city-skyline"></div>
      {!user ? (
        <div className="card login-card">
          <h1 className="logo">CivicFix</h1>
          <p className="subtitle">Report civic issues in your city!</p>
          <button className="google-btn" onClick={handleLogin}>
            Sign in with Google
          </button>
          <div className="blobs">
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
            <div className="blob blob3"></div>
          </div>
        </div>
      ) : (
        <div className="card welcome-card">
          <h2>Welcome, {user.displayName}</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
