import React from "react";
import { auth } from "../firebase";

export default function Header({ user }) {
  const handleLogout = () => {
    auth.signOut();
    window.location.reload(); // goes back to login
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <h1 className="text-2xl font-bold">CityGuard</h1>
      <div className="flex items-center space-x-4">
        <span>{user.displayName}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition transform shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
