import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

//Pages
import LoginPage from "./Pages/LoginPage.jsx";
import MentorListPage from "./Pages/MentorListPage.jsx";
import MentorProfilePage from "./Pages/MentorProfilePage.jsx";
import MentorCreationPage from "./Pages/MentorCreationPage.jsx";
import ProgramsListPage from "./Pages/ProgramsListPage.jsx";
import ProgramPage from "./Pages/ProgramPage.jsx"
import SessionsPage from "./Pages/SessionsPage.jsx";

//Components
import Nav from "./components/Nav/Nav.jsx";

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
      </div>)
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/mentors", element: <MentorListPage /> },
      { path: "/mentors/:id", element: <MentorProfilePage /> },
      { path: "/mentor-creation", element: <MentorCreationPage /> },
      { path: "/programs", element: <ProgramsListPage /> },
      { path: "/programs/:id", element: <ProgramPage /> },
      { path: "/sessions", element: <SessionsPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

