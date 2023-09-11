import Card from "react-bootstrap/Card";
import "../css/allbets.css";
import { useState, useEffect } from "react";

function ReducedBetCard({ bet }) {
  const [cardBg, setCardBg] = useState("");
  function betOddsCatch(odds) {
    if (bet.odds > 0 && !odds.toString().includes("+")) {
      return `+${odds}`;
    }
    return odds;
  }

  useEffect(() => {
    let newCardClass = "";

    switch (bet.hit) {
      case "hit":
        newCardClass = "hit-bg";
        break;
      case "push":
        newCardClass = "push-bg";
        break;
      case "miss":
        newCardClass = "miss-bg";
        break;
      default:
        break;
    }
    setCardBg(newCardClass);
  }, [bet.hit]);

  return (
    <>
      <Card className={`allCardBets ${cardBg}`}>
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
