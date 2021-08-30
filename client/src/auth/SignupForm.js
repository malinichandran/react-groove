import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./SignupForm.css";
import profilepic from "../images/profilepic.jpeg"

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
         profile_pic: profilepic,
         country: ""
     });
     const [formErrors, setFormErrors] = useState([]);

    

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success) {
            history.push("/");
        } else {
          console.log(result.errors);
            if(result.errors[0].includes("instance")){
              setFormErrors([result.errors[0].slice(9)])

           }else{
            setFormErrors(result.errors);
           }
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
          <div className="signupcard">
            <div>
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