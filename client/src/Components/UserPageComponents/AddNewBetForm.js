import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function AddNewBetForm({ betList, setBetList, week, id }) {
  const [selectedRadioValue, setSelectedRadioValue] = useState("Current");
  const [newBet, setNewBet] = useState(null);
  const [newBetOdds, setNewBetOdds] = useState(0);
  const [newWager, setNewWager] = useState(0);
  const [newWinnings, setNewWinnings] = useState(0);

  useEffect(() => {
    if (newBetOdds !== 0 && newWager > 0) {
      if (+newBetOdds > 0) {
        setNewWinnings(+newWager * (newBetOdds / 100));
      } else {
        setNewWinnings((+newWager * 100) / -newBetOdds);
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
    setNewWager(event.target.value);
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

      fetch(`/api/${id}/current-weekly-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      })
        .then((resp) => resp.json())
        .then((returnData) =>
          setBetList((prevBetList) => [...prevBetList, returnData])
        );
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

      fetch(`/api/${id}/current-futures-bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(futureData),
      })
        .then((resp) => resp.json())
        .then((returnData) =>
          setBetList((prevBetList) => [...prevBetList, returnData])
        );
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
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
          <Button>Parlay</Button>
        </Card.Body>
      </Card>
      <Button onClick={handleBetSubmit}>
        <span>TO WIN ${newWinnings}</span>||Submit Bet
      </Button>
    </>
  );
}

export default AddNewBetForm;
