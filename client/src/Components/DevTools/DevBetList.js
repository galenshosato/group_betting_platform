import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BetCard from "../UserPageComponents/BetCard";
import AddNewBetForm from "../UserPageComponents/AddNewBetForm";

function DevBetList({ week, setWeek, currentUser, showAddBet, setShowAddBet }) {
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

  return (
    <>
      <div>
        <h1>Week {week} Bets</h1>
        <Button className="custom-btn" onClick={handleWeekUpdate}>
          Update Week
        </Button>
      </div>
      <br />
      <div>
        <h2>Bets To Check</h2>
        {weeklyBetList.map((bet) => {
          return <BetCard key={bet.id} bet={bet} currentUser={currentUser} />;
        })}
      </div>
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
    </>
  );
}
export default DevBetList;
