import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//Pages
import HomePage from "./Pages/HomePage"; 
import MentorProfilePage from "./Pages/MentorProfilePage";

//Components
import Nav from "./components/Nav/Nav"

//CSS
import './App.css'

const HeaderLayout = () => {
  
    return (
      <div>
      <h1>Mentor Scheduling Tool</h1>
      <Nav /> 
      <Outlet />
      </div>
      )
}
  
const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage />},
      { path: "/mentors/:id", element: <MentorProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
