// KAT - 

import { useState } from 'react';
import './ToggleButton.css';

function ToggleButton({ isChecked, onChange }) {
  const [toggle, setToggle] = useState(isChecked);
  
  const handleClick = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    onChange(newToggle);
  };

  return (
    <div>
      <button className={toggle ? 'button-true' : 'button-false'} onClick={handleClick}>
        {toggle ? '✓' : ''}
      </button>
    </div>
  );
}

export default ToggleButton;
