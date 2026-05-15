import Header from "@/components/Header/Header";
import "@/styles/homepage.css";

export default function Contact() {
  return (
    <div className="homepage">
      <Header />
      <main className="hero-section">
        <h1 className="title">Contact Us</h1>
        <p className="description">
          Questions or feedback? Reach your institute admin through Edventures, or email
          support at support@edventures.example.
        </p>
      </main>
    </div>
  );
}
