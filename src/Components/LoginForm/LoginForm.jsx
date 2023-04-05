// (SAM & KAT) - DONE

import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";
import "./LoginForm.css";


function LoginForm({redirectURL = "/programs"}) {
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

  const postData = async() => {
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

const handleSubmit = async(event) => {
  event.preventDefault();
  if (credentials.username && credentials.password) {
      const { token } = await postData();
      if(token !== undefined) {
          window.localStorage.setItem("token", token);
          setLoggedIn(true);
          navigate(redirectURL);

      } else {
          setLoggedIn(false);
          const response = await postData();
          alert(JSON.stringify(response));
      }
  }
};
  return (
    <div id="purple_background">
      <div id="white_background">
        <div className="logo">
          <img src="https://shecodes.com.au/wp-content/uploads/2020/02/Purple_no_circle.svg"></img>
        </div>
          <div id="login_form"></div>
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
                <div className="button">
                  <button value="OK">OK</button>
                </div>
            </form>
          </div>
      </div>
  );
}

export default LoginForm;
