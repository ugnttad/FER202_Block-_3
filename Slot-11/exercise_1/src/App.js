import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import StudentsPage from "./components/Students/StudentsPage";

export default function App() {
  const handleProfileSubmit = (data) => {
    console.log("Profile submitted:", data);
  };

  return (
    <div>
      <section className="hero">
        <Container>
          <h1 className="display-5 mb-2">Management System</h1>
          <p className="text-muted mb-0">Profile form & Student management</p>
        </Container>
      </section>

      <Container className="my-4">
        <Card className="shadow-soft mb-4">
          <Card.Body>
            <h2 className="h4 mb-3">Exercise 1 – ProfileForm</h2>
            <ProfileForm onSubmit={handleProfileSubmit} />
          </Card.Body>
        </Card>

        <Card className="shadow-soft">
          <StudentsPage />
        </Card>
      </Container>
    </div>
  );
}
