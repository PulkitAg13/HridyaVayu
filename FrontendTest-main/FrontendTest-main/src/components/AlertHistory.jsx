import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlertHistory = () => {
  const userId = localStorage.getItem("user_id");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/get-alerts/${userId}`);
        setAlerts(res.data.alerts || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold text-center mb-4">Alert History</h2>
      {alerts.length === 0 ? (
        <div className="text-center text-gray-500">No alerts found.</div>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-[70vh]">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow"
            >
              <p className="font-medium">{alert.message}</p>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertHistory;
