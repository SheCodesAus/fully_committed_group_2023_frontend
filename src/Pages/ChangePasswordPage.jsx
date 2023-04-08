    import React, { useState } from 'react';
    import { useNavigate } from "react-router-dom";
    import SubmitButton from '../Components/SubmitButton/SubmitButton';
    import PageContent from '../Components/PageContent/PageContent';
    import "./ChangePasswordPage.css";

    function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const authToken = window.localStorage.getItem("token");
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (authToken) {
        try {
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}users/current/change-password/`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
                }),
            });

            if (!response.ok) {
            throw new Error(await response.text());
            }

            setSuccessMessage('Password changed successfully');
            setErrorMessage('');
            navigate('.');

        } catch (err) {
            setSuccessMessage('');
            setErrorMessage(`Error: ${JSON.parse(err.message).new_password[0]}`);
        }
        } else {
        navigate('/');
        }
    };

    return (
        <PageContent>
        <div>
            <h1>Change Password</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <label>
            Confirm Password:
            <input type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            </label>
            <br />
            <SubmitButton onClick={handleChangePassword}>Change Password</SubmitButton>
        </div>
        </PageContent>
    );
    }

    export default ChangePasswordPage;
