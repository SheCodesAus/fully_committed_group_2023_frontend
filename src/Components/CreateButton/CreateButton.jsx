import "./CreateButton.css";
import React from 'react';

function CreateButton(props) {

  return (
    <button className="create-button">
      Create
   </button>
  );
}


export function ShowAllButton({ children, onClick }) {

  return (
    <button className="show-all-button" onClick={onClick}>
    { children } 
    </button>
  );
}


export default CreateButton;
