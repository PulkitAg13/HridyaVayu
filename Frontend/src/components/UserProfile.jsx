import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const userId = localStorage.getItem("user_id");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        if (!userId) {
          setLoading(false);
          return;
        }
  
        try {
          const res = await axios.get(`http://localhost:5000/get-user/${userId}`);
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [userId]);
  
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!user) return <div className="text-center mt-10 text-red-500">User not found.</div>;

  return (
    <div className="max-w-md mx-auto p-4 mt-6 bg-white shadow-lg rounded-2xl text-gray-800">
      <h2 className="text-xl font-semibold text-center mb-4">User Profile</h2>
      <div className="space-y-3">
        <ProfileItem label="Name" value={user.name} />
        <ProfileItem label="Age" value={user.age} />
        <ProfileItem label="Gender" value={user.gender} />
        <ProfileItem label="Phone Number" value={user.phone_no} />
        <ProfileItem label="Medical History" value={user.medical_history || "None"} />
        <ProfileItem label="Emergency Contact Name" value={user.emergency_contact_name} />
        <ProfileItem label="Emergency Contact Phone" value={user.emergency_contact_phone} />
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-sm font-medium text-gray-600">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
);

export default UserProfile;
