import { useEffect } from "react";
import BetCard from "./BetCard";

function FutureBetList({
  id,
  futuresList,
  setFuturesList,
  setUserFuturesMoney,
  futures_money,
}) {
  useEffect(() => {
    fetch(`/api/${id}/current-futures-bets`)
      .then((resp) => resp.json())
      .then((data) => setFuturesList(data));
  }, [id, setFuturesList]);
  return (
    <>
      <h1>Futures Bets</h1>
      {futuresList.map((bet) => {
        return (
          <BetCard
            key={bet.id}
            bet={bet}
            futures_money={futures_money}
            futuresList={futuresList}
            setFuturesList={setFuturesList}
            setUserFuturesMoney={setUserFuturesMoney}
          />
        );
      })}
    </>
  );
}

export default FutureBetList;
