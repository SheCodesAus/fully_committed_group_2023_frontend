import { useState } from 'react';
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import ProgramName from '../ProgramName/ProgramName.jsx';
import PageContent from  '../PageContent/PageContent.jsx';
import SubmitButton from '../SubmitButton/SubmitButton';
import './UserForm.css';

function UserForm() {

    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();

    // ------- HOOKS -------
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    // ------- ACTIONS & EFFECTS -------
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
        }));
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
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Success:', data);
            navigate(`/login/`);
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(response));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" onChange={handleChange} value={formData.username} />
            </label>
            <label>
                First Name:
                <input type="text" name="first_name" onChange={handleChange} value={formData.first_name} />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" onChange={handleChange} value={formData.last_name} />
            </label>
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange} value={formData.email} />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={handleChange} value={formData.password} />
            </label>
            <button type="submit">Create User</button>
        </form>
    );
}

export default UserForm;
