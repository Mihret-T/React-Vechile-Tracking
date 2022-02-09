import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
// import ReactMapGL from 'react-map-gl';
// import { addDoc, getDoc, getDocs, collection, doc, setDoc, onSnapshot, QuerySnapshot, query, where } from "firebase/firestore";
import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import profilePic from '../profilePic1.png';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"


export class ListOfUsers extends Component {
  // const MAPBOX_TOKEN = "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw";
  // const {getUsers } = useAuth()
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  // const [viewport, setViewport] = useState({
  //   width: 1000,
  //   height: 800,
  //   latitude: 9.005401,
  //   longitude: 38.763611,
  //   zoom: 10,
  // });

  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
      MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
      loading: false,
      error: '',
      userId: props.userId,
      user: {},
      users: [],
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
    try{
      this.setState({ loading: true });
      const doc = await this.getUserData();
      this.setState({user: doc.data()});
      
      const docs = await this.getAllUsers();
      let users = [];
      docs.forEach((doc) => {
        users.push(doc.data());
      });
      users = users.filter(user => !user.isAdmin);
      this.setState({ users: users });
      console.log(this.state)
    }catch {
      this.setState({ error: 'Failed to retrive user datas' })
    }
    this.setState({ loading: false });
  }

  async getUserData(){
    return await getDoc(doc(db, "Users", this.state.userId));
  }

  async getAllUsers(){
    return await getDocs(collection(db, 'Users'));
    //return await collection(db, 'Users').Where('isAdmin', '==', false).getDocs();
    //return db.collection('Users').getDocs()
  }

  async getUsersData() {
    console.log("get datas");
    try {
      this.setState({ loading: true });
      const result = await getDoc(doc(db, "Users", this.state.userId));
      console.log(result.data());
      this.setState({user: result.data()});
      const docs = await getDocs(collection(db, 'Users'));
      const users = [];
      docs.forEach((doc) => {
        users.push(doc.data());
      });
      this.setState({ users: users });
      console.log(this.state.user);
      console.log(this.state.users);
      
    } catch (error) {
      this.setState({ error: 'Failed to retrive user datas' })
    }
    this.setState({ loading: false });
  }

  renderUser(user, index) {
    return (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`/map/${user.id}`}>
          <Button variant="link">View on Map</Button> 
          </Link>
          </td>
      </tr>
    )
  }

  // getUserlocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //       const newViewport = {
  //         width: 1000,
  //         height: 800,
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         zoom: 15,
  //       }
  //       //setViewport(newViewport);
  //     })
  //   }
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Img variant="top"  src={profilePic} />
              <Card.Body>
                <Card.Title>{this.state.user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {this.state.user.email}
                </Card.Text>
                <Card.Text>
                  <strong> Phone Number: </strong> {this.state.user.phoneNo}
                </Card.Text>
                <Card.Text>
                  <strong> Role: </strong> Admin
                </Card.Text>
                <Link to="/login">
                  <Button style={{ marginBottom: "20px" }} className="w-100" variant="danger" >Logout</Button>
                </Link>
              </Card.Body>
            </Card>

          </Col>
          <Col sm={8} style={{ marginTop: "10%" }}>
          <h3>List of Drivers</h3>
            <Table hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Get Location</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(this.renderUser)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      // <>
      //   <Card>
      //     <Card.Body>
      //       <h2 className="text-center mb-4">Admin Dashboard</h2>
      //       <Button onClick={this.getUsersData} className="w-100" type="button">
      //         Get User Data
      //       </Button>

      //       <Button onClick={this.getUserlocation} className="w-100" type="button">
      //         Get user location
      //       </Button>
      //     </Card.Body>
      //     <Card>
      //       {/* <ReactMapGL
      //         {...viewport}
      //         onViewportChange={nextViewport => setViewport(nextViewport)}
      //         mapboxApiAccessToken={MAPBOX_TOKEN}
      //       >
      //       </ReactMapGL> */}
      //     </Card>

      //   </Card>
      // </>
    )

  }

}

export default function AdminDashboard() {
  let { id } = useParams();
 
  return (
    <div>
     <ListOfUsers userId={id}></ListOfUsers>
    </div>
  );
}