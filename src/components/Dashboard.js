import React, { Component } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import '../styles/DashboardStyles.css';
import { useState, setState } from 'react';
import ReactMapGL from 'react-map-gl';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
      viewport: {
        width: 1000,
        height: 800,
        latitude: 9.036000,
        longitude: 38.752300,
        zoom: 10,
      },
    };

    // updateViewport = (position) => {
    //   const newViewport = {
    //     width: 1000,
    //     height: 800,
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     zoom: 15,
    //   }
    //   this.setState({viewport: newViewport})
    // }
   // this.updateViewport = this.updateViewport.bind(this);
  };

  // updateViewport = (position) => {
    
  //   this.setState((state, props) => {
  //     viewport:newViewport
  //   });
  // }

  success(pos) {
    console.log("success function");
    console.log(pos);
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    this.setState({viewport: {
      width: 1000,
          height: 800,
          latitude: crd.latitude,
          longitude: crd.longitude,
          zoom: 15,
    }}); 
  }

  errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.permissions.query({ name: "geolocation" })
  //     .then(function (result) {
  //       if(result.state === "granted") {
  //         navigator.geolocation.watchPosition(this.success());
  //       }else if (result.state === "prompt"){
  //         navigator.geolocation.getCurrentPosition(this.success(), this.errors(), options);
  //       }else if (result.state === 'denied'){
  //         alert("Sorry, Can not get your current Location");
  //       }
  //       // result.onchange = function () {
  //       //   console.log(result.state);
  //       // };
  //     })
  //   }else {
  //     alert("Sorry, Can not get your current Location");
  //   }
  // };

  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const newViewport = {
          width: 1000,
          height: 800,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 15,
        }
        console.log(newViewport);
        // this.updateViewport(newVi);
      
        this.setState({ viewport: newViewport })
      });
    }
  }

 
  // // // const  mapStyle= "style: 'mapbox://styles/mapbox/streets-v11'";

  // const [viewport, setViewport] = useState({
  //     width: 1000,
  //     height: 800,
  //     latitude: 9.036000,
  //     longitude: 38.752300,
  //     zoom: 10,
  //   });



  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.permissions
  //       .query({ name: "geolocation" })
  //       .then(function (result) {
  //         if (result.state === "granted") {
  //           console.log(result.state);
  //           //If granted then you can directly call your function here
  //           navigator.geolocation.watchPosition(function(position) {
  //             getCurrentPosition(success);
  //           });
  //         } else if (result.state === "prompt") {
  //           navigator.geolocation.getCurrentPosition(success, errors, options);
  //         } else if (result.state === "denied") {
  //           //If denied then you have to show instructions to enable location
  //         }
  //         result.onchange = function () {
  //           console.log(result.state);
  //         };
  //       });
  //   } else {
  //     alert("Sorry, GeoLocation Not Available");
  //   }
  // }

  // const [mapStyle, setMapStyle] = useState('');

  render() {
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
                {/* <Button onClick={getLocation} className="w-100">Get location</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9} className="map">
            <ReactMapGL
              {...this.state.viewport}
              onViewportChange={nextViewport => this.setState({ viewport: nextViewport })}
              mapboxApiAccessToken={this.state.MAPBOX_TOKEN}
            >
            </ReactMapGL>
          </Col>
        </Row>
      </Container>
      // mapStyle={mapStyle}
    )

  }

}
