import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function AddNewBetForm() {
  const [selectedRadioValue, setSelectedRadioValue] = useState("Current");

  function handleRadioChange(event) {
    setSelectedRadioValue(event.target.value);
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
              <Form.Control type="text" placeholder="New Bet" autoFocus />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Odds" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Wager" />
            </Form.Group>
          </Form>
          <Button>Parlay</Button>
        </Card.Body>
      </Card>
      <Button>Submit Bet</Button>
    </>
  );
}

export default AddNewBetForm;
