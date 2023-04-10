    // (KAT) - DONE
    // Kristy edited: 
    // to prevent immediate submission of form with toggle change
    // to consolidate multiple toggle commands into on handleChange command


    // import { useState } from 'react';
    import './ToggleButton.css';

    function ToggleButton2({ isChecked, onChange }) {
        return (
        <div>
            <button className={`button-${isChecked ? 'true' : 'false'}`} type="button" aria-label="Toggle" onClick={()=> onChange(!isChecked)}>
            {isChecked ? "✓" : ""}
            </button>
        </div>
        );
    }

    // function ToggleButton2({ isChecked, onChange }) {
    //     const [toggle, setToggle] = useState(isChecked);
        
    //     const handleClick = () => {
    //     const newToggle = !toggle;
    //     setToggle(newToggle);
    //     onChange(newToggle);
    //     };
    
    //     return (
    //     <div>
    //         <button className={`button-${toggle ? 'true' : 'false'}`} type="button" aria-label="Toggle" onClick={handleClick}>
    //         {isChecked ? "✓" : ""}
    //         </button>
    //     </div>
    //     );
    // }
    
    export default ToggleButton2;
    