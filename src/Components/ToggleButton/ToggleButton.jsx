import { useState } from 'react';

import "./ToggleButton.css";

function ToggleButton() {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };

  if (toggle === true) {
    return (
      <div>
        <button className='button-true' onClick={handleClick}>✓</button>
      </div>
    );
  } else {
    return (
      <div>
        <button className='button-false' onClick={handleClick}>✕</button>
      </div>
    );
  }
}

export default ToggleButton;
