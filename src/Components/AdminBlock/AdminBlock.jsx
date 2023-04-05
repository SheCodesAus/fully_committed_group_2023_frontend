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
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin")} 
                className="admin-button">
                Database
            </button>
            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/users/customuser/")} 
                className="admin-button">
                Users
            </button>
            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/programs/program/")} 
                className="admin-button">
                Programs
            </button>

            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/sess/session/")} 
                className="admin-button">
                Sessions
            </button>

            <button 
                onClick={() => window.open("https://fully-committed-mentor-scheduling-tool.fly.dev/admin/mentors/mentor/")} 
                className="admin-button">
                Mentors
            </button>
        </div>
    );
}

export default AdminBlock;






