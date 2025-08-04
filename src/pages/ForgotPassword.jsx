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
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageTransion from "../compnents/PageTransion";
export default function ForgotPassword() {
  const { resetPassword, currentUser } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


    if (currentUser) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");

    try {
      setError("");
      setLoading(true);
      await resetPassword(inputs.email);
      setError("check your email in spam to reset password");
    } catch {
      setError("faild to reset password");
    }
    setLoading(false);
  }

  useEffect(() => {
    document.title = "Reset Paasword";
  }, []);
  return (
    <PageTransion>
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <Card className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">reset password</h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
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

              <Button
                variant="primary"
                type="submit"
                className="mt-1 w-100"
                disabled={loading}
              >
                Reset
              </Button>
            </form>

            <div className="w-100 text-center mt-2">
              <Link to="/login">log in</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <div className="w-100 text-center mt-2">
        you need to? <Link to="/signup">register</Link>
      </div>
    </PageTransion>
  );
}
