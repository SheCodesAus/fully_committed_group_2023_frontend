// (KRISTY) - DONE

import { Link } from "react-router-dom";

// RENDERED ON CURRENTUSERPAGE.JSX

import "./AdminBlock.css";

function AdminBlock() {


    return (
        <div id="admin-block">
            <h2>Admin Dashboard</h2>
            <p>Create, Edit and Configure content in the She Codes Admin Portal</p>
            <button 
                onClick={() => window.open("create")} 
                className="admin-button">
                Create a user
            </button>
            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/users/customuser/")} 
                className="admin-button">
                View/Edit Users
            </button>
            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/programs/program/")} 
                className="admin-button">
                Edit Programs
            </button>

            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/sess/session/")} 
                className="admin-button">
                Edit Sessions
            </button>

            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/mentors/mentor/")} 
                className="admin-button">
                Edit Mentors
            </button>
        </div>
    );
}

export default AdminBlock;






