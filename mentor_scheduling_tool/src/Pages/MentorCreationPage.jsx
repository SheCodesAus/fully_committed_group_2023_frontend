//CSS
import "./MentorCreationPage.css";

function MentorCreationPage() {
  return (
    <div id="white_background">
      <form id="mentor_creation_form">
        <div id="personal_details">
          {/* <input id="first_name"></input> */}
          <label for="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name" required></input>
          <label for="last_name">Last Name</label>
          <input type="text" name="last_name" id="last_name" required></input>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required></input>
        </div>
        <label for="skills">Skills:</label>

        <select name="skills" id="skills">
          <option value="htmlcss">HTML and CSS</option>
          <option value="python">Python</option>
          <option value="django">Django</option>
          <option value="react">AReactudi</option>
        </select>

        <label for="isactive"> Is active</label>
        <input type="checkbox" name="isactive" value="isactive"></input>

        <div id="mentor_info_banner" className="purple_container">
          <div className="container_column">
            {/* <label for="willtravel">
              <p>Will Travel</p>
            </label>
            <input type="checkbox" name="willtravel" value="willtravel"></input> */}
            <p>Will Travel</p>

            <label className="container_label">
              <input
                className="container_label_input"
                type="checkbox"
                name="willtravel"
                value="willtravel"
              />
              <span className="container_label_span">&#10003;</span>
            </label>
          </div>

          <div className="container_column">
            <p>Mentor Type</p>
            <div id="container_radio">
              {/* <input
                type="radio"
                id="mentortypej"
                name="mentortype"
                value="mentortypej"
              ></input> */}
              <label className="container_label">
                <input
                  className="container_label_input"
                  type="radio"
                  name="mentortype"
                  value="mentortypej"
                />
                <span className="container_label_span">J</span>
              </label>

              <label className="container_label">
                <input
                  className="container_label_input"
                  type="radio"
                  name="mentortype"
                  value="mentortypei"
                />
                <span className="container_label_span">I</span>
              </label>

              <label className="container_label">
                <input
                  className="container_label_input"
                  type="radio"
                  name="mentortype"
                  value="mentortypel"
                />
                <span className="container_label_span">L</span>
              </label>

              {/* <label for="mentortypej">J</label>
              <input
                type="radio"
                id="mentortypei"
                name="mentortype"
                value="mentortypei"
              ></input>
              <label for="mentortype">I</label>
              <input
                type="radio"
                id="mentortypel"
                name="mentortype"
                value="mentortypel"
              ></input>
              <label for="mentortype">L</label> */}
            </div>
          </div>

          <div className="container_column">
            {/* <label for="alumni">
              <p>Alumni</p>
            </label>
            <input type="checkbox" name="alumni" value="alumni"></input> */}
            <p>Alumni</p>

            <label className="container_label">
              <input
                className="container_label_input"
                type="checkbox"
                name="alumni"
                value="alumni"
              ></input>

              <span className="container_label_span">&#10003;</span>
            </label>
          </div>
        </div>
        <label for="notes">Notes:</label>
        <div id="mentor_notes_banner">
          <textarea
            className="purple_container"
            id="notes"
            name="notes"
            rows="4"
            cols="100"
          ></textarea>
        </div>
        <label for="feedback">Feedback:</label>
        <div id="mentor_feedback_banner">
          <textarea
            className="purple_container"
            id="feedback"
            name="feedback"
            rows="4"
            cols="100"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default MentorCreationPage;
