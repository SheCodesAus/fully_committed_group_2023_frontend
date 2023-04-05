// (KRISTY) - DONE

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserCard.css";

function UserCard(props) {
    const { user } = props;

    return (

        <>
            <table id="user-card">
                <tbody>
                    <tr>
                        <td className="user-item-label"><strong>USER NAME:</strong></td>
                        <td className="user-item-description">{user.username}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>FIRST NAME:</strong></td>
                        <td className="user-item-description">{user.first_name}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>LAST NAME:</strong></td>
                        <td className="user-item-description">{user.last_name}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>USER EMAIL:</strong></td>
                        <td className="user-item-description">{user.email}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>PERMISSIONS:</strong></td>
                        <td className="user-item-description">Create/edit: {user.is_superuser ? "✓" : "✗"}</td>
                        <td className="user-item-description">Admin Portal: {user.is_staff ? "✓" : "✗"}</td>
                        <td className="user-item-description">Active Employee: {user.is_active ? "✓" : "✗"}</td>
                    </tr>
                </tbody>
            </table>
        </>
  );
}
    export default UserCard;