import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function DevDropdown({ setDevUserId }) {
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const names = {
    1: "Test",
    2: "Galen",
    3: "Chris",
    4: "Grant",
    5: "Morgan",
    6: "Ethan",
    7: "Spear",
  };

  function findKeyByValue(object, value) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return key;
      }
    }
    return null;
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
    setDevUserId(findKeyByValue(names, option));
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="secondary">{selectedOption}</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleOptionSelect("Galen")}>
            Galen
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptionSelect("Chris")}>
            Chris
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptionSelect("Grant")}>
            Grant
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptionSelect("Morgan")}>
            Morgan
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptionSelect("Ethan")}>
            Ethan
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOptionSelect("Alex")}>
            Alex
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DevDropdown;
