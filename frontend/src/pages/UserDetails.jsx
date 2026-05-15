import { Suspense, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header/Header";
import "@/styles/UserDetails.css";
import axios from "axios";

function UserDetailsContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "Student";
  const institute = searchParams.get("institute") || "";
  const idLabel = role === "Teacher" ? "Teacher ID" : "Student ID";

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (userId.trim().length < 3) {
      setErrorMessage(`${idLabel} must be at least 3 characters.`);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/detail/register", {
        rollNumber: userId.trim(),
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        instituteName: institute,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully! You can log in now.");
        navigate("/login");
      } else {
        setErrorMessage(response.data?.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Network error, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-details">
      <Header />
      <main className="details-section">
        <h1>
          Sign up as {role}
          {institute ? ` — ${institute}` : ""}
        </h1>
        <p>Create your account:</p>
        <section className="details-card">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="user-id">{idLabel}:</label>
            <input
              id="user-id"
              className="input-field"
              type="text"
              placeholder={`Enter your ${idLabel.toLowerCase()}`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />

            <label htmlFor="name">Full name:</label>
            <input
              id="name"
              className="input-field"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className="input-field"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              className="input-field"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirm-password">Confirm password:</label>
            <input
              id="confirm-password"
              className="input-field"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="next-button" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function UserDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="user-details">
          <Header />
          <main className="details-section">
            <p>Loading…</p>
          </main>
        </div>
      }
    >
      <UserDetailsContent />
    </Suspense>
  );
}

export default UserDetailsPage;
