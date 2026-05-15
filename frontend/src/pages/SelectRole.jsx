import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import "../styles/SelectRole.css";
const SelectRole = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleNext = () => {
    if (role) {
      if (role === "Admin") {
        navigate("/admin-signup");
      } else {
        navigate(`/select-institute?role=${encodeURIComponent(role)}`);
      }
    } else {
      alert("Please select a role to continue.");
    }
  };
  return <div className="select-role">
      <Header />
      <main className="role-selection">
        <h1>Let’s start your Edventure by selecting your role!</h1>
        <div className="roles-container">
          <div className={`role-card ${role === "Student" ? "selected" : ""}`} onClick={() => setRole("Student")}>
            <img src="/student1.png" alt="student" className="img" />
            <h2>I’m a Student</h2>
            <p>Access courses, track progress, and earn rewards.</p>
          </div>
          <div className={`role-card ${role === "Teacher" ? "selected" : ""}`} onClick={() => setRole("Teacher")}>
            <img src="/teacher1.png" alt="teacher" className="img" />
            <h2>I’m a Teacher</h2>
            <p>Create courses, manage students, and track performance.</p>
          </div>
          <div className={`role-card ${role === "Admin" ? "selected" : ""}`} onClick={() => setRole("Admin")}>
            <img src="/administrator.png" alt="admin" className="img" />
            <h2>I’m an Admin</h2>
            <p>Manage users, oversee courses, and access analytics.</p>
          </div>
        </div>
        <button className="next-button-select-role" onClick={handleNext}>
          Next
        </button>
      </main>
    </div>;
};
export default SelectRole;
