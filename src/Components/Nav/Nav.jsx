import { Link } from "react-router-dom";

import "./Nav.css"

function Nav(props) {
    // ------- AUTH -------
    const { loggedIn, setLoggedIn } = props

      // ------- ACTIONS & EFFECTS -------

      const handleClick = () => {
        window.localStorage.removeItem("token");
        window.sessionStorage.removeItem("userData");
        setLoggedIn(false);

    }

  return (
    <nav>
      {/* <div className="logo" >
        <img src="https://shecodes.com.au/wp-content/uploads/2020/02/Purple_no_circle.svg"/>
      </div> */}

      <div className="nav-links">
        {!loggedIn && (
          <Link to="/login">LOGIN</Link>
        )}
        {loggedIn && (
            <Link to="#" onClick={handleClick}>
            LOGOUT
            </Link>
            // <button id="logout-button" onClick={handleClick}>
            // Log Out
            // </button>
        )}
        <Link to="/programs">PROGRAMS</Link>
        <Link to="/sessions">SESSIONS</Link>
        <Link to="/mentors">MENTORS</Link>
        <Link to="/users/current">PROFILE</Link>
        {/* <Link to="/mentors/1">Mentor 1 | </Link> */}
        {/* <Link to="/mentors/2">Mentor 2 |</Link> */}
        {/* <Link to="/mentor-creation">Create Mentor |</Link> */}

      </div>

    </nav>
  );
}

export default Nav;

