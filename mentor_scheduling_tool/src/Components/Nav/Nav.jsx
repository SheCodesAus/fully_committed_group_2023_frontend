import { Link } from "react-router-dom";

function Nav() {
    return (
    <nav>
    <Link to="/">Home | </Link>
    <Link to="/mentors">All Mentors | </Link>
    <Link to="/mentors/1">Mentor 1 | </Link>
    <Link to="/mentors/2">Mentor 2 |</Link>
    <Link to="/programs">Programs</Link>
    </nav>);
}

export default Nav;