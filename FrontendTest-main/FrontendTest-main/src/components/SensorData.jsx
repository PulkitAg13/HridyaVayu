import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SensorData = () => {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState({
    no2: 0,
    so2: 0,
    co2: 0,
    aqi: 0,
    temperature: 0,
    humidity: 0,
    trends: { aqi: [] },
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  // ✅ 1. Declare the fetch function
  const fetchSensorData = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get(`http://localhost:5000/get-sensor-data/${userId}`);
      setSensorData(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const userId = localStorage.getItem("user_id");// Replace with dynamic ID if available from context or props
        const response = await axios.get(`http://localhost:5000/get-sensor-data/${userId}`);
        const data = response.data;
  
        setSensorData({
          no2: data.no2_level,
          so2: data.so2_level,
          co2: data.co2_level,
          aqi: data.air_quality,
          temperature: data.temperature,
          humidity: data.humidity,
          trends: { aqi: [data.air_quality, data.air_quality, data.air_quality, data.air_quality, data.air_quality, data.air_quality] }, // Example static trend
        });
      } catch (error) {
        console.error("Failed to fetch sensor data", error);
      }
    };
  
    fetchSensorData();
  }, []);
   

  const [activeCard, setActiveCard] = useState(null);

  // Function to determine AQI color
  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "bg-green-500 text-white";
    if (aqi <= 100) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  // Function to render trend graph
  const renderTrend = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="flex items-end h-6 space-x-1 mt-2">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-2 rounded-t transition-all duration-300 ${
                index === data.length - 1
                  ? "bg-white opacity-90"
                  : "bg-white opacity-50"
              }`}
              style={{ height: `${Math.max(15, height)}%` }}
            />
          );
        })}
      </div>
    );
  };

  const handleCardTap = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-3 text-gray-800">
        Air Quality Readings
      </h1>

      {/* Main AQI Card - Full width */}
      <div
        className={`rounded-xl shadow-md p-4 mb-4 ${getAqiColor(
          sensorData.aqi
        )} transition-all duration-300 transform ${
          activeCard === "aqi" ? "scale-102" : ""
        }`}
        onClick={() => handleCardTap("aqi")}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <p className="text-sm font-medium">Air Quality Index</p>
            </div>
            <h2 className="text-3xl font-bold mt-1">{sensorData.aqi}</h2>
            <p className="text-sm mt-1">
              {sensorData.aqi <= 50
                ? "Good"
                : sensorData.aqi <= 100
                ? "Moderate"
                : "Unhealthy"}
            </p>
          </div>
          <div className="w-20">
  {renderTrend(sensorData?.trends?.aqi)}
</div>
        </div>
      </div>

      {/* Grid of smaller metric cards - 2 columns on mobile */}
      <div className="grid grid-cols-2 gap-3">
        {/* NO₂ Card */}
        <div
          className={`bg-white rounded-xl shadow-md p-3 transition-all duration-300 transform ${
            activeCard === "no2" ? "scale-102 bg-blue-50" : ""
          }`}
          onClick={() => handleCardTap("no2")}
        >
          <div className="flex items-center mb-1">
            <svg
              className="w-4 h-4 mr-1 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <p className="text-xs font-medium text-gray-500">NO₂</p>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{sensorData.no2}</h2>
          <p className="text-xs text-gray-500">ppb</p>
        </div>

        {/* SO₂ Card */}
        <div
          className={`bg-white rounded-xl shadow-md p-3 transition-all duration-300 transform ${
            activeCard === "so2" ? "scale-102 bg-yellow-50" : ""
          }`}
          onClick={() => handleCardTap("so2")}
        >
          <div className="flex items-center mb-1">
            <svg
              className="w-4 h-4 mr-1 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            <p className="text-xs font-medium text-gray-500">SO₂</p>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{sensorData.so2}</h2>
          <p className="text-xs text-gray-500">ppb</p>
        </div>

        {/* CO₂ Card */}
        <div
          className={`bg-white rounded-xl shadow-md p-3 transition-all duration-300 transform ${
            activeCard === "co2" ? "scale-102 bg-gray-50" : ""
          }`}
          onClick={() => handleCardTap("co2")}
        >
          <div className="flex items-center mb-1">
            <svg
              className="w-4 h-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
            <p className="text-xs font-medium text-gray-500">CO₂</p>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{sensorData.co2}</h2>
          <p className="text-xs text-gray-500">ppm</p>
        </div>

        {/* Temperature Card */}
        <div
          className={`bg-white rounded-xl shadow-md p-3 transition-all duration-300 transform ${
            activeCard === "temp" ? "scale-102 bg-red-50" : ""
          }`}
          onClick={() => handleCardTap("temp")}
        >
          <div className="flex items-center mb-1">
            <svg
              className="w-4 h-4 mr-1 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="text-xs font-medium text-gray-500">Temp</p>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {sensorData.temperature}
          </h2>
          <p className="text-xs text-gray-500">°C</p>
        </div>

        {/* Humidity Card - Spans full width in mobile view */}
        <div
          className={`bg-white rounded-xl shadow-md p-3 col-span-2 transition-all duration-300 transform ${
            activeCard === "humidity" ? "scale-102 bg-blue-50" : ""
          }`}
          onClick={() => handleCardTap("humidity")}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 mr-1 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  ></path>
                </svg>
                <p className="text-xs font-medium text-gray-500">Humidity</p>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {sensorData.humidity}%
              </h2>
            </div>
            <div className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
              Normal Range
            </div>
          </div>
        </div>
      </div>

      {/* Last updated info */}
      <div className="mt-4 text-center">
      <p className="text-xs text-gray-500">
  Last updated: {lastUpdated ? lastUpdated : "Just now"}
</p>
        
      </div>
    </div>
  );
};



export default SensorData;
