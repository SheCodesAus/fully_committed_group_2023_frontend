import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserCard.css";

function UserCard(props) {
    const { user } = props;

    return (

        <>
            <table className="user-card">
                <tbody>
                    <tr>
                        <td className="label"><strong>USER NAME:</strong></td>
                        <td className="input">{user.username}</td>
                    </tr>
                    <tr>
                        <td className="label"><strong>FIRST NAME:</strong></td>
                        <td className="input">{user.first_name}</td>
                    </tr>
                    <tr>
                        <td className="label"><strong>LAST NAME:</strong></td>
                        <td className="input">{user.last_name}</td>
                    </tr>
                    <tr>
                        <td className="label"><strong>USER EMAIL:</strong></td>
                        <td className="input">{user.email}</td>
                    </tr>
                    <tr>
                        <td className="label"><strong>PERMISSIONS:</strong></td>
                        <td className="input">Create/edit: {user.is_superuser ? "✓" : "✗"}</td>
                        <td className="input">Admin Portal: {user.is_staff ? "✓" : "✗"}</td>
                        <td className="input">Active Employee: {user.is_active ? "✓" : "✗"}</td>
                    </tr>
                </tbody>
            </table>
        </>
  );
}
    export default UserCard;