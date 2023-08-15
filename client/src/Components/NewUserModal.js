import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewUserModal() {
  const [showNewUser, setShowNewUser] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("formBasicEmail").value;
    const password = document.getElementById("formBasicPassword").value;
    const data = {
      email: email,
      password: password,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        setShowNewUser(false);
      } else {
        alert("New User was not created");
      }
    });
  }

  return (
    <>
      <button id="login" onClick={() => setShowNewUser(true)}>
        Add User
      </button>
      <Modal centered show={showNewUser} onHide={() => setShowNewUser(false)}>
        <Modal.Body>
          <Form id="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Enter Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a>
            <Button className="custom-btn" onClick={handleSubmit}>
              Login
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewUserModal;
