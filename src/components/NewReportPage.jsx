import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "./NewReportPage.css";

mapboxgl.accessToken = "pk.eyJ1IjoicHJhdGhlZWswMyIsImEiOiJjbWZwODB4ZXAwN2RhMmtxMTdhMDRpYjU1In0.GRB87X1Rvhe1eJL7j7818w";

export default function NewReportPage({ user }) {
  const navigate = useNavigate();

  // Form states
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pothole");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [location, setLocation] = useState(null);

  // Map refs
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initialize Mapbox
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.4867, 17.385],
      zoom: 13,
    });

    map.current.on("load", () => {
      map.current.addSource("dot", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.current.addLayer({
        id: "dot-layer",
        type: "circle",
        source: "dot",
        paint: {
          "circle-radius": 6,
          "circle-color": "blue",
          "circle-stroke-color": "white",
          "circle-stroke-width": 0.5,
        },
      });
    });

    map.current.on("click", (e) => {
      const lngLat = e.lngLat;
      setLocation({ latitude: lngLat.lat, longitude: lngLat.lng });

      const source = map.current.getSource("dot");
      source.setData({
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "Point", coordinates: [lngLat.lng, lngLat.lat] } },
        ],
      });
    });
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (!description || !category || !location || !imageUrl) {
      alert("Please fill all fields, including image URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          category,
          photoUrl: imageUrl.trim(),
          latitude: location.latitude,
          longitude: location.longitude,
          status: "Submitted",
          submittedBy: user?.uid || "anonymous",
          submittedOn: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setDescription("");
      setCategory("Pothole");
      setImageUrl("");
      setSuccessMsg("Report submitted successfully! ✅");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Error submitting report: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-report-page">
      {/* ===== Header ===== */}
      <header className="page-header">
        <h1
          className="homepage-logo clickable-logo"
          onClick={() => navigate("/")}
        >
          CivicFix
        </h1>
        {user && <p className="homepage-user">Hello, {user.displayName || user.email}</p>}
      </header>



      {/* ===== Page Title ===== */}
      <h1 className="report-title">Submit New Report</h1>

      {/* ===== Form Card ===== */}
      <div className="report-form-card">
        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Pothole</option>
            <option>Broken Streetlight</option>
            <option>Overflowing Bin</option>
            <option>Garbage</option>
            <option>Water Leakage</option>
            <option>Other</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Paste image URL here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl && <img src={imageUrl} alt="Preview" className="report-preview-image" />}
        </div>

        {/* Map Picker */}
        <div className="form-group">
          <label>Select Location</label>
          <div ref={mapContainer} className="map-container"></div>
          {location && (
            <p className="location-text">
              Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
            </p>
          )}
          <small>Click on the map to place a dot and select location</small>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="report-submit-button"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
          {successMsg && <p className="success-text">{successMsg}</p>}
        </div>
      </div>
    </div>
  );
}
