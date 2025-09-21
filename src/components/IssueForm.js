import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/issues";

export default function IssueForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photoUrl: "",
    latitude: "",
    longitude: "",
  });

  const [issues, setIssues] = useState([]);

  // fetch existing issues on mount
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setIssues(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // convert lat/long to numbers
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setFormData({
        title: "",
        description: "",
        photoUrl: "",
        latitude: "",
        longitude: "",
      });
      fetchIssues();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="photoUrl"
          placeholder="Photo URL"
          value={formData.photoUrl}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6">All Issues</h3>
      <ul className="mt-2 space-y-2">
        {issues.map((issue) => (
          <li
            key={issue.id}
            className="border rounded p-3 flex items-start space-x-3"
          >
            {issue.photoUrl && (
              <img
                src={issue.photoUrl}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h4 className="font-bold">{issue.title}</h4>
              <p>{issue.description}</p>
              <small>
                Lat: {issue.latitude}, Lng: {issue.longitude}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
