import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect, useRef, useState } from "react";
import "../../css/userPage.css";

function BetCard({
  currentUser,
  bet,
  betList,
  setBetList,
  weekly_money,
  futures_money,
  setUserWeeklyMoney,
  setUserFuturesMoney,
  futuresList,
  setFuturesList,
}) {
  const [cardClass, setCardClass] = useState("");
  const [userFont, setUserFont] = useState(16);
  const userBetNameRef = useRef(null);
  const { amount, bet_name, odds, winnings, id, user_id } = bet;

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
    setCardClass(newCardClass);
  }, [bet.hit]);

  function handleBetDelete() {
    if (bet.bet_type === "weekly") {
      fetch(
        `https://group-gamble-d231ef097ad5.herokuapp.com/api/${user_id}/currentbet/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bet_type: "weekly" }),
        }
      );
      let newWeekly = weekly_money + parseFloat(amount);
      setUserWeeklyMoney(newWeekly);
      const updatedBetList = betList.filter((bet) => bet.id !== id);
      setBetList(updatedBetList);
    } else {
      fetch(
        `https://group-gamble-d231ef097ad5.herokuapp.com/api/${user_id}/currentbet/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bet_type: "future" }),
        }
      );
      let newFutures = futures_money + parseFloat(amount);
      setUserFuturesMoney(newFutures);
      const updatedFuturesList = futuresList.filter((bet) => bet.id !== id);
      setFuturesList(updatedFuturesList);
    }
  }

  function changeBetSuccess(event) {
    let newSuccessType = event.target.value;
    let newCardClass = "";
    fetch(
      `https://group-gamble-d231ef097ad5.herokuapp.com/api/${user_id}/currentbet/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hit: newSuccessType }),
      }
    );

    switch (newSuccessType) {
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
    setCardClass(newCardClass);
  }

  useEffect(() => {
    // Function to calculate the maximum allowed font size
    function calculateMaxFontSize(containerWidth, containerHeight) {
      const textElement = userBetNameRef.current;
      if (!textElement) return; // Ensure the text element exists

      const textWidth = textElement.offsetWidth;
      const textHeight = textElement.offsetHeight;

      const widthRatio = containerWidth / textWidth;
      const heightRatio = containerHeight / textHeight;

      // Use the smaller of the two ratios to ensure text fits both width and height
      let newFontSize = Math.min(widthRatio, heightRatio) * userFont;

      // Limit the font size to a maximum of 16px
      newFontSize = Math.min(newFontSize, 16);

      setUserFont(newFontSize);
    }

    // Call the calculateMaxFontSize function when the component mounts and when bet.bet_name changes
    calculateMaxFontSize(419, 27.27);
    window.addEventListener("resize", () => {
      calculateMaxFontSize(419, 27.27);
    });

    return () => {
      window.removeEventListener("resize", () => {
        calculateMaxFontSize(419, 27.27);
      });
    };
    // eslint-disable-next-line
  }, [bet.bet_name]);

  return (
    <>
      <Card
        className={`${
          currentUser.name === "dev" ? "dev-bet-card" : "bet-card"
        } ${cardClass}`}
      >
        <Card.Body>
          <div className="name-odds">
            <h3
              style={{ fontSize: `${userFont}px` }}
              ref={userBetNameRef}
              className="user-bet-name"
            >
              {bet_name}
            </h3>
            {odds > 0 ? <h3>+{odds}</h3> : <h3> {odds}</h3>}
          </div>
          <div className="amount-winnings">
            <div className="amount">
              <span>Wager</span>
              <h3>${amount.toLocaleString()}</h3>
            </div>{" "}
            <div className="winnings">
              <span>To Win</span>
              <h3>${winnings.toLocaleString()}</h3>
            </div>
            <div>
              <Button onClick={handleBetDelete}>Refund</Button>
            </div>
          </div>

          {currentUser.name === "dev" ? (
            <ButtonGroup>
              <Button variant="success" onClick={changeBetSuccess} value="hit">
                Hit
              </Button>
              <Button variant="warning" onClick={changeBetSuccess} value="push">
                Push
              </Button>
              <Button variant="danger" onClick={changeBetSuccess} value="miss">
                Miss
              </Button>
            </ButtonGroup>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}

export default BetCard;
