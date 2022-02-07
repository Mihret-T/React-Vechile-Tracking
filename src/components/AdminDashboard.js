import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Button, Card } from "react-bootstrap"


export default function AdminDashboard() {

  const {getUsers } = useAuth()
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


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


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <Button onClick={getUsersData} className="w-100" type="button">
            Get User Data
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

