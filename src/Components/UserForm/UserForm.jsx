import { useState } from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import ProgramName from '../ProgramName/ProgramName.jsx';
import PageContent from  '../PageContent/PageContent.jsx';
import SubmitButton from '../SubmitButton/SubmitButton';
import './UserForm.css';
// import "../UserCard/UserCard.css";

function UserForm() {


    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();

    // ------- HOOKS -------
    const navigate = useNavigate();

    // ------- STATE -------
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_active: true,
        is_staff: false,
        is_superuser: false,
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // ------- USER LIST CHANGE (inc toggle changes using checked) -------

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify(formData),
            });
        
            if (!res.ok) {
            const errorData = await res.json();
            const errors = [];
            
            for (const [key, value] of Object.entries(errorData)) {
                errors.push(`${key} error : ${value}`);
            }
            
            throw new Error(errors.join(", "));
            }
        
            const data = await res.json();
            console.log('Success:', data);
            setSuccessMessage(`User ${formData.username} successfully created`);
            setErrorMessage("");
        } catch (err) {
            console.log(err);
            setErrorMessage(`An error occurred while creating the user: ${err.message}`);
            setSuccessMessage("");
        }
        };
        
    

    return (
        <PageContent>
        <div className='user-form'>
            <form onSubmit={handleSubmit} id='user-form'>

            <div className='table-container'>

            <h1>New User</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && (
            <div className="error-message">
                <pre>{errorMessage}</pre>
            </div>
            )}

                <table id="user-form">

                <tbody>
                    <div className="user-row">
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="username">
                        Username:
                        </label>
                    </td>
                    <td>
                        <input
                        className="user-form-item-description"
                        id="username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        />
                    </td>
                    </tr>
                    </div>
                    <div className="user-row">
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="first_name">
                        First Name:
                        </label>
                    </td>
                    <td>
                        <input
                        className="user-form-item-description"
                        id="first_name"
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        value={formData.first_name}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="last_name">
                        Last Name:
                        </label>
                    </td>
                    <td>
                        <input
                        className="user-form-item-description"
                        id="last_name"
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        value={formData.last_name}
                        />
                    </td>
                    </tr>
                    </div>
                    <div className="user-row">
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="email">
                        Email:
                        </label>
                    </td>
                    <td>
                        <input
                        className="user-form-item-description"
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="password">
                        Password:
                        </label>
                    </td>
                    <td>
                        <input
                        className="user-form-item-description"
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        />
                    </td>
                    </tr>
                    </div>
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="is_active">
                        Active:
                        <input
                        className="user-form-item-description-checkbox"
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        />
                        </label>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="is_superuser">
                        Create/Edit:
                        <input
                        className="user-form-item-description-checkbox"
                        type="checkbox"
                        name="is_superuser"
                        id="is_superuser"
                        checked={formData.is_superuser}
                        onChange={handleChange}
                        />
                        </label>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <label className="user-form-item-label" htmlFor="is_staff">
                        Admin:
                        <input
                        className="user-form-item-description"
                        type="checkbox"
                        name="is_staff"
                        id="is_staff"
                        checked={formData.is_staff}
                        onChange={handleChange}
                        />
                        </label>
                    </td>
                    </tr>
                    <tr>
                    <td>
                    <SubmitButton />
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </form>
        </div>
        </PageContent>
        );
    }

    export default UserForm;
