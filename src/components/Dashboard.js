import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import '../styles/DashboardStyles.css';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';


export default function Dashboard() {

  const MAPBOX_TOKEN = "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw";
  // const  mapStyle= "style: 'mapbox://styles/mapbox/streets-v11'";

  const [viewport, setViewport] = useState({
    width: 1000,
    height: 800,
    latitude: 9.036000,
    longitude: 38.752300,
    zoom: 10,
  });

  // const [mapStyle, setMapStyle] = useState('');

  return (
    <Container fluid className="w-100">
      <Row>
        <Col sm={3} className="profile">
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Button variant="primary">Update Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={9} className="map">
          <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={MAPBOX_TOKEN}
           
           >
          </ReactMapGL>
        </Col>
      </Row>
    </Container>

// mapStyle={mapStyle}



  )
}
