import { useState } from "react";
import BetList from "./BetList";
import UserDashboard from "./UserDashboard";

function UserPage({ currentUser, week }) {
  const [userWeeklyMoney, setUserWeeklyMoney] = useState(
    currentUser.weekly_money
  );
  const [userFuturesMoney, setUserFuturesMoney] = useState(
    currentUser.futures_money
  );
  console.log(userFuturesMoney);
  console.log(userFuturesMoney);

  return (
    <>
      <UserDashboard
        currentUser={currentUser}
        weekly_money={userWeeklyMoney}
        futures_money={userFuturesMoney}
      />
      <BetList
        week={week}
        id={currentUser.id}
        weekly_money={userWeeklyMoney}
        futures_money={userWeeklyMoney}
        setUserWeeklyMoney={setUserWeeklyMoney}
        setUserFuturesMoney={setUserFuturesMoney}
      />
    </>
  );
}

export default UserPage;
