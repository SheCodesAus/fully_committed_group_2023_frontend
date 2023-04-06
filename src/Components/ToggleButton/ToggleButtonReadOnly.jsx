import { useState } from "react";
import "./ToggleButton.css";

function ToggleButtonReadOnly({ value, onChange, readOnly, className }) {
  const [toggle, setToggle] = useState(value);
  const [currentIsChecked, setCurrentIsChecked] = useState(value);

  const handleClick = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    setCurrentIsChecked(newToggle);
    onChange(newToggle);
  };

  return (
    <div>
      <button
        className={`button ${currentIsChecked ? "button-true" : "button-false"} ${className}`}
        type="button"
        aria-label="Toggle"
        onClick={handleClick}
        disabled={readOnly}
      >
        {value ? "✓" : ""}
      </button>
    </div>
  );
}

export default ToggleButtonReadOnly;
