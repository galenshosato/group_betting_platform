import { useState, useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBarComponents/NavBar";
import HomePage from "./Components/HomePageComponents/HomePage";

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
      <h1>Week {week}</h1>
      <HomePage week={week} />
    </div>
  );
}

export default App;
