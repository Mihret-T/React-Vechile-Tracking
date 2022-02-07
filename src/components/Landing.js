import React from 'react';
import { Container, Row, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import '../styles/LandingStyles.css';

export default function Landing() {
  return (
    
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="style.title">Welcome to Vechile Tracking App</h1>
              <p className="style.subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton">
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
       
      </Container>
    </div>
  );
}
