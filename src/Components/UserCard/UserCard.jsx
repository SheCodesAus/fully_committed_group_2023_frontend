import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserCard.css";

function UserCard(props) {
    const { user } = props;

    return (

        <>
            <div className="user-card">
                <p>User Name: {user.username}</p>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>User Email: {user.email}</p>
            </div>
        </>
    );
}
    export default UserCard;