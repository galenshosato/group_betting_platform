import { useState, useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBarComponents/NavBar";
import HomePage from "./Components/HomePageComponents/HomePage";
import UserPage from "./Components/UserPageComponents/UserPage";
import DevBetList from "./Components/DevTools/DevBetList";
import BetHistory from "./Components/BetHistory";
import AllBetsPage from "./Components/AllBetsPage";
import Footer from "./Components/Footer";

import { Route, Routes } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [week, setWeek] = useState(null);
  const [showAddBet, setShowAddBet] = useState(false);

  useEffect(() => {
    fetch(
      "https://group-gamble-d231ef097ad5.herokuapp.com/api/check_session"
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://group-gamble-d231ef097ad5.herokuapp.com/api/user/1")
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
      <Routes>
        <Route element={<HomePage week={week} />} path="/" />
        {currentUser.name === "dev" ? (
          <Route
            element={
              <DevBetList
                week={week}
                setWeek={setWeek}
                currentUser={currentUser}
                showAddBet={showAddBet}
                setShowAddBet={setShowAddBet}
                groupAndSort={groupAndSort}
              />
            }
            path="/dev/weekly-bets"
          />
        ) : (
          <Route
            element={
              <UserPage
                week={week}
                currentUser={currentUser}
                setShowAddBet={setShowAddBet}
                showAddBet={showAddBet}
              />
            }
            path={`/${currentUser.name}/weekly-bets`}
          />
        )}
        <Route
          element={<AllBetsPage week={week} groupAndSort={groupAndSort} />}
          path="/all-current-bets"
        />
        <Route
          element={<BetHistory week={week} groupAndSort={groupAndSort} />}
          path="/past-bets"
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
