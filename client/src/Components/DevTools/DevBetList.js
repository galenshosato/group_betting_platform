import { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import BetCard from "../UserPageComponents/BetCard";
import AddNewBetForm from "../UserPageComponents/AddNewBetForm";
import Container from "react-bootstrap/esm/Container";

function DevBetList({
  week,
  setWeek,
  currentUser,
  showAddBet,
  setShowAddBet,
  groupAndSort,
}) {
  const [weeklyBetList, setWeeklyBetList] = useState([]);

  useEffect(() => {
    fetch(`/api/${week}/get-current-bets`)
      .then((resp) => resp.json())
      .then((data) => setWeeklyBetList(data));
  }, [week]);

  function handleWeekUpdate() {
    setWeek((prev) => prev + 1);
    fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const groupedBetList = groupAndSort(weeklyBetList);

  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center">
        <h1 className="text-color">Week {week} Bets</h1>
        <Button onClick={handleWeekUpdate}>Update Week</Button>
      </div>
      <Container style={{ paddingBottom: "20px" }}>
        <h2 className="text-color">Bets To Check</h2>
      </Container>
      <Container className="card-container">
        {groupedBetList.map(([userName, bets]) => (
          <div key={userName} className="card-item">
            <h2 className="names">{userName}</h2>
            {bets.map((bet) => {
              return (
                <BetCard key={bet.id} bet={bet} currentUser={currentUser} />
              );
            })}
            <br />
          </div>
        ))}
      </Container>
      <Container>
        <Row>
          <Col className="col-6 justify-content-start">
            {showAddBet ? (
              <AddNewBetForm
                setWeeklyBetList={setWeeklyBetList}
                week={week}
                setShowAddBet={setShowAddBet}
                currentUser={currentUser}
              />
            ) : null}
            <Button className="custom-btn" onClick={() => setShowAddBet(true)}>
              Make New Bet
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default DevBetList;
