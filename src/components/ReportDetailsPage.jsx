// src/components/ReportDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoicHJhdGhlZWswMyIsImEiOiJjbWZwODB4ZXAwN2RhMmtxMTdhMDRpYjU1In0.GRB87X1Rvhe1eJL7j7818w";

export default function ReportDetailsPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const docRef = doc(db, "issues", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setReport({ id: docSnap.id, ...docSnap.data() });
    };
    fetchReport();
  }, [id]);
useEffect(() => {
  if (!map) {
    const initMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.4867, 17.3850], // Default: Hyderabad
      zoom: 12,
    });
    setMap(initMap);
  }
}, [map]);


  if (!report) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Report Details</h2>
      <p><strong>Category:</strong> {report.category}</p>
      <p><strong>Description:</strong> {report.description}</p>
      <p><strong>Status:</strong> {report.status}</p>
      <p><strong>Date:</strong> {report.submitted_on?.toDate().toLocaleString() || "N/A"}</p>
      <div id="report-map" style={{ width: "100%", height: "400px", marginTop: 20 }}></div>
      {report.photo_url && <img src={report.photo_url} alt="Report" style={{ marginTop: 10, maxWidth: "100%" }} />}
    </div>
  );
}
