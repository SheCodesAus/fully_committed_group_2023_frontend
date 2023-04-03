import { Link } from "react-router-dom";

// RENDERED ON CURRENTUSERPAGE.JSX

function AdminBlock() {


    return (
        <div id="admin-block">
            <h2>Admin Dashboard</h2>
            <p>Configure your content in the admin portal</p>
            <Link 
            target="_blank" 
            to="https://fully-committed-mentor-scheduling-tool.fly.dev/admin" className="button">
                Database
            </Link> 
            <Link 
            target="_blank" 
            to="https://fully-committed-mentor-scheduling-tool.fly.dev/admin/users/customuser/" className="button">
                Users
            </Link> 
            <Link 
            target="_blank" 
            to="https://fully-committed-mentor-scheduling-tool.fly.dev/admin/programs/program/" className="button">
                Programs
            </Link> 
            <Link 
            target="_blank" 
            to="https://fully-committed-mentor-scheduling-tool.fly.dev/admin/sess/session/" className="button">
                Sessions
            </Link> 
            <Link 
            target="_blank" 
            to="https://fully-committed-mentor-scheduling-tool.fly.dev/admin/mentors/mentor/" className="button">
                Mentors
            </Link> 
        </div>
    );
}

export default AdminBlock;






