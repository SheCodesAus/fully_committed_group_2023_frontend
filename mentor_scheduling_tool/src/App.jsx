import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//Pages
import HomePage from "./Pages/HomePage";
import MentorListPage from "/src/Pages/MentorListPage.jsx";
import MentorProfilePage from "/src/Pages/MentorProfilePage";
import MentorCreationPage from "/src/Pages/MentorCreationPage";
// import ProgramsListPage from "/src/Pages/ProgramsListPage";

//Components
import Nav from "./components/Nav/Nav";
// import Mentors from "./Components/Mentors/Mentors";

//CSS
import "./App.css";


const HeaderLayout = () => {
  return (
    <div>
      {/* <h1>Mentor Scheduling Tool</h1> */}
      <Nav />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/mentors", element: <MentorListPage /> },
      { path: "/mentors/:id", element: <MentorProfilePage /> },
      { path: "/mentor-creation", element: <MentorCreationPage /> },
      // { path: "/programs", element: <ProgramsListPage /> },
      // { path: "/programs/:id", element: <ProgramPage /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
