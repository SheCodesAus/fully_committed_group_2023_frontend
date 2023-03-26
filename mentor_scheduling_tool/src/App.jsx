import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//Pages
import HomePage from "./Pages/HomePage";
import MentorProfilePage from "./Pages/MentorProfilePage";

//Components
import Nav from "./components/Nav/Nav";

//CSS
import "./App.css";
import MentorListPage from "./Pages/MentorListPage";
import MentorCreationPage from "./Pages/MentorCreationPage";

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
      { path: "/programs", element: <ProgramListPage /> },
      { path: "/programs/:id", element: <ProgramPage /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
