import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import NewUserModal from "./NewUserModal";
import Button from "react-bootstrap/Button";
import "../../css/navbar.css";

function NavBar({ currentUser, setCurrentUser, week }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
    });
    setCurrentUser({});
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid style={{ maxWidth: "1500px" }}>
          <Nav className="me-auto">
            <Nav.Link id="home" href="/">
              Home
            </Nav.Link>
            {currentUser.name && (
              <>
                {currentUser.name === "dev" && (
                  <Nav.Link id="allBets" href="/dev/betlist">
                    Week {week} Bets (Dev)
                  </Nav.Link>
                )}

                {currentUser.name !== "dev" && (
                  <Nav.Link
                    id="userBets"
                    href={`/${currentUser.name}/weekly-bets`}
                  >
                    {currentUser.name
                      ? `${currentUser.name}'s Bets`
                      : "Player Bets"}
                  </Nav.Link>
                )}
              </>
            )}
            <Nav.Link id="allUserBets" href="/all-current-bets">
              All Player Bets
            </Nav.Link>
            <Nav.Link id="pastBets" href="/past-bets">
              Past Bets
            </Nav.Link>
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
            {currentUser.name === "dev" ? <NewUserModal /> : null}
            {currentUser.name ? (
              <Button
                id="logout-btn"
                className="custom-btn"
                onClick={handleLogout}
                style={{ marginLeft: "2.5rem" }}
              >
                Logout
              </Button>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
