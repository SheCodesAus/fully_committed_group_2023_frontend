// function CurrentUserPage() {

//     return "Profile Page Coming soon..."
// }

// export default CurrentUserPage;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ------- COMPONENTS -------
import AdminBlock from "../Components/AdminBlock/AdminBlock";

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

    // Check if the user is a super-user
    const isAdmin = () => {
        return user.is_superuser === true;
    };

    // ------- RENDER -------

    return (
            <div>
                {isAdmin() && (
                    <>
                        {/* -- ADMIN BLOCK -- */}
                        <AdminBlock />
                        <Link to="X" className="button-link">
                Edit</Link>
                    </>
                    )}
                <div id="user-block">
                    {user.id > 1 && !isAdmin() && (
                        <>
                        <h1>Welcome back {user.username}!</h1>
                        <Link to="X" className="button-link">
                Edit</Link>
                        </>
                    )}
                    {!user.id && (
                        <>
                        <h1>Login to view your profile</h1>
                        </>
                    )}
                {/* -- USER DETAILS -- */}
                {user.id && (
                    <>
                        <p>First Name: {user.first_name}</p>
                        <p>Last Name: {user.last_name}</p>
                        <p>User Email: {user.email}</p>
                    </>
                )}
                </div>
            </div>
        );
    }

export default CurrentUserPage;