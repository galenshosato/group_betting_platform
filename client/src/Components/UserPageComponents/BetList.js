import { useState, useEffect } from "react";
import BetCard from "./BetCard";
import Button from "react-bootstrap/Button";
import AddNewBetForm from "./AddNewBetForm";

function BetList({ week, id }) {
  const [betList, setBetList] = useState([]);
  const [showAddBet, setShowAddBet] = useState(false);

  useEffect(() => {
    fetch(`/api/${id}/current-weekly-bets`)
      .then((resp) => resp.json())
      .then((data) => setBetList(data));
  }, [id]);

  return (
    <>
      {betList.map((bet) => {
        return <BetCard key={bet.id} bet={bet} week={week} />;
      })}
      {showAddBet ? (
        <AddNewBetForm
          betList={betList}
          setBetList={setBetList}
          week={week}
          id={id}
        />
      ) : null}
      <Button onClick={() => setShowAddBet(true)}>Make New Bet</Button>
    </>
  );
}

export default BetList;
