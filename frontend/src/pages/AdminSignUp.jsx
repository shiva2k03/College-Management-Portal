import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/AdminSignUp.css";
import Header from "@/components/Header/Header";
const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    adminID: "",
    // Initialize new field
    instituteName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleNext = () => {
    console.log("Navigating to /admin");
    navigate("/admin");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminID: formData.adminID,
          // Send new field
          instituteName: formData.instituteName,
          adminName: formData.adminName,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      console.log("Response data:", data);
      if (data.message === "Admin registered successfully") {
        console.log("Admin account created successfully.");
        alert("Admin account created successfully!");
        setTimeout(handleNext, 1e3);
      } else if (data.error && data.error.includes("Duplicate entry")) {
        setError("The institute name is already in use. Please use a different institute name.");
      } else {
        console.log(`Error: ${data.message}`);
        alert(`Error: ${data.message}`);
      }
    } catch (error2) {
      console.error("Error registering admin:", error2);
      alert("An error occurred. Please try again.");
    }
  };
  return <div className="admin-sign-up">
      <Header />
      <main className="details-section">
        <h1>Create Your Admin Account</h1>
        <p>Let’s finish setting up your account:</p>
        <div className="details-card">
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            <label htmlFor="adminID">Admin ID:</label>
            <input
    id="adminID"
    className="input-field"
    type="text"
    name="adminID"
    placeholder="Enter admin ID"
    value={formData.adminID}
    onChange={handleInputChange}
    required
  />

            <label htmlFor="instituteName">Institute Name:</label>
            <input
    id="instituteName"
    className="input-field"
    type="text"
    name="instituteName"
    placeholder="Enter institute name"
    value={formData.instituteName}
    onChange={handleInputChange}
    required
  />

            <label htmlFor="adminName">Admin Name:</label>
            <input
    id="adminName"
    className="input-field"
    type="text"
    name="adminName"
    placeholder="Enter your name"
    value={formData.adminName}
    onChange={handleInputChange}
    required
  />

            <label htmlFor="email">Email Address:</label>
            <input
    id="email"
    className="input-field"
    type="email"
    name="email"
    placeholder="Enter email address"
    value={formData.email}
    onChange={handleInputChange}
    required
  />

            <label htmlFor="password">Password:</label>
            <input
    id="password"
    className="input-field"
    type="password"
    name="password"
    placeholder="Enter password"
    value={formData.password}
    onChange={handleInputChange}
    required
  />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
    id="confirmPassword"
    className="input-field"
    type="password"
    name="confirmPassword"
    placeholder="Confirm password"
    value={formData.confirmPassword}
    onChange={handleInputChange}
    required
  />

            <button className="next-button" type="submit">Sign Up</button>
          </form>
        </div>
      </main>
    </div>;
};
export default AdminSignUp;
