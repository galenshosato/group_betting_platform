import { useEffect } from "react";

function DevBetList() {
  const names = {
    2: "Galen",
    3: "Chris",
    4: "Grant",
    5: "Morgan",
    6: "Ethan",
    7: "Spear",
  };

  useEffect(() => {
    fetch("/api/get-current-bets")
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <p>Dev Bet List</p>
    </>
  );
}
export default DevBetList;
