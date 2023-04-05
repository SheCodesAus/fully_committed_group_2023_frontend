// (KAT) - DONE
// Default character for true is '✓' and for false is '', but you can override this when rendering like this: <ToggleButton isChecked={true} onChange={handleToggleChange} checkedCharacter="A" uncheckedCharacter="B" />


import { useState } from 'react';
import './ToggleButton.css';

function ToggleButton({ isChecked, onChange, checkedCharacter = '✓', uncheckedCharacter = '' }) {
  const [toggle, setToggle] = useState(isChecked);
  
  const handleClick = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    onChange(newToggle);
  };

  return (
    <div>
      <button className={toggle ? 'button-true' : 'button-false'} onClick={handleClick}>
        {toggle ? checkedCharacter : uncheckedCharacter}
      </button>
    </div>
  );
}

export default ToggleButton;

