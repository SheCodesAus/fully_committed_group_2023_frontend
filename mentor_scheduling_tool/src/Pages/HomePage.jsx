//CSS
import "./HomePage.css";

function HomePage() {
  return (
    <div id="purple_background">
      <div id="white_background">
        <div className="logo">
          <img src="https://shecodes.com.au/wp-content/uploads/2020/02/Purple_no_circle.svg"></img>
        </div>
        <div id="login_form">
          <form action="" method="get" class="login_form">
            <div className="form_field">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              ></input>
            </div>
            <div className="form_field">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              ></input>
            </div>
            <div className="form_field">
              <input type="submit" value="OK"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
