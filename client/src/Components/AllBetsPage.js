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
      <Container>
        <h1 id="allBetsWeek">Week {week}</h1>
        <br />
        <div>
          {groupedUserBets.map(([userName, bets]) => (
            <div key={userName}>
              <h2 className="names">{userName}</h2>
              {bets.map((bet) => {
                return <ReducedBetCard key={bet.id} bet={bet} />;
              })}
              <br />
            </div>
          ))}
        </div>
      </Container>
      <br />
      <Container>
        <Button
          className="custom-btn"
          onClick={() => setShowFutures((prevState) => !prevState)}
        >
          Futures Bets
        </Button>
      </Container>
      <br />
      {showFutures ? (
        <Container>
          {groupedFutureBets.map(([userName, bets]) => (
            <div key={userName}>
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
