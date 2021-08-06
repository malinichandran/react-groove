import React, {useState, useContext} from "react";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";

function ProfileForm(){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
        profilePic: currentUser.profile_pic,
        country: currentUser.country,
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
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
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
    <h3>Profile</h3>
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
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
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
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
   )
}

export default ProfileForm;