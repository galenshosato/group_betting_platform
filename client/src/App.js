import { useState, useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBarComponents/NavBar";
import HomePage from "./Components/HomePageComponents/HomePage";
import UserPage from "./Components/UserPageComponents/UserPage";
import DevBetList from "./Components/DevTools/DevBetList";
import BetHistory from "./Components/BetHistory";
import AllBetsPage from "./Components/AllBetsPage";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [week, setWeek] = useState(null);
  const [showAddBet, setShowAddBet] = useState(false);

  useEffect(() => {
    fetch("/api/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/api/user/1")
      .then((resp) => resp.json())
      .then((data) => setWeek(data.week));
  }, []);

  function groupAndSort(betArray) {
    const groupedBets = betArray.reduce((groups, bet) => {
      const userName = bet.user_name;
      if (!groups[userName]) {
        groups[userName] = [];
      }
      groups[userName].push(bet);
      return groups;
    }, {});

    const sortedGroupedBets = Object.entries(groupedBets).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return sortedGroupedBets;
  }

  return (
    <div>
      <Header />
      <br></br>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        week={week}
      />
      <br></br>
      {/* <h1>Week {week}</h1>
      <HomePage week={week} /> */}
      {/* <UserPage week={week} currentUser={currentUser} setShowAddBet={setShowAddBet} showAddBet={showAddBet} /> */}
      {/* <DevBetList
        week={week}
        setWeek={setWeek}
        currentUser={currentUser}
        showAddBet={showAddBet}
        setShowAddBet={setShowAddBet}
      /> */}
      {/* <AllBetsPage week={week} groupAndSort={groupAndSort} /> */}
      <BetHistory week={week} groupAndSort={groupAndSort} />
    </div>
  );
}

export default App;
