import { Link } from "react-router-dom";

import "./Nav.css"

function Nav() {
  return (
    <nav>
      {/* <div className="logo" >
        <img src="https://shecodes.com.au/wp-content/uploads/2020/02/Purple_no_circle.svg"/>
      </div> */}

      <div className="nav-links">
        <Link to="/login">LOGIN</Link>
        <Link to="/programs">PROGRAMS</Link>
        <Link to="/sessions">SESSIONS</Link>
        <Link to="/mentors">MENTORS</Link>
        {/* <Link to="/mentors/1">Mentor 1 | </Link> */}
        {/* <Link to="/mentors/2">Mentor 2 |</Link> */}
        {/* <Link to="/mentor-creation">Create Mentor |</Link> */}
      </div>

    </nav>
  );
}

export default Nav;

