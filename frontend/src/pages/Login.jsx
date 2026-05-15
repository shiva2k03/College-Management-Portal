import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/LoginPage.css";
import Header from "@/components/Header/Header";
import { saveSession } from "@/lib/auth";
import { setUserRole } from "@/lib/data";
const LoginPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rollNumber, password, role })
      });
      const data = await response.json();
      if (data.success && data.role) {
        setUserRole(data.role);
        saveSession({
          role: data.role,
          instituteName: data.instituteName || "",
          rollNumber,
          name: data.name || "",
          email: data.email || "",
        });
        alert("Login Successful!");
        const redirectPath = `/${data.role.toLowerCase()}`;
        const institute = data.instituteName || "";
        navigate(
          institute
            ? `${redirectPath}?institute=${encodeURIComponent(institute)}`
            : redirectPath
        );
      } else {
        alert("Error: " + (data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return <div className="user-details">
      <Header />
      <main className="details-section">
        <h1>Welcome Back!</h1>
        <p>Log in to access your dashboard:</p>
        <div className="details-card">
          <form onSubmit={handleLogin}>
            <label htmlFor="role">Role:</label>
            <select
    id="role"
    className="input-field1"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
  >
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <label htmlFor="roll-number">
              {role === "Admin" ? "Admin ID" : role === "Teacher" ? "Teacher ID" : "Student ID"}:
            </label>
            <input
    id="roll-number"
    className="input-field"
    type="text"
    placeholder={role === "Admin" ? "Enter your admin ID" : role === "Teacher" ? "Enter your teacher ID" : "Enter your student ID"}
    value={rollNumber}
    onChange={(e) => setRollNumber(e.target.value)}
    required
  />
            <label htmlFor="password">Password:</label>
            <input
    id="password"
    className="input-field"
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
            <button className="next-button" type="submit">
              Log In
            </button>
          </form>
          <p className="signup-link">
            Don’t have an account?{" "}
            <Link to="/select-role" className="link">
              Sign Up</Link>
          </p>
        </div>
      </main>
    </div>;
};
export default LoginPage;
