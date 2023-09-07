import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect, useState } from "react";

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
  const { amount, bet_name, odds, winnings, id, user_id, week } = bet;
  const names = {
    1: "Test",
    2: "Galen",
    3: "Chris",
    4: "Grant",
    5: "Morgan",
    6: "Ethan",
    7: "Spear",
  };

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
      fetch(`/api/${user_id}/currentbet/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bet_type: "weekly" }),
      });
      let newWeekly = weekly_money + parseFloat(amount);
      setUserWeeklyMoney(newWeekly);
      const updatedBetList = betList.filter((bet) => bet.id !== id);
      setBetList(updatedBetList);
    } else {
      fetch(`/api/${user_id}/currentbet/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bet_type: "future" }),
      });
      let newFutures = futures_money + parseFloat(amount);
      setUserFuturesMoney(newFutures);
      const updatedFuturesList = futuresList.filter((bet) => bet.id !== id);
      setFuturesList(updatedFuturesList);
    }
  }

  function changeBetSuccess(event) {
    let newSuccessType = event.target.value;
    let newCardClass = "";
    fetch(`/api/${user_id}/currentbet/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hit: newSuccessType }),
    });

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

  return (
    <>
      <Card className={cardClass}>
        <Card.Body>
          {currentUser.name === "dev" ? <h2>{names[user_id]}</h2> : null}
          <h3>Week {week}</h3>
          <h2>{bet_name}</h2>
          <h2>{odds}</h2>
          <h3>${amount.toLocaleString()}</h3>
          <h3>${winnings.toLocaleString()}</h3>
          <Button className="custom-btn" onClick={handleBetDelete}>
            Refund
          </Button>
          <br />
          {currentUser.name === "dev" ? (
            <ButtonGroup>
              <Button variant="success" onClick={changeBetSuccess} value="hit">
                Hit
              </Button>
              <Button variant="warning" value="push" onClick={changeBetSuccess}>
                Push
              </Button>
              <Button variant="danger" value="miss" onClick={changeBetSuccess}>
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
