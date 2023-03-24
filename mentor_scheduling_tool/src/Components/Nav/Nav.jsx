import { Link } from "react-router-dom";

function Nav() {
    return (
    <nav><Link to="/">Home</Link>
    <Link to="/mentor/1">Demo Mentor Profile</Link>
    </nav>);
}

export default Nav;