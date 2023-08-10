import React from 'react'
import { Container, Nav, Navbar} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'

function NavBar({currentUser, setCurrentUser}) {
    const navigate = useNavigate()

    return (
        <>
        <Navbar>
            <Container>
                <Nav>
                    <Nav.Link id='home'>Home</Nav.Link>
                    <Nav.Link id ='userBets'>Week 1 Bets</Nav.Link>
                    <Nav.Link id = 'userPastBets'>{currentUser.name}'s Past Bets</Nav.Link>
                </Nav>
                <Nav>
                    {currentUser.name ? <><Navbar.Text id = 'welcome'>Welcome, {currentUser.name}!</Navbar.Text></> : 
                    <LoginModal id='login' currentUser={currentUser} setCurrentUser={setCurrentUser} />}
                    {currentUser.name ? <button id='logout'>Logout</button> : null}
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default NavBar