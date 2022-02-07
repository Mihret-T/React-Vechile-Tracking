import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, getUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser]=useState({})
    const navigate = useNavigate()

    async function handleSubmit(e) {
        console.log(e);
        e.preventDefault();
        try {
            setError("")
            setLoading(true)
            const userCr = await login(emailRef.current.value, passwordRef.current.value)
            const doc = await getUser(userCr.user.uid);
            const user = doc.data();
            setUser(user);
            if(user.isAdmin){
                navigate('/admin-dashboard')
            }else{
                navigate('/dashboard')
            }
            console.log(user); 
            
        } catch (error) {
            console.log(error)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
