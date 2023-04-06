

import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";
import "./CreateButton.css";

import React from 'react';

function CreateButton(props) {
  const handleClick = () => {
    // Perform edit action here
    console.log('Create button clicked!');
  };

  return (
    <button className="create-button"onClick={handleClick}>
      Create
   </button>
  );
}

export default CreateButton;
