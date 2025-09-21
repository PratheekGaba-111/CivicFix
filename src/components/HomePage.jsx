import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./HomePage.css";  // Make sure the path matches where the CSS file is

mapboxgl.accessToken = "pk.eyJ1IjoicHJhdGhlZWswMyIsImEiOiJjbWZwODB4ZXAwN2RhMmtxMTdhMDRpYjU1In0.GRB87X1Rvhe1eJL7j7818w";

export default function HomePage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const lat = 17.385;
  const lng = 78.4867;
  const zoom = 13;

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser(user.displayName || user.email); // use displayName if available
    }
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
      });

      // Add a static marker at Hyderabad (optional)
      map.current.resize();
    }
  }, []);

  const logOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div>
          <h1 className="homepage-logo">CivicFix</h1>
          {currentUser && <p className="homepage-user">Hello, {currentUser}</p>}
        </div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="header-logout-button"
        >
          Logout
        </button>
      </header>

      {/* Map container */}
      <div ref={mapContainer} className="map-container"></div>

      {/* Buttons */}
      <div className="homepage-buttons">
        <Link to="/new">
          <button className="fab-button new-report">+ New Report</button>
        </Link>
        <Link to="/myreports">
          <button className="fab-button recent-reports">Recent Reports</button>
        </Link>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="logout-modal-backdrop">
          <div className="logout-modal-container">
            <h2>Logout Confirmation</h2>
            <p>
              Are you sure you want to log out from CivicFix? All unsaved changes will be lost.
            </p>
            <div className="logout-modal-buttons">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="logout-modal-button-cancel"
              >
                Cancel
              </button>
              <button
                onClick={logOut}
                className="logout-modal-button-logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
