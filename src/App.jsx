import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import { useState } from "react";

// Pages
import LoginPage from "./Pages/LoginPage.jsx";
import MentorDetailPage from "./Pages/MentorDetailPage.jsx";
import MentorListPage from "./Pages/MentorListPage.jsx";
import ProgramDetailPage from "./Pages/ProgramDetailPage.jsx"
import ProgramListPage from "./Pages/ProgramListPage.jsx";
import SessionDetailPage from "./Pages/SessionDetailPage.jsx";
import SessionListPage from "./Pages/SessionListPage.jsx";
import CurrentUserPage from "./Pages/CurrentUserPage.jsx";

// Components
import Footer from "./Components/Footer/Footer.jsx";
import Nav from "./Components/Nav/Nav.jsx";

//CSS
import "./App.css";


const HeaderLayout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") !== null);
    return (
      <div>
        <div className="header-container">
          <img src="/src/Images/Purple_no_circle.svg" className="logo" />
          <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </div>
        <Outlet context={[loggedIn, setLoggedIn]} />
        <Footer />
      </div>)
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <div><h1>Home</h1></div>},
      { path: "/login", element: <LoginPage /> },
      { path: "/mentors", element: <MentorListPage /> },
      { path: "/mentors/:id", element: <MentorDetailPage /> },
      { path: "/programs", element: <ProgramListPage /> },
      { path: "/programs/:id", element: <ProgramDetailPage /> },
      { path: "/sessions/:id", element: <SessionDetailPage />},
      { path: "/sessions", element: <SessionListPage />}, 
      { path: "/users/current", element: <CurrentUserPage /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

