import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FindMyDevice = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFindDevice = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      (err) => {
        alert("Error retrieving location: " + err.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Find My Device</h1>

      <button
        onClick={handleFindDevice}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg mb-4 shadow-md hover:bg-blue-700 transition w-full max-w-xs"
      >
        {loading ? "Locating..." : "Find My Device"}
      </button>

      <div className="w-full max-w-sm h-80 rounded-xl overflow-hidden shadow-lg">
        {position ? (
          <MapContainer
            center={position}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
            Click "Find My Device" to get location.
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMyDevice;
