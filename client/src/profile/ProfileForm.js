import React, {useState, useContext} from "react";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";
import "./ProfileForm.css";
import { useHistory } from "react-router-dom";

function ProfileForm(){
  const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        email: currentUser.email,
        password: "",
        profile_pic: currentUser.profile_pic,
        country: currentUser.country,
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            profile_pic: formData.profile_pic,
            country: formData.country
        }

        let username = currentUser.username;
        let updatedUser;

        try{
            updatedUser = await GrooveApi.saveProfile(username, profileData);
           
        } catch(errors) {
        
            setFormErrors(errors);
            return;
        }
        setFormData(f => ({...f, password:""}));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(updatedUser);
        history.push("/profile")
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }


   return(
     <div>
    <div className="col-lg-6 offset-md-3 col-lg-8  offset-lg-1">
    <h3 className="mb-3">Edit Profile</h3>
    <div className="card">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label>Username</label>
            <p className="form-control-plaintext">{currentUser.username}</p>
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Profile Picture</label>
            <input
                name="profile_pic"
                className="form-control"
                value={formData.profile_pic}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country of living</label>
            <input
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm password to make changes:</label>
            <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
            />
          </div>
          {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

          {saveConfirmed
              ?
              <Alert type="success" messages={["Updated successfully."]} />
              : null}

          <button
              className="btn btn-secondary btn-block mt-4"
              onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
  </div>
   )
}

export default ProfileForm;