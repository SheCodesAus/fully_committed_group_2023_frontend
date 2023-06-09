// (KAT & KRISTY & WEN) - DONE 

// (WEN) - To do - implement login logic to disappear nav bar links if not logged in

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
    window.location.reload();

  }

  return (
    <nav>
        <img className="logo" src="/purple.svg" />

      <div className="nav-links">
        {/* {!loggedIn && (
          <Link to="/login">LOGIN</Link>
        )} */}
        {loggedIn && <>

          {/* <button id="logout-button" onClick={handleClick}>
              Log Out
            </button> */}
          <Link to="/programs" className="button-link">PROGRAMS</Link>
          <Link to="/sessions" className="button-link">SESSIONS</Link>
          <Link to="/mentors" className="button-link">MENTORS</Link>
          <Link to="/users/current" className="button-link">PROFILE</Link>
          <Link to="#" onClick={handleClick} className="button-link">
            LOGOUT
          </Link>
        </>
        }
        {/* <Link to="/mentors/1">Mentor 1 | </Link> */}
        {/* <Link to="/mentors/2">Mentor 2 |</Link> */}
        {/* <Link to="/mentor-creation">Create Mentor |</Link> */}

      </div>

    </nav>
  );
}

export default Nav;

