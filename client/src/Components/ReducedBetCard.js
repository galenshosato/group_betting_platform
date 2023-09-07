import Card from "react-bootstrap/Card";
import "../css/allbets.css";

function ReducedBetCard({ bet }) {
  function betOddsCatch(odds) {
    if (bet.odds > 0 && !odds.toString().includes("+")) {
      return `+${odds}`;
    }
    return odds;
  }
  return (
    <>
      <Card className="allCardBets">
        <Card.Body>
          <div className="bet-and-odds">
            <h2>{bet.bet_name}</h2>
            <h2>{betOddsCatch(bet.odds)}</h2>
          </div>
          <div className="text-span">
            <span>Amount Wagered</span>
            <span id="winnings-span">Winnings</span>
          </div>
          <div className="wagered-and-won">
            <h3>${bet.amount.toLocaleString()}</h3>
            <h3>${bet.winnings.toLocaleString()}</h3>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReducedBetCard;
