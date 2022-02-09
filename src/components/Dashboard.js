import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import '../styles/DashboardStyles.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import profilePic from '../profilePic1.png';
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, Link } from 'react-router-dom';
import pin from '../redPin.jpg';

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

export class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
      loading: false,
      error: '',
      userId: props.userId,
      user: {},
      viewport: {
        width: 1000,
        height: 800,
        latitude: 9.036000,
        longitude: 38.752300,
        zoom: 10,
      },
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const doc = await this.getUserData();
      this.setState({ user: doc.data() });
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          const newViewport = {
            width: 1000,
            height: 800,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
          }
          this.setState({ viewport: newViewport });
          const location = {
            userId: this.state.userId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          const result = this.setUserLocation(location);
          // if(result.data){
          //   await this.updateUserLocation(location);
          // }else{
          //   await this.setUserLocation(location)
          // }
          // const result = this.updateUserlocation(location);
          console.log(result);
        }, (error) => alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
      }
      console.log(this.state)
    } catch {
      this.setState({ error: 'Failed to retrive user datas' })
    }
    this.setState({ loading: false });
  }

  async getUserData() {
    return await getDoc(doc(db, "Users", this.state.userId));
  }

  async setUserLocation(data) {
    return await setDoc(doc(db, 'Location', this.state.userId), data);
  }

  // async updateUserLocation(data){
  //   const result = await getDoc(doc(db, "Location", this.state.userId));
  //   console.log(result);
  //   // return await setDoc(doc(db, "Location"), data)
  // }
  // async getUserPreviousLocation(){
  //   return await getDoc(doc(db, "Location", this.state.userId));
  // }

  // this.state = {
  //   MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
  //   latitude: 9.036000,
  //   longitude: 38.752300,
  // }
  //this.updatelocation = this.updatelocation.bind(this);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
  //     viewport: {
  //       width: 1000,
  //       height: 800,
  //       latitude: 9.036000,
  //       longitude: 38.752300,
  //       zoom: 10,
  //     },
  //   };

  //   this.updateViewport = this.updateViewport.bind(this);
  // }

  // updateViewport = (postion) => {
  //   const { viewport } = this.state.viewport;
  //   viewport.latitude = 9.005401;
  //   viewport.longitude = 38.763611;
  //   this.setState({ viewport });

  //   // this.setState(state => {
  //   //   let viewport = Object.assign({}, state.viewport);
  //   //   viewport.latitude = position.coords.latitude,
  //   //   viewpoert.longitude = position.coords.longitude,
  //   //   viewport.zoom =  15;
  //   // return { viewport};
  //   // })
  // }

  // constructor(props) {
  //   super(props);

  //   this.setViewport = this.setViewport.bind(this);
  //   }

  //   setViewport = () => {

  //     const newViewport = {
  //           width: 1000,
  //           height: 800,
  //           latitude: 9.005401,
  //           longitude: 38.763611,
  //           zoom: 15,
  //         }
  //     this.setState({viewport: newViewport})

  //   // updateViewport = (position) => {
  //   //   const newViewport = {
  //   //     width: 1000,
  //   //     height: 800,
  //   //     latitude: position.coords.latitude,
  //   //     longitude: position.coords.longitude,
  //   //     zoom: 15,
  //   //   }
  //   //   this.setState({viewport: newViewport})
  //   // }
  //  // this.updateViewport = this.updateViewport.bind(this);
  // };

  // state = {
  //   MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
  //   viewport: {
  //     width: 1000,
  //     height: 800,
  //     latitude: 9.036000,
  //     longitude: 38.752300,
  //     zoom: 10,
  //   },
  // };

  // updateViewport = (position) => {

  //   this.setState((state, props) => {
  //     viewport:newViewport
  //   });
  // }

  // success(pos) {
  //   console.log("success function");
  //   console.log(pos);
  //   var crd = pos.coords;
  //   console.log("Your current position is:");
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  //   this.setState({viewport: {
  //     width: 1000,
  //         height: 800,
  //         latitude: crd.latitude,
  //         longitude: crd.longitude,
  //         zoom: 15,
  //   }}); 
  // }

  // errors(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

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

  // console.log(this.state.latitude);
  // console.log(this.state.longitude)
  // const currentLatitude = position.coords.latitude;
  // this.setState({ latitude: currentLatitude });
  // const currentLongitude = position.coords.longitude;
  // this.setState({ longitude: currentLongitude });

  // componentDidMount() {
  //   try {

  //     if (navigator.geolocation) {
  //       navigator.geolocation.watchPosition((position) => {
  //         console.log("Latitude is :", position.coords.latitude);
  //         console.log("Longitude is :", position.coords.longitude);

  //         const newViewport = {
  //           width: 1000,
  //           height: 800,
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //           zoom: 15,
  //         }

  //         this.setState({ viewport: newViewport });
  //         const result = this.updatePosition();
  //         console.log(result);
  //       }, (error) => alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  // this.setState(prevState => {
  //   let viewport = Object.assign({}, prevState.viewport);
  //   viewport.latitude = position.coords.latitude;
  //     viewport.longitude = position.coords.longitude;
  //     viewport.zoom = 15;
  //   return { viewport };
  // });

  // const { viewport } = this.state.viewport;
  // viewport.latitude = position.coords.latitude;
  // viewport.longitude = position.coords.longitude;
  // this.setState({ viewport });

  //this.updateViewport(position);

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
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Img variant="top" src={profilePic} />
              <Card.Body>
                <Card.Title>{this.state.user.name}</Card.Title>
                <Card.Text>
                  <strong>Email: </strong> {this.state.user.email}
                </Card.Text>
                <Card.Text>
                  <strong> Phone Number: </strong> {this.state.user.phoneNo}
                </Card.Text>
                <Card.Text>
                  <strong> Role: </strong> Driver
                </Card.Text>
                <Link to="/login">
                  <Button style={{ marginBottom: "20px" }} className="w-100" variant="danger" >Logout</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <h2>My Location</h2>
            <p>Latitude: {this.state.viewport.latitude}</p>
            <p>Longitude: {this.state.viewport.longitude}</p>
            <ReactMapGL
              {...this.state.viewport}
              onViewportChange={nextViewport => this.setState({ viewport: nextViewport })}
              mapboxApiAccessToken={this.state.MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker longitude={this.state.viewport.longitude} latitude={this.state.viewport.latitude} draggable={true} anchor="top" >
                {/* <h1>here</h1> */}
                <img src={pin} />
              </Marker>
            </ReactMapGL>

          </Col>
        </Row>
      </Container>
      // mapStyle={mapStyle}
    )
  }

}

export default function Dashboard() {
  let { id } = useParams();

  return (
    <div>
      <UserProfile userId={id}></UserProfile>
    </div>
  );
}
