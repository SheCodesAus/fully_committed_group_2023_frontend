// (KRISTY)


import React, { useState } from 'react';

import SubmitButton from '../Components/SubmitButton/SubmitButton';
import PageContent from '../Components/PageContent/PageContent';
import "./ChangePasswordPage.css";

function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")

    const handleChangePassword = () => {
        fetch('/api/change-password/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${authToken}`,
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
        })
        })
        .then(response => {
        if (response.ok) {
            alert('Password changed successfully!');
        } else {
            alert('Failed to change password');
        }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <PageContent>
        <div>
        <h1>Change Password</h1>
        <label>
            Old Password:
            <input type="password" 
                value={oldPassword} 
                onChange={(event) => setOldPassword(event.target.value)} 
            />
        </label>
        <br />
        <label>
            New Password:
            <input type="password" 
                value={newPassword} 
                onChange={(event) => setNewPassword(event.target.value)} 
            />
        </label>
        <br />
        <SubmitButton onClick={handleChangePassword}>Change Password</SubmitButton>
        </div>
        </PageContent>
    );
    }

export default ChangePasswordPage;
