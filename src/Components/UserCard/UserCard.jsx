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

                        <td className="user-item-label"><strong>Username</strong></td>
                        <td className="user-item-description">{user.username}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>First Name</strong></td>
                        <td className="user-item-description">{user.first_name}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>Last Name</strong></td>
                        <td className="user-item-description">{user.last_name}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>Email</strong></td>
                        <td className="user-item-description">{user.email}</td>
                    </tr>
                    <tr>
                        <td className="user-item-label"><strong>Permissions</strong></td>
                        <td className="user-item-description">Create/edit: {user.is_superuser ? "✓" : "✗"}</td>
                    </tr>

                    <tr>
                    <td><button type="button" className="create-button">
                    <Link to="/users/current/change-password" style={{ textDecoration: 'none', color: 'white' }}>Change Password</Link>
                    </button></td>
                        <td className="user-item-description">Admin portal: {user.is_staff ? "✓" : "✗"}</td>
                    </tr>
                    <tr>
                    <td></td>
                        <td className="user-item-description">Active Employee: {user.is_active ? "✓" : "✗"}</td>
                    </tr>

                </tbody>

            </table>
        </>
  );
}
    export default UserCard;