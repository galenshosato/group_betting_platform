import { useState, useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBarComponents/NavBar";
import HomePage from "./Components/HomePageComponents/HomePage";
import UserPage from "./Components/UserPageComponents/UserPage";
import DevBetList from "./Components/DevTools/DevBetList";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [week, setWeek] = useState(1);

  useEffect(() => {
    fetch("/api/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

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
      {/* <UserPage week={week} currentUser={currentUser} /> */}
      <DevBetList week={week} setWeek={setWeek} currentUser={currentUser} />
    </div>
  );
}

export default App;
