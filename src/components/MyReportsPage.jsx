import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./MyReportsPage.css";

mapboxgl.accessToken = "pk.eyJ1IjoicHJhdGhlZWswMyIsImEiOiJjbWZwODB4ZXAwN2RhMmtxMTdhMDRpYjU1In0";

export default function RecentReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRefs = useRef({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/issues");
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.submittedOn) - new Date(a.submittedOn)
        );
        setReports(sorted.slice(0, 20));
      } catch (err) {
        console.error(err);
        alert("Error fetching reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    reports.forEach((report) => {
      const mapContainer = mapRefs.current[report.id];
      if (!mapContainer || mapContainer._map) return;

      const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [report.longitude, report.latitude],
        zoom: 14,
        interactive: false,
      });

      map.on("load", () => {
        map.addSource(`dot-${report.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [report.longitude, report.latitude] },
              },
            ],
          },
        });

        map.addLayer({
          id: `dot-layer-${report.id}`,
          type: "circle",
          source: `dot-${report.id}`,
          paint: {
            "circle-radius": 6,
            "circle-color": "#0288d1", // Civic blue dot
            "circle-stroke-color": "#fff",
            "circle-stroke-width": 2,
          },
        });
      });

      mapContainer._map = map;
    });
  }, [reports]);

  if (loading) return <div className="loading">Loading reports...</div>;
  if (reports.length === 0) return <div className="loading">No reports found</div>;

  return (
    <div className="recent-reports-page">
      <h1 className="page-title">Recent Reports</h1>
      <div className="reports-container">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            {report.photoUrl && (
              <img src={report.photoUrl} alt="Report" className="report-photo" />
            )}
            <h2 className="report-category">{report.category}</h2>
            <p className="report-description">{report.description}</p>
            <p className="submitted">
              Submitted:{" "}
              {report.submittedOn
                ? new Date(report.submittedOn).toLocaleDateString()
                : "Unknown"}
            </p>
            <span
              className={`status ${
                report.status === "Submitted"
                  ? "submitted"
                  : report.status === "In Progress"
                  ? "in-progress"
                  : "resolved"
              }`}
            >
              {report.status}
            </span>

            <div
              className="report-map"
              ref={(el) => (mapRefs.current[report.id] = el)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
