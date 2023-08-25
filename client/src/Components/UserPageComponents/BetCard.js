import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function BetCard({ week, bet, betList, setBetList }) {
  const { amount, bet_name, odds, winnings, id, user_id } = bet;

  function handleBetDelete() {
    fetch(`/api/${user_id}/currentbet/${id}`, {
      method: "DELETE",
    });
    const updatedBetList = betList.filter((bet) => bet.id !== id);
    setBetList(updatedBetList);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h3>Week {week}</h3>
          <h2>{bet_name}</h2>
          <h2>{odds}</h2>
          <h3>{amount}</h3>
          <h3>{winnings}</h3>
          <Button onClick={handleBetDelete}>Refund</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default BetCard;
