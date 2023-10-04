import Card from "react-bootstrap/Card";
import "../css/allbets.css";
import { useState, useEffect, useRef } from "react";

function ReducedBetCard({ bet }) {
  const [cardBg, setCardBg] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const betNameRef = useRef(null);
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

  useEffect(() => {
    // Function to calculate the maximum allowed font size
    function calculateMaxFontSize(containerWidth, containerHeight) {
      const textElement = betNameRef.current;
      if (!textElement) return; // Ensure the text element exists

      const textWidth = textElement.offsetWidth;
      const textHeight = textElement.offsetHeight;

      const widthRatio = containerWidth / textWidth;
      const heightRatio = containerHeight / textHeight;

      // Use the smaller of the two ratios to ensure text fits both width and height
      let newFontSize = Math.min(widthRatio, heightRatio) * fontSize;

      // Limit the font size to a maximum of 16px
      newFontSize = Math.min(newFontSize, 16);

      setFontSize(newFontSize);
    }

    // Call the calculateMaxFontSize function when the component mounts and when bet.bet_name changes
    calculateMaxFontSize(336.7, 38.38);
    window.addEventListener("resize", () => {
      calculateMaxFontSize(336.7, 38.38);
    });

    return () => {
      window.removeEventListener("resize", () => {
        calculateMaxFontSize(336.7, 38.38);
      });
    };
    // eslint-disable-next-line
  }, [bet.bet_name]);

  return (
    <>
      <Card className={`allCardBets ${cardBg}`}>
        <Card.Body>
          <div className="bet-and-odds">
            <h2
              style={{ fontSize: `${fontSize}px` }}
              ref={betNameRef}
              className="bet-name"
            >
              {bet.bet_name}
            </h2>
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
