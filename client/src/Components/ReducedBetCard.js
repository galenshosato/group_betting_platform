import Card from "react-bootstrap/Card";

function ReducedBetCard({ bet }) {
  function betOddsCatch(odds) {
    if (bet.odds > 0 && !odds.toString().includes("+")) {
      return `+${odds}`;
    }
    return odds;
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2>{bet.bet_name}</h2>
          <h2>{betOddsCatch(bet.odds)}</h2>
          <h3>${bet.amount.toLocaleString()}</h3>
          <h3>${bet.winnings.toLocaleString()}</h3>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReducedBetCard;
