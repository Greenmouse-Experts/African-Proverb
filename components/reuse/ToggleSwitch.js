import React, { useState } from "react";
import ToggleSwtich from "@/styles/ToggleSwitch.module.scss";
const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div onClick={toggleButton}>
      <input type="checkbox" id="switch" className={ToggleSwtich["checkbox"]} />

      <label for="switch" className={ToggleSwtich["toggle"]}>
        <p className={ToggleSwtich["para"]}>
          <span>on</span>
          <span>off</span>
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
