import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import '../styles/Signup.css';

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const fullNameRef = useRef()
    const phoneNoRef = useRef()
    const roleRef = useRef()
    const { signup, registerUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            const user = await signup(emailRef.current.value, passwordRef.current.value)
            const uid = user.user.uid;
            //const uid = "zHNe0v4turUzUuHS1acYVcm2kQo1";
            const email = emailRef.current.value;
            const name = fullNameRef.current.value;
            const phoneNo = phoneNoRef.current.value;
            const role = roleRef.current.value;
            console.log(role);
            console.log(uid);
            let data = {
                id: uid,
                email,
                name,
                phoneNo,
                isAdmin: role === 'Admin' ? true: false
            }
            await registerUser(uid, data);
            if(data.isAdmin){
                navigate(`/admin-dashboard/${user.id}`)
            }else{
                navigate(`/dashboard/${user.id}`)
            }
        } catch (error) {
            console.log(error);
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
            <Card className="Signup-form">
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" ref={fullNameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" ref={phoneNoRef} required />
                        </Form.Group>
                        <Form.Group id="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select ref={roleRef}>
                                <option>Driver</option>
                                <option>Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button style={{ marginTop: "30px" }} disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
