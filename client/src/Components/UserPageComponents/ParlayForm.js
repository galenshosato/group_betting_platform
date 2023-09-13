import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function ParlayForm({
  parlayArr,
  newBetOdds,
  setParlayArr,
  setNewBetOdds,
  setNewBet,
}) {
  const [parlayName, setParlayName] = useState("");
  const [parlayOdds, setParlayOdds] = useState("");

  function handleNameChange(event) {
    setParlayName(event.target.value);
  }

  function handleOddsChange(event) {
    setParlayOdds(event.target.value);
  }

  function americanToDecimalOdds(amOdds) {
    let decOdds;
    if (amOdds < 0) {
      decOdds = 100 / Math.abs(amOdds) + 1;
    } else {
      decOdds = Math.abs(amOdds) / 100 + 1;
    }
    return decOdds;
  }

  function decimalToAmericanOdds(decOdds) {
    let amOdds;
    let tempOdds = parseFloat(decOdds);
    if (1.01 <= tempOdds && tempOdds <= 1.99) {
      amOdds = -100 / (tempOdds - 1);
    } else {
      console.log("in Else");
      amOdds = (tempOdds - 1) * 100;
      console.log(amOdds);
    }
    return amOdds;
  }

  function handleParlay() {
    let decimalOdds = americanToDecimalOdds(parlayOdds);
    for (const bet of parlayArr) {
      let tempOdds = americanToDecimalOdds(bet.odds);
      decimalOdds = decimalOdds * tempOdds;
    }
    let pOdds = decimalToAmericanOdds(decimalOdds);
    setNewBetOdds(pOdds);

    setNewBet((prev) => prev + ", " + parlayName);

    const betData = {
      name: parlayName,
      odds: +parlayOdds,
    };
    setParlayArr((prevArr) => [...prevArr, betData]);
    setParlayName("");
    setParlayOdds("");
  }

  return (
    <>
      <Card>
        <Card.Body>
          {parlayArr.map((bet, index) => {
            return (
              <div key={index} className="parlay">
                <h2>{bet.name}</h2> <h2>{bet.odds}</h2> <button>Delete</button>
              </div>
            );
          })}
          <h3>Current Odds: {newBetOdds}</h3>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Add Bet"
                value={parlayName}
                onChange={handleNameChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Odds"
                value={parlayOdds}
                onChange={handleOddsChange}
              />
            </Form.Group>
          </Form>
          <Button onClick={handleParlay}>Parlay</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ParlayForm;
