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
import { Google } from "@mui/icons-material";

export default function Login() {
  const { login, currentUser, signInWithGoogle } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(inputs.email, inputs.password);
      navigate("/", { replace: true });
    } catch {
      setError("Incorrect email or password");
    }
    setLoading(false);
  }

  async function signWithGoogle() {
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
    document.title = "Log In";
  }, []);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransion>
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <Card className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">log in</h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-1"
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
                />
              </FloatingLabel>
              <div className="w-100 mb-1" style={{ textAlign: "right" }}>
                <Link to="/forgot-password"> forgot password</Link>
              </div>
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
                />
              </FloatingLabel>
              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                disabled={loading}
              >
                log in
              </Button>

              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                disabled={loading}
                onClick={signWithGoogle}
              >
                <Google /> Sign In With Google
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>

      <div className="w-100 text-center mt-2">
        you need to? <Link to="/signup">register</Link>
      </div>
    </PageTransion>
  );
}
