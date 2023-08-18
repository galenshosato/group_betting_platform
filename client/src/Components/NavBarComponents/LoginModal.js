import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";

function LoginModal({ setCurrentUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("formBasicEmail").value;
    const password = document.getElementById("formBasicPassword").value;
    const data = {
      email: email,
      password: password,
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => setCurrentUser(data));

    setShowLogin(false);
  }

  function handleClick() {
    setShowLogin(false);
    setShowChangePassword(true);
  }

  return (
    <>
      <button id="login" onClick={() => setShowLogin(true)}>
        Login
      </button>
      <Modal centered show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Body>
          <Form id="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>
            <span onClick={handleClick}>Change Password</span>
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
      {showChangePassword ? (
        <ChangePasswordModal
          showChangePassword={showChangePassword}
          setShowChangePassword={setShowChangePassword}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />
      ) : null}
    </>
  );
}

export default LoginModal;
