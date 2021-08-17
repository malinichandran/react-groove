import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./SignupForm.css";

/** Signup form.
 *
 * Shows form and manages update to state on changes.*/

 function SignupForm({ signup }) {
     const history = useHistory();
     const [formData, setFormData] = useState({
         username: "",
         first_name: "",
         last_name: "",
         email: "",
         password: "",
         profile_pic: "",
         country: ""
     });
     const [formErrors, setFormErrors] = useState([]);

     console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success) {
            history.push("/");
        } else {
            setFormErrors(result.errors);
        }
    }
   
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]:value}));
    }

    return(
        <div className="SignupForm">
        <div className="col-lg-6 offset-md-3 col-lg-8 offset-lg-1">
          <h3 className="mb-3">Sign Up</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
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
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
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

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-secondary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
 }

 export default SignupForm;