import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

function NavBar({ currentUser, setCurrentUser, week }) {
  //   const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <Nav.Link id="home">Home</Nav.Link>
            {currentUser.name === "dev" ? (
              <Nav.Link id="allBets">Week {week} Bets (Dev)</Nav.Link>
            ) : (
              <Nav.Link id="userBets">Week {week} Bets</Nav.Link>
            )}
            {currentUser.name && currentUser.name !== "dev" ? (
              <Nav.Link id="userPastBets">
                {currentUser.name}'s Past Bets
              </Nav.Link>
            ) : (
              <Nav.Link id="pastBets">Past Bets</Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser.name ? (
              <>
                <Navbar.Text id="welcome">
                  {" "}
                  Welcome, {currentUser.name}!
                </Navbar.Text>
              </>
            ) : (
              <LoginModal id="login" setCurrentUser={setCurrentUser} />
            )}
            {currentUser.name === "dev" ? (
              <button id="addNewUser-btn">Add New User</button>
            ) : null}
            {currentUser.name ? <button id="logout-btn">Logout</button> : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
