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
                        <td colSpan="3" className="permissions">
                            Create/edit: {user.is_superuser ? "✓" : "✗"}
                        </td>
                    </tr>
                    <tr>
                        <td className="user-item-label"></td>
                        <td colSpan="3" className="permissions">
                            Admin portal: {user.is_staff ? "✓" : "✗"} 
                        </td>
                    </tr>
                    <tr>
                        <td className="user-item-label"></td>
                        <td colSpan="3" className="permissions">
                            Active Employee: {user.is_active ? "✓" : "✗"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default UserCard;