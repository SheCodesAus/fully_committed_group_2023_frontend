// (KRISTY) - IN PROGRESS

import { useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import './CreateMentorForm.css';

function MentorForm() {
  // For multi selecting skills
  const [skills, setSkills] = useState({
    html: false,
    css: false,
    python: false,
    django: false,
    drf: false,
    react: false,
  });

  const [city, setCity] = useState('');
  const [willTravel, setWillTravel]= useState('false');
  const [juniorMentor, setJuniorMentor] = useState('false');
  const [industryMentor, setIndustryMentor] = useState('false');
  const [leadMentor, setLeadMentor] = useState('false');
  const [alumni, setAlumni] = useState('false')

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSkillsChange = (skill, isChecked) => {
    setSkills({
      ...skills,
      [skill]: isChecked,
    });
  };

  const handleTravelChange = (willTravel, isChecked) => {
    setWillTravel({
      ...willTravel,
      [willTravel]: isChecked,
    })
  }

  return (
    <div className='mentor-form'>
    <form>
      <div className='contact-inputs'>
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" required />
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" required />
      </div>
      <div className='contact-inputs'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" />
      </div>
      <div className='contact-inputs'>
      <div>
        <label htmlFor="city" name="city" id="city">Location</label>
        <select value={city} onChange={handleCityChange} required>
          <option value="Perth">Perth</option>
          <option value="Sydney">Sydney</option>
          <option value="Brisbane">Brisbane</option>
        </select>
        </div>
        <div className='container'>
        <div>
        <label htmlFor='willTravel'>Will Travel</label>
        <ToggleButton
          isChecked={willTravel.react}
          onChange={(isChecked) => handleTravelChange('react', isChecked)} />
        </div>
        <div>
        <label htmlFor='alumni'>Alumni</label>
        <ToggleButton
          isChecked={alumni.react}
          onChange={(isChecked) => handleAlumniChange('react', isChecked)} />
        </div>
        </div>
      </div>
      <div className='container' >
        <div>
        <label htmlFor="skills">Skills:</label>
        </div>
        <div>
        <label htmlFor="HTML">HTML</label>
        <ToggleButton
          isChecked={skills.html}
          onChange={(isChecked) => handleSkillsChange('html', isChecked)}
        />
        </div>
        <div>
        <label htmlFor="CSS">CSS</label>
        <ToggleButton
          isChecked={skills.css}
          onChange={(isChecked) => handleSkillsChange('css', isChecked)}
        />
        </div>
        <div>
        <label htmlFor="Python">Python</label>
        <ToggleButton
          isChecked={skills.python}
          onChange={(isChecked) => handleSkillsChange('python', isChecked)}
        />
        </div>
        <div>
        <label htmlFor="django">Django</label>
        <ToggleButton
          isChecked={skills.django}
          onChange={(isChecked) => handleSkillsChange('django', isChecked)}
        />
        </div>
        <div>
        <label htmlFor="drf">DRF</label>
        <ToggleButton
          isChecked={skills.drf}
          onChange={(isChecked) => handleSkillsChange('drf', isChecked)}
        />
        </div>
        <div>
        <label htmlFor="react">React</label>
        <ToggleButton
          isChecked={skills.react}
          onChange={(isChecked) => handleSkillsChange('react', isChecked)}
        />
        </div>
      </div>
      <div className='container'>
      <div>
        <label>Mentor Type:</label>  
        </div>  
        <div>
        <label htmlFor="juniorMentor">Junior Mentor</label>
        <ToggleButton
          isChecked={juniorMentor.react}
          onChange={(isChecked) => handleJuniorMentorChange('react', isChecked)} />
          </div>
          <div>
          <label htmlFor="industryMentor">Industry Mentor</label>
        <ToggleButton
          isChecked={industryMentor.react}
          onChange={(isChecked) => handleIndustryMentorChange('react', isChecked)} />
          </div>
        <div>
        <label htmlFor="leadMentor">Lead Mentor</label>
        <ToggleButton
          isChecked={leadMentor.react}
          onChange={(isChecked) => handleLeadMentorChange('react', isChecked)} />
        </div> 
      </div>
      <div>{/* step */}</div>
      <div>{/* notes */}</div>
    </form>
    </div>
  );
}

export default MentorForm;

