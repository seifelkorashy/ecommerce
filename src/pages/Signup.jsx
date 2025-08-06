/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Card,
  FloatingLabel,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageTransion from "../compnents/PageTransion";
import GoogleIcon from '@mui/icons-material/Google';

export default function Signup() {
  const { signup, currentUser,signInWithGoogle } = useAuth();

  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  async function handleSubmit(e) {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      return setError("passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(inputs.email, inputs.password, inputs.userName);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in instead.");
      } else if (error.code === "auth/invalid-email") {
        setError("The email format is invalid.");
      } else if (error.code === "auth/weak-password") {
        setError("The password is too weak. It must be at least 6 characters.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
    setLoading(false);
  }


    async function signUpWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
      document.title = "Sign Up"  
  }, [])




    if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <PageTransion>
      <Container className="d-flex align-items-center justify-content-center mt-4">
        <Card className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={inputs.userName}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      userName: e.target.value.toLocaleLowerCase(),
                    });
                  }}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={inputs.email}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      email: e.target.value.toLocaleLowerCase(),
                    });
                  }}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={inputs.password}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      password: e.target.value.toLocaleLowerCase(),
                    });
                  }}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                className="mt-3"
                controlId="floatingPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder=" Password"
                  value={inputs.confirmPassword}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      confirmPassword: e.target.value.toLocaleLowerCase(),
                    });
                  }}
                  required
                />
              </FloatingLabel>
              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                disabled={loading}
              >
                Sign Up
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                disabled={loading}
                onClick={signUpWithGoogle}
              >
                <GoogleIcon/> Sign Up With Google
                
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </PageTransion>
  );
}
