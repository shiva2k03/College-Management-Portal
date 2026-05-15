import Header from "@/components/Header/Header";
import "@/styles/homepage.css";

export default function About() {
  return (
    <div className="homepage">
      <Header />
      <main className="hero-section">
        <h1 className="title">About Edventures</h1>
        <p className="description">
          Edventures connects students, teachers, and administrators in one place —
          courses, attendance, announcements, and progress tracking built for modern schools.
        </p>
      </main>
    </div>
  );
}
