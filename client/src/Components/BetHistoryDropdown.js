import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
function BetHistoryDropdown({ week, dropDownArray, setPastBetList }) {
  const [pastSelectedOption, setPastSelectedOption] = useState(
    week > 1 ? `Week ${week - 1}` : "Week 1"
  );

  function handlePastBetOption(value) {
    setPastSelectedOption(value);

    fetch(`/api/${value.split(" ")[1]}/get-past-bets`)
      .then((resp) => resp.json())
      .then((data) => setPastBetList(data));
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="custom-btn">
          {pastSelectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropDownArray.map(([newWeek, weekValue]) => {
            return (
              <Dropdown.Item
                key={newWeek}
                onClick={() => handlePastBetOption(weekValue)}
              >
                {weekValue}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
export default BetHistoryDropdown;
