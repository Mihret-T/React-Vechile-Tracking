import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Button, Card } from "react-bootstrap";
import ReactMapGL from 'react-map-gl';


export default function AdminDashboard() {
  const MAPBOX_TOKEN = "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw";
  const {getUsers } = useAuth()
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [viewport, setViewport] = useState({
    width: 1000,
    height: 800,
    latitude: 64.53349,
    longitude: 127.42393,
    zoom: 10,
  });


  async function getUsersData(e) {
    
    try {
      setError("")
      setLoading(true)
      const querySnapshot = await getUsers();
       // const users = [];
        querySnapshot.forEach((doc) => {
          setUsers([...users, doc.data()])
        users.push(doc.data());
        })
        console.log(users);
        // setUsers(users);
      } catch {
      setError("Failed to retrive user datas");
    }
    setLoading(false);
  }

  function getUserlocation(){
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const newViewport = {
          width: 1000,
          height: 800,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 25,
        }
        setViewport(newViewport);
      })
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <Button onClick={getUsersData} className="w-100" type="button">
            Get User Data
          </Button>

          <Button onClick={getUserlocation} className="w-100" type="button">
            Get user location
          </Button>
        </Card.Body>
        <Card>
        <ReactMapGL
              {...viewport}
              onViewportChange={nextViewport => setViewport(nextViewport )}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
            </ReactMapGL>
        </Card>
       
      </Card>
    </>
  )
}

