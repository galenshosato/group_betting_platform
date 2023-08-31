import { useEffect, useState } from "react";
import ReducedBetCard from "./ReducedBetCard";
import BetHistoryDropdown from "./BetHistoryDropdown";

function BetHistory({ week, groupAndSort }) {
  const [pastBetList, setPastBetList] = useState([]);
  const groupedPastBets = groupAndSort(pastBetList);

  useEffect(() => {
    if (week === 1) {
      return;
    } else {
      fetch(`/api/${week - 1}/get-past-bets`)
        .then((resp) => resp.json())
        .then((data) => setPastBetList(data));
    }
  }, [week]);
  return (
    <>
      <BetHistoryDropdown week={week} />
      {pastBetList.length !== 0 ? (
        groupedPastBets.map(([userName, bets]) => (
          <div key={userName}>
            <h2>{userName}</h2>
            {bets.map((bet) => {
              return <ReducedBetCard key={bet.id} bet={bet} />;
            })}
            <br />
          </div>
        ))
      ) : (
        <h1>No Past Bets Available</h1>
      )}
    </>
  );
}

export default BetHistory;
