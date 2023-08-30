import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BetCard from "../UserPageComponents/BetCard";

function DevBetList({ week, setWeek, currentUser }) {
  const [weeklyBetList, setWeeklyBetList] = useState([]);

  useEffect(() => {
    fetch(`/api/dev/${week}/get-current-bets`)
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

  return (
    <>
      <div>
        <h1>Week {week} Bets</h1>
        <Button onClick={handleWeekUpdate}>Update Week</Button>
      </div>
      <br />
      <div>
        <h2>Bets To Check</h2>
        {weeklyBetList.map((bet) => {
          return <BetCard key={bet.id} bet={bet} currentUser={currentUser} />;
        })}
      </div>
    </>
  );
}
export default DevBetList;
