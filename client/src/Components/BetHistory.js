import { useEffect, useState } from "react";
import ReducedBetCard from "./ReducedBetCard";
import BetHistoryDropdown from "./BetHistoryDropdown";
import Container from "react-bootstrap/esm/Container";

function BetHistory({ week, groupAndSort }) {
  const [pastBetList, setPastBetList] = useState([]);
  const groupedPastBets = groupAndSort(pastBetList);

  useEffect(() => {
    if (week > 1) {
      fetch(`/api/${week - 1}/get-past-bets`)
        .then((resp) => resp.json())
        .then((data) => setPastBetList(data));
    }
  }, [week]);

  const dropDownObject = { 1: "Week 1" };

  for (let i = 2; i <= week; i++) {
    if (!dropDownObject[i - 1]) {
      dropDownObject[i - 1] = `Week ${i - 1}`;
    }
  }

  const dropDownArray = Object.entries(dropDownObject);

  return (
    <>
      <div style={{ padding: "20px", marginLeft: "6%" }}>
        <BetHistoryDropdown
          week={week}
          dropDownArray={dropDownArray}
          setPastBetList={setPastBetList}
        />
      </div>
      <Container className="card-container">
        {pastBetList.length !== 0 ? (
          groupedPastBets.map(([userName, bets]) => (
            <div key={userName} className="card-item">
              <h2 className="text-color">{userName}</h2>
              {bets.map((bet) => {
                return <ReducedBetCard key={bet.id} bet={bet} />;
              })}
              <br />
            </div>
          ))
        ) : (
          <h1 className="text-color">Loading Bets...</h1>
        )}
      </Container>
    </>
  );
}

export default BetHistory;
