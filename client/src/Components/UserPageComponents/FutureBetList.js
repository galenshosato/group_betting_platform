import { useEffect } from "react";
import BetCard from "./BetCard";
import "../../css/userPage.css";

function FutureBetList({
  id,
  futuresList,
  setFuturesList,
  setUserFuturesMoney,
  futures_money,
  currentUser,
}) {
  useEffect(() => {
    fetch(`/api/${id}/current-futures-bets`)
      .then((resp) => resp.json())
      .then((data) => setFuturesList(data));
  }, [id, setFuturesList]);
  return (
    <>
      <h1 className="text-color">Futures Bets</h1>
      {futuresList.map((bet) => {
        return (
          <BetCard
            key={bet.id}
            bet={bet}
            futures_money={futures_money}
            futuresList={futuresList}
            setFuturesList={setFuturesList}
            setUserFuturesMoney={setUserFuturesMoney}
            currentUser={currentUser}
          />
        );
      })}
    </>
  );
}

export default FutureBetList;
