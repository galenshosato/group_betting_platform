import { useEffect, useState } from "react";
import ReducedBetCard from "./ReducedBetCard";
import BetHistoryDropdown from "./BetHistoryDropdown";

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
      <BetHistoryDropdown
        week={week}
        dropDownArray={dropDownArray}
        setPastBetList={setPastBetList}
      />
      {pastBetList.length !== 0 ? (
        groupedPastBets.map(([userName, bets]) => (
          <div key={userName}>
            <h2 className="text-color">{userName}</h2>
            {bets.map((bet) => {
              return <ReducedBetCard key={bet.id} bet={bet} />;
            })}
            <br />
          </div>
        ))
      ) : (
        <h1 className="text-color">No Past Bets Available</h1>
      )}
    </>
  );
}

export default BetHistory;
