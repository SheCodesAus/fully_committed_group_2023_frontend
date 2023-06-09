// (KRISTY) - DONE


// function CurrentUserPage() {

//     return "Profile Page Coming soon..."
// }

// export default CurrentUserPage;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ------- COMPONENTS -------
import AdminBlock from "../Components/AdminBlock/AdminBlock";
import UserCard from "../Components/UserCard/UserCard"
import PageContent from  '../Components/PageContent/PageContent.jsx';

import "../Components/CreateButton/CreateButton.css";
//CSS
// import "../App.css";

function CurrentUserPage() {

    // ------- AUTH -------
    const authToken = window.localStorage.getItem("token")

    // ------- STATE -------
    const [user, setUser] = useState({});

    // ------- ACTIONS & EFFECTS -------

    // FETCH (GET) session user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}users/current/`, 
                    {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                    }
                    });
                const data = await response.json();
                window.sessionStorage.setItem("userData", JSON.stringify(data));
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [authToken]);

    // Check if the user is a super-user with edit/create abilities
    const isAdmin = () => {
        return user.is_superuser === true;
    };

    // ------- RENDER -------

    return (
        <PageContent >
        <>
            <div className="page-container">
                <div id="admin-block">
                    {isAdmin() && (
                            <AdminBlock />
                        )}
                </div>
                <div id="user-block">
                    {!isAdmin() && (
                        <>
                            <h1>Welcome back {user.first_name}!</h1>
                            <p>Please contact admin to change your profile details</p>
                        </>
                    )}
                    {!user.id && (
                        <>
                            <h1>Login to view your profile</h1>
                        </>
                    )}
                    <button type="button" className="admin-button password">
                    <Link to="/users/current/change-password" style={{ textDecoration: 'none', color: 'white' }}>Change Password</Link>
                    </button>

                    {/* -- USER DETAILS -- */}
                    {user.id && (
                        <UserCard user={user} />
                    )}
                </div>
            </div>
        </>
        </PageContent>
        );
    }

export default CurrentUserPage;