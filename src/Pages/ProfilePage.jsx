import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./CSS/ProfilePage.css";

function ProfilePage({ setToken }) {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const navigate = useNavigate();

  // Load profile
  useEffect(() => {
    axiosClient
      .get("/profile/me")
      .then((res) => {
        setUser(res.data.user);
        setNewName(res.data.user.name);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  // Update Name
  const updateName = async () => {
    try {
      const res = await axiosClient.put("/profile/update-name", {
        name: newName
      });
      setUser(res.data.user);
      alert("Name updated!");
    } catch (err) {
      alert("Error updating name");
    }
  };

  // Change Password
  const changePassword = async () => {
    try {
      await axiosClient.put("/profile/change-password", passwordForm);
      alert("Password changed!");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Old password incorrect!");
    }
  };

  // Logout
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2 className="title">My Profile</h2>

      <div className="profile-card">
        <div className="form-group">
          <label>Email</label>
          <input value={user.email} readOnly className="readonly-input" />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button className="btn primary" onClick={updateName}>
            Update Name
          </button>
        </div>

        <button className="btn logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h3 className="section-title">Change Password</h3>

      <div className="profile-card">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />
        </div>

        <button className="btn danger" onClick={changePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
