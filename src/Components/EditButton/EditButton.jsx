import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";
import "./EditButton.css";

import React from 'react';

function EditButton(props) {
  const handleClick = () => {
    // Perform edit action here
    console.log('Edit button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Edit
   </button>  {/* <button class="edit-button">Edit</button> */}
  );
}

export default EditButton;
