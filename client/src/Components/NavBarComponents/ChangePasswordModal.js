import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";
import "../../css/modal.css";

function ChangePasswordModal({
  showChangePassword,
  setShowChangePassword,
  showLogin,
  setShowLogin,
}) {
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  function newPassChange(e) {
    setNewPass(e.target.value);
  }

  function newPassConfirmChange(e) {
    setNewPassConfirm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("userEmail").value;

    if (newPass !== newPassConfirm) {
      alert("Password does not match! Please re-enter matching passwords");
    } else if (newPass.length < 1) {
      alert("Please enter a valid new password");
    }

    const data = {
      email: email,
      new_password: newPass,
    };

    console.log(data);

    fetch("/api/change_pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        setShowLogin(true);
      }
    });

    setShowChangePassword(false);
  }

  return (
    <>
      <Modal
        centered
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
      >
        <Modal.Body>
          <Form id="password-change-form">
            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={newPassChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                onChange={newPassConfirmChange}
              />
            </Form.Group>
          </Form>
          {newPass && newPassConfirm && newPass === newPassConfirm ? (
            <span id="goodPassword">Password matches!</span>
          ) : null}
          {newPass && newPassConfirm && newPass !== newPassConfirm ? (
            <span id="badPassword">
              Password does not match, please re-enter
            </span>
          ) : null}
        </Modal.Body>
        <br></br>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      {showLogin ? <LoginModal /> : null}
    </>
  );
}

export default ChangePasswordModal;
