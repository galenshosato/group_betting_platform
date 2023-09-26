import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
// import ParlayForm from "./ParlayForm";
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
  // const [showParlayForm, setShowParlayForm] = useState(false);
  // const [parlayArr, setParlayArr] = useState([]);
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
    const numericValue = parseInt(rawValue.replace(/[$,]/g, ""), 10);

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
      if (newWeeklyMoney < 0) {
        alert("You don't have enough money to place this bet!");
      } else {
        setUserWeeklyMoney(newWeeklyMoney);

        fetch(
          `https://group-gamble-d231ef097ad5.herokuapp.com/api/${id}/current-weekly-bets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentData),
          }
        )
          .then((resp) => resp.json())
          .then((returnData) => {
            setBetList((prevBetList) => [...prevBetList, returnData]);
            setShowAddBet(false);
          });
      }
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
      if (newFuturesMoney < 0) {
        alert("You don't have enough money to place this bet!");
      } else {
        setUserFuturesMoney(newFuturesMoney);

        fetch(
          `https://group-gamble-d231ef097ad5.herokuapp.com/api/${id}/current-futures-bets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(futureData),
          }
        )
          .then((resp) => resp.json())
          .then((returnData) => {
            setFuturesList((prevBetList) => [...prevBetList, returnData]);
            setShowAddBet(false);
          });
      }
    }
  }

  function handleDevBetSubmit(event) {
    event.preventDefault();
    if (!devUserId) {
      alert("You have not selected a player for this bet");
    } else {
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

        fetch(
          `https://group-gamble-d231ef097ad5.herokuapp.com/api/${devUserId}/current-weekly-bets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentData),
          }
        )
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

        fetch(
          `https://group-gamble-d231ef097ad5.herokuapp.com/api/${devUserId}/current-futures-bets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(futureData),
          }
        ).then((resp) => resp.json());
        setShowAddBet(false);
      }
    }
  }

  // function handleParlay() {
  //   const betData = {
  //     name: newBet,
  //     odds: +newBetOdds,
  //   };
  //   setParlayArr((prevArr) => [...prevArr, betData]);
  //   setShowParlayForm(true);
  // }

  return (
    <>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group
              className="d-flex justify-content-between"
              style={{ paddingBottom: "10px" }}
            >
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Current"
                  value="Current"
                  checked={selectedRadioValue === "Current"}
                  onChange={handleRadioChange}
                  style={{ paddingRight: "10px" }}
                />
                <Form.Check
                  type="radio"
                  label="Future"
                  value="Future"
                  checked={selectedRadioValue === "Future"}
                  onChange={handleRadioChange}
                />
              </div>
              <Button size="sm" onClick={() => setShowAddBet(false)}>
                X
              </Button>
            </Form.Group>
            {currentUser.name === "dev" ? (
              <div style={{ paddingBottom: "10px" }}>
                {" "}
                <DevDropdown setDevUserId={setDevUserId} />
              </div>
            ) : null}
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="New Bet"
                onChange={handleBetChange}
                autoFocus
                style={{ width: "80%" }}
              />
            </Form.Group>
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "5px" }}
            >
              <div className="d-flex justify-content-evenly align-items-center">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Wager"
                    onChange={handleWagerChange}
                    style={{ width: "90%" }}
                  />
                </Form.Group>
                <div className="d-flex" style={{ paddingLeft: "45px" }}>
                  <span style={{ fontSize: "20px", paddingRight: "20px" }}>
                    @
                  </span>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Odds"
                      onChange={handleOddsChange}
                      style={{ width: "60%" }}
                    />
                  </Form.Group>
                </div>
              </div>
              <Button
                onClick={
                  currentUser.name === "dev"
                    ? handleDevBetSubmit
                    : handleBetSubmit
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "12px", marginBottom: "2px" }}>
                  TO WIN ${newWinnings.toLocaleString()}
                </span>
                Submit Bet
              </Button>
            </div>
          </Form>
          {/* <Button onClick={handleParlay}>Parlay</Button> */}
        </Card.Body>
      </Card>
      {/* {showParlayForm ? (
        <ParlayForm
          parlayArr={parlayArr}
          setParlayArr={setParlayArr}
          newBetOdds={newBetOdds}
          setNewBetOdds={setNewBetOdds}
          setNewBet={setNewBet}
        />
      ) : null} */}
    </>
  );
}

export default AddNewBetForm;
