const SESSION_KEY = "edventures_session";

export function saveSession({ role, instituteName, rollNumber, name, email }) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ role, instituteName, rollNumber, name, email })
  );
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function logout(navigate) {
  clearSession();
  navigate("/login", { replace: true });
}
