import { useEffect, useState } from "react";
import ReducedBetCard from "./ReducedBetCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import "../css/allbets.css";

function AllBetsPage({ week, groupAndSort }) {
  const [allCurrentUsersBets, setAllCurrentUsersBets] = useState([]);
  const [allFuturesUserBets, setAllFuturesUserBets] = useState([]);
  const [showFutures, setShowFutures] = useState(false);

  useEffect(() => {
    fetch(`/api/${week}/get-current-bets`)
      .then((resp) => resp.json())
      .then((data) => setAllCurrentUsersBets(data));
  }, [week]);

  useEffect(() => {
    fetch("/api/get-future-bets")
      .then((resp) => resp.json())
      .then((data) => setAllFuturesUserBets(data));
  }, []);

  const groupedUserBets = groupAndSort(allCurrentUsersBets);
  const groupedFutureBets = groupAndSort(allFuturesUserBets);

  return (
    <>
      <Container>
        <h1 id="allBetsWeek">Week {week}</h1>
        <br />
        <Row>
          <Col lg={6} md={6}>
            {groupedUserBets.map(([userName, bets]) => (
              <div key={userName}>
                <h2 className="names">{userName}</h2>
                {bets.map((bet) => {
                  return <ReducedBetCard key={bet.id} bet={bet} />;
                })}
                <br />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Button onClick={() => setShowFutures((prevState) => !prevState)}>
          Futures Bets
        </Button>
      </Container>
      <br />
      {showFutures ? (
        <Container>
          <Row>
            <Col lg={6} md={6}>
              {groupedFutureBets.map(([userName, bets]) => (
                <div key={userName}>
                  <h2 className="names">{userName}</h2>
                  {bets.map((bet) => {
                    return <ReducedBetCard key={bet.id} bet={bet} />;
                  })}
                  <br />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
}

export default AllBetsPage;
