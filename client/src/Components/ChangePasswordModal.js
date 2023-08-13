import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ChangePasswordModal({ showChangePassword, setShowChangePassword }) {
  return (
    <>
      <Modal
        centered
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
      >
        <Modal.Body>
          <Form id="password-change-form">
            <Form.Group id="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" autoFocus />
            </Form.Group>
            <br></br>
            <Form.Group id="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control placeholder="Enter new password" />
            </Form.Group>
            <br></br>
            <Form.Group id="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control placeholder="Re-enter new password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-btn">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
