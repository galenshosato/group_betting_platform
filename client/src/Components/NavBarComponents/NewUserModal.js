import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewUserModal() {
  const [showNewUser, setShowNewUser] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("formBasicName").value;
    const email = document.getElementById("formBasicEmail").value;
    const password = document.getElementById("formBasicPassword").value;
    const data = {
      name: name,
      email: email,
      password: password,
      futures_money: 40000,
      money: 100000,
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
      <button id="newUser" onClick={() => setShowNewUser(true)}>
        Add New User
      </button>
      <Modal centered show={showNewUser} onHide={() => setShowNewUser(false)}>
        <Modal.Body>
          <Form id="new-user-form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Enter password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a>
            <Button className="custom-btn" onClick={handleSubmit}>
              Add User
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewUserModal;
