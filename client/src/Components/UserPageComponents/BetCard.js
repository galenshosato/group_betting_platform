import Card from "react-bootstrap/Card";

function BetCard({ week, bet }) {
  const { amount, bet_name, odds, winnings } = bet;

  return (
    <>
      <Card>
        <Card.Body>
          <h3>Week {week}</h3>
          <h2>{bet_name}</h2>
          <h2>{odds}</h2>
          <h3>{amount}</h3>
          <h3>{winnings}</h3>
        </Card.Body>
      </Card>
    </>
  );
}

export default BetCard;
