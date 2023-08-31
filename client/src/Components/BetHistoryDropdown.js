import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
function BetHistoryDropdown({ week }) {
  const [pastSelectedOption, setPastSelectedOption] = useState(
    `Week ${week - 1}`
  );

  const dropDownObject = { 1: "Week 1" };
  if (!dropDownObject[week - 1]) {
    dropDownObject[week - 1] = `Week ${week - 1}`;
  }

  const dropDownArray = Object.entries(dropDownObject);

  function handlePastBetOption(value) {
    setPastSelectedOption(value);
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle>{pastSelectedOption}</Dropdown.Toggle>
        <Dropdown.Menu>
          {/* {dropDownArray.map(([newWeek, weekValue]) => {
            return (
              <Dropdown.Item
                key={newWeek}
                onClick={handlePastBetOption(weekValue)}
              >
                {weekValue}
              </Dropdown.Item>
            );
          })} */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
export default BetHistoryDropdown;
