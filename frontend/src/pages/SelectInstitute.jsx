import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import "../styles/SelectInstitute.css";
function normalizeInstituteRows(data) {
  const list = data?.institutes ?? data;
  if (!Array.isArray(list)) return [];
  if (list.length && typeof list[0] === "string") {
    return list.map((name) => ({ instituteName: name }));
  }
  return list;
}

function SelectInstituteContent() {
  const [institutes, setInstitutes] = useState([]);
  const [institute, setInstitute] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "Student";
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("/api/admin/institutes");
        if (!response.ok) {
          throw new Error("Failed to fetch institutes");
        }
        const data = await response.json();
        setInstitutes(normalizeInstituteRows(data));
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
    fetchInstitutes();
  }, []);
  const handleNext = () => {
    if (institute) {
      navigate(`/user-details?role=${encodeURIComponent(role)}&institute=${encodeURIComponent(institute)}`);
    } else {
      alert("Please select an institute before proceeding.");
    }
  };
  return <div className="select-institute">
      <Header />
      <main className="institute-selection">
        <h1>Welcome, {role}!</h1> {
    /* Dynamic role display */
  }
        <p>Select your institute from the list below:</p>
        <div className="institute-card">
          <label htmlFor="institute-select">Select your institute:</label>
          <select
    id="institute-select"
    className="dropdown"
    value={institute}
    onChange={(e) => setInstitute(e.target.value)}
  >
            <option value="">Select your institute</option>
            {institutes.map((institute2, index) => <option key={index} value={institute2.instituteName}>
                {institute2.instituteName}
              </option>)}
          </select>
          <button className="next-button1" onClick={handleNext}>
            Next
          </button>
        </div>
      </main>
    </div>;
}
function SelectInstitutePage() {
  return <Suspense
    fallback={<div className="select-institute">
          <Header />
          <main className="institute-selection">
            <p>Loading…</p>
          </main>
        </div>}
  >
      <SelectInstituteContent />
    </Suspense>;
}
export {
  SelectInstitutePage as default
};
