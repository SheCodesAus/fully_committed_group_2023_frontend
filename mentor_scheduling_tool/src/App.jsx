import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//Pages
import HomePage from "./Pages/HomePage";
import MentorProfilePage from "./Pages/MentorProfilePage";
import AllMentorsPage from "./Pages/AllMentorsPage";
import ProgramPage from "./Pages/ProgramPage";
import AllProgramsPage from "./Pages/AllProgramsPage"

//Components
import Nav from "./components/Nav/Nav";

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
      { path: "/mentors", element: <AllMentorsPage /> },
      { path: "/mentors/:id", element: <MentorProfilePage /> },
      { path: "/programs", element: <AllProgramsPage />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
