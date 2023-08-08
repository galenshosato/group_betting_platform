import { useState, useEffect } from 'react'
import './App.css';
import Header from './Components/Header';
import NavBar from './Components/NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    fetch('/api/check_session')
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then((user) => setCurrentUser(user))
      }
    })
  }, [])


  return (
    <div>
      <Header />
      <br></br>
      <NavBar currentUser = {currentUser} setCurrentUser = {setCurrentUser} />
    </div>
  );
}

export default App;
