import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const nameRef = useRef();
  const specializedRef = useRef();
  const idRef = useRef();
  const stdIdRef = useRef();
  const phoneRef = useRef();
  const { currentUser, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function isPhoneNumber(str) {
    if (typeof str != "string" || str.length !== 10) return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (idRef.current.value.length !== 12) {
      return setError("Invalid id");
    }

    if (stdIdRef.current.value.length !== 8) {
      return setError("Invalid student id");
    }

    if (!isPhoneNumber(phoneRef.current.value)) {
      return setError("Invalid phone number");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    const profile = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      specialized: specializedRef.current.value,
      id: idRef.current.value,
      studentId: stdIdRef.current.value,
      phoneNumber: phoneRef.current.value,
    };

    setProfile(profile);

    const jsonProfile = JSON.stringify(profile);
    localStorage.setItem("profile", jsonProfile);

    Promise.all(promises)
      .then(() => {
        history.push(`/profile/${currentUser.uid}`);
        alert("Update successful");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                ref={nameRef}
                required
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group id="specialized">
              <Form.Label>Specialized</Form.Label>
              <Form.Control
                type="specialized"
                ref={specializedRef}
                placeholder="Enter your specialized school here"
              />
            </Form.Group>
            <Form.Group id="identification-number">
              <Form.Label>Identification number</Form.Label>
              <Form.Control
                type="identification-number"
                ref={idRef}
                placeholder="Enter your identification number"
              />
            </Form.Group>
            <Form.Group id="student-id">
              <Form.Label>Student id</Form.Label>
              <Form.Control
                type="student-id"
                ref={stdIdRef}
                placeholder="Enter your student id"
              />
            </Form.Group>
            <Form.Group id="phone-number">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="phone-number"
                ref={phoneRef}
                placeholder="Enter your phone number"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
