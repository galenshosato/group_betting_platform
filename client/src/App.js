import { useState, useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

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
    </div>
  );
}

export default App;
