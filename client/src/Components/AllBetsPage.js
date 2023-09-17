import { useEffect, useState } from "react";
import ReducedBetCard from "./ReducedBetCard";
import Container from "react-bootstrap/esm/Container";
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
      <h1
        className="text-color"
        style={{ marginLeft: "15.5%", marginBottom: "2%", marginTop: "20px" }}
      >
        Week {week}
      </h1>
      <Container className="card-container">
        {groupedUserBets.map(([userName, bets]) => (
          <div key={userName} className="card-item">
            <h2 className="names">{userName}</h2>
            {bets.map((bet) => {
              return <ReducedBetCard key={bet.id} bet={bet} />;
            })}
            <br />
          </div>
        ))}
      </Container>
      <br />
      <Container>
        <Button onClick={() => setShowFutures((prevState) => !prevState)}>
          Futures Bets
        </Button>
      </Container>
      <br />
      {showFutures ? (
        <Container className="card-container">
          {groupedFutureBets.map(([userName, bets]) => (
            <div key={userName} className="card-item">
              <h2 className="names">{userName}</h2>
              {bets.map((bet) => {
                return <ReducedBetCard key={bet.id} bet={bet} />;
              })}
              <br />
            </div>
          ))}
        </Container>
      ) : null}
    </>
  );
}

export default AllBetsPage;
