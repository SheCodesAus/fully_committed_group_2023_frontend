import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

//Pages
import HomePage from "./Pages/HomePage";
import MentorListPage from "/src/Pages/MentorListPage.jsx";
import MentorProfilePage from "/src/Pages/MentorProfilePage";
import MentorCreationPage from "/src/Pages/MentorCreationPage";
import ProgramsListPage from "/src/Pages/ProgramsListPage";

//Components
import Nav from "./components/Nav/Nav";
// import Mentors from "./Components/Mentors/Mentors";

//CSS
import "./App.css";


const HeaderLayout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") !== null);
    return (
      <div>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {/* need to tell the nav that it has these props/give that state to the nav */}
      <Outlet context={[loggedIn, setLoggedIn]} />
      {/* value of context is loggedIn & setLoggedIn, anything using this outlet has access to the value of logged in and the set logged in function. We access this via useOutletContext. Now any children elements are able to use the outletContext */}
      </div>)
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/mentors", element: <MentorListPage /> },
      { path: "/mentors/:id", element: <MentorProfilePage /> },
      { path: "/mentor-creation", element: <MentorCreationPage /> },
      { path: "/programs", element: <ProgramsListPage /> },
      // { path: "/programs/:id", element: <ProgramPage /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

