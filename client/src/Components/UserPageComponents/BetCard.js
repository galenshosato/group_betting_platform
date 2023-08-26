import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function BetCard({
  week,
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
  const { amount, bet_name, odds, winnings, id, user_id } = bet;

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

  return (
    <>
      <Card>
        <Card.Body>
          <h3>Week {week}</h3>
          <h2>{bet_name}</h2>
          <h2>{odds}</h2>
          <h3>${amount.toLocaleString()}</h3>
          <h3>${winnings.toLocaleString()}</h3>
          <Button onClick={handleBetDelete}>Refund</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default BetCard;
