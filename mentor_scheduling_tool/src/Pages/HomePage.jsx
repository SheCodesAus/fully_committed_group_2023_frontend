//CSS
import "./HomePage.css";
import LoginForm from "../Components/LoginForm/LoginForm";
function HomePage() {
  return (
    <div id="purple_background">
      <div id="white_background">
        <div className="logo">
          <img src="https://shecodes.com.au/wp-content/uploads/2020/02/Purple_no_circle.svg"></img>
        </div>
        <div id="login_form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
