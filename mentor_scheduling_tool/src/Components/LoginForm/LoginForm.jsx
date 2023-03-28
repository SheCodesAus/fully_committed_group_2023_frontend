import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";

function LoginForm({redirectURL = "/"}) {
  const [loggedIn, setLoggedIn] = useOutletContext();
 
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}api-token-auth/`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );
    return response.json();
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
        const { token } = await postData();
            window.localStorage.setItem("token", token);
            setLoggedIn(true)
            return navigate("/programs");
    }
     else {
            setLoggedIn(false)
            return navigate("/");
        }
      }
  return (
    
    <form action="" method="get" className="login_form" onSubmit={handleSubmit}>
    <div className="form_field">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        required
        onChange={handleChange}
      ></input>
    </div>
    <div className="form_field">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        onChange={handleChange}
      ></input>
    </div>
    <div className="form_field">
      <input type="submit" value="OK"></input>
    </div>
  </form>
  );
}

export default LoginForm;
