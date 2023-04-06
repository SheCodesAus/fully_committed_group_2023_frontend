// (CLAIRE & WEN) - DONE


import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";
import "./SubmitButton.css";

import React from 'react';

function SubmitButton({onClick}) {
  return (
    <button className="submit-button" onClick={onClick}>
      Submit
    </button>
  );
}

export default SubmitButton;
