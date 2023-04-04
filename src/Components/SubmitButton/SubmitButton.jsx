// CLAIRE - 

import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";
import "./SubmitButton.css";

import React from 'react';

function SubmitButton(props) {
  const handleClick = () => {
    // Perform submit action here
    console.log('Submit button clicked!');
  };

  return (
    <button className="submit-button"onClick={handleClick}>
      Submit
    </button>
  );
}

export default SubmitButton;
