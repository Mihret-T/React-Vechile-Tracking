import React from 'react';
import { Card, Container, Row, Button} from 'react-bootstrap'
import { Link } from "react-router-dom"
import '../styles/LandingStyles.css';
import logo from '../assets/logo1.png'

export default function Landing() {
  return (
        <Container className="d-flex align-items-center justify-content-center">
          <Row className="justify-content-md-center">
            <div>
              <Card style={{ width: '40rem', }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body className="intro-text">
                  <Card.Title><h2>Welcome to Vechile Tracking App</h2></Card.Title>
                  <Card.Text className="subtitle">
                    One Safe place to track all your drivers.
                  </Card.Text>
                  <div className="buttonContainer">
                    <Link to="/login">
                      <Button size="lg">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        variant="outline-primary"
                        size="lg"
                        style={{float: 'right'}}>
                        Signup
                      </Button>
                    </Link>
                  </div>

                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
  );
}