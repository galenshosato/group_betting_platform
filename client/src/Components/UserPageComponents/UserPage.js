import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../../css/userPage.css";
import BetList from "./BetList";
import UserDashboard from "./UserDashboard";
import FutureBetList from "./FutureBetList";

function UserPage({ currentUser, week, setShowAddBet, showAddBet }) {
  const [userWeeklyMoney, setUserWeeklyMoney] = useState(
    parseFloat(localStorage.getItem("userWeeklyMoney")) ||
      currentUser.weekly_money ||
      0
  );
  const [userFuturesMoney, setUserFuturesMoney] = useState(
    parseFloat(localStorage.getItem("userFuturesMoney")) ||
      currentUser.futures_money ||
      0
  );
  const [futuresList, setFuturesList] = useState([]);

  useEffect(() => {
    // Update userWeeklyMoney when currentUser.weekly_money changes
    if (
      currentUser.weekly_money !== undefined &&
      currentUser.weekly_money !== userWeeklyMoney
    ) {
      setUserWeeklyMoney(currentUser.weekly_money);
      localStorage.setItem(
        "userWeeklyMoney",
        currentUser.weekly_money.toString()
      );
    }
    // eslint-disable-next-line
  }, [currentUser.weekly_money]);

  useEffect(() => {
    // Update userFuturesMoney when currentUser.futures_money changes
    if (
      currentUser.futures_money !== undefined &&
      currentUser.futures_money !== userFuturesMoney
    ) {
      setUserFuturesMoney(currentUser.futures_money);
      localStorage.setItem(
        "userFuturesMoney",
        currentUser.futures_money.toString()
      );
    }
    // eslint-disable-next-line
  }, [currentUser.futures_money]);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <BetList
              week={week}
              id={currentUser.id}
              weekly_money={userWeeklyMoney}
              futures_money={userFuturesMoney}
              setUserWeeklyMoney={setUserWeeklyMoney}
              setUserFuturesMoney={setUserFuturesMoney}
              futuresList={futuresList}
              setFuturesList={setFuturesList}
              showAddBet={showAddBet}
              setShowAddBet={setShowAddBet}
              currentUser={currentUser}
            />
          </Col>
          <Col md={6}>
            <UserDashboard
              currentUser={currentUser}
              weekly_money={userWeeklyMoney}
              futures_money={userFuturesMoney}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <FutureBetList
          id={currentUser.id}
          futuresList={futuresList}
          futures_money={userFuturesMoney}
          setFuturesList={setFuturesList}
          setUserFuturesMoney={setUserFuturesMoney}
          currentUser={currentUser}
        />
      </Container>
    </>
  );
}

export default UserPage;
