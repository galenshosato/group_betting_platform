import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import ParlayForm from "./ParlayForm";
import DevDropdown from "../DevTools/DevDropdown";

function AddNewBetForm({
  setBetList,
  week,
  id,
  weekly_money,
  futures_money,
  setUserWeeklyMoney,
  setUserFuturesMoney,
  setShowAddBet,
  setFuturesList,
  setWeeklyBetList,
  currentUser,
}) {
  const [selectedRadioValue, setSelectedRadioValue] = useState("Current");
  const [newBet, setNewBet] = useState(null);
  const [newBetOdds, setNewBetOdds] = useState(0);
  const [newWager, setNewWager] = useState(0);
  const [newWinnings, setNewWinnings] = useState(0);
  const [showParlayForm, setShowParlayForm] = useState(false);
  const [parlayArr, setParlayArr] = useState([]);
  const [devUserId, setDevUserId] = useState(null);

  useEffect(() => {
    if (newBetOdds !== 0 && newWager > 0) {
      if (+newBetOdds > 0) {
        setNewWinnings(Math.round(+newWager * (newBetOdds / 100)));
      } else {
        setNewWinnings(Math.round((+newWager * 100) / -newBetOdds));
      }
    } else {
      setNewWinnings(0);
    }
  }, [newBetOdds, newWager]);

  function handleRadioChange(event) {
    setSelectedRadioValue(event.target.value);
  }

  function handleBetChange(event) {
    setNewBet(event.target.value);
  }

  function handleOddsChange(event) {
    setNewBetOdds(event.target.value);
  }

  function handleWagerChange(event) {
    const rawValue = event.target.value;
    const numericValue = parseInt(rawValue.replace(/,/g, ""), 10);

    setNewWager(isNaN(numericValue) ? 0 : numericValue);
  }

  function handleBetSubmit(event) {
    event.preventDefault();
    if (selectedRadioValue === "Current") {
      const currentData = {
        amount: +newWager,
        bet_name: newBet,
        bet_type: "weekly",
        odds: newBetOdds,
        user_id: id,
        week: week,
        winnings: newWinnings,
      };

      let newWeeklyMoney = weekly_money - +newWager;
      setUserWeeklyMoney(newWeeklyMoney);

      fetch(`/api/${id}/current-weekly-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      })
        .then((resp) => resp.json())
        .then((returnData) => {
          setBetList((prevBetList) => [...prevBetList, returnData]);
          setShowAddBet(false);
        });
    } else {
      const futureData = {
        amount: +newWager,
        bet_name: newBet,
        bet_type: "futures",
        odds: newBetOdds,
        user_id: id,
        week: week,
        winnings: newWinnings,
      };

      let newFuturesMoney = futures_money - +newWager;
      setUserFuturesMoney(newFuturesMoney);

      fetch(`/api/${id}/current-futures-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(futureData),
      })
        .then((resp) => resp.json())
        .then((returnData) => {
          setFuturesList((prevBetList) => [...prevBetList, returnData]);
          setShowAddBet(false);
        });
    }
  }

  function handleDevBetSubmit(event) {
    event.preventDefault();

    if (selectedRadioValue === "Current") {
      const currentData = {
        amount: +newWager,
        bet_name: newBet,
        bet_type: "weekly",
        odds: newBetOdds,
        user_id: devUserId,
        week: week,
        winnings: newWinnings,
      };

      fetch(`/api/${devUserId}/current-weekly-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      })
        .then((resp) => resp.json())
        .then((returnData) => {
          setWeeklyBetList((prevBetList) => [...prevBetList, returnData]);
          setShowAddBet(false);
        });
    } else {
      const futureData = {
        amount: +newWager,
        bet_name: newBet,
        bet_type: "futures",
        odds: newBetOdds,
        user_id: devUserId,
        week: week,
        winnings: newWinnings,
      };

      fetch(`/api/${devUserId}/current-futures-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(futureData),
      }).then((resp) => resp.json());
      setShowAddBet(false);
    }
  }

  function handleParlay() {
    const betData = {
      name: newBet,
      odds: +newBetOdds,
    };
    setParlayArr((prevArr) => [...prevArr, betData]);
    setShowParlayForm(true);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Button onClick={() => setShowAddBet(false)}>X</Button>
          {currentUser.name === "dev" ? (
            <DevDropdown setDevUserId={setDevUserId} />
          ) : null}
          <Form>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Current"
                value="Current"
                checked={selectedRadioValue === "Current"}
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Future"
                value="Future"
                checked={selectedRadioValue === "Future"}
                onChange={handleRadioChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="New Bet"
                onChange={handleBetChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Odds"
                onChange={handleOddsChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Wager"
                onChange={handleWagerChange}
              />
            </Form.Group>
          </Form>
          <Button onClick={handleParlay}>Parlay</Button>
        </Card.Body>
      </Card>
      {showParlayForm ? (
        <ParlayForm
          parlayArr={parlayArr}
          setParlayArr={setParlayArr}
          newBetOdds={newBetOdds}
          setNewBetOdds={setNewBetOdds}
          setNewBet={setNewBet}
        />
      ) : null}
      <Button
        onClick={
          currentUser.name === "dev" ? handleDevBetSubmit : handleBetSubmit
        }
      >
        <span>TO WIN ${newWinnings.toLocaleString()}</span>||Submit Bet
      </Button>
    </>
  );
}

export default AddNewBetForm;
