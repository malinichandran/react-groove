import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./LoginForm.css";

/**Login Form
 * 
 * Shows form and manages update to state on changes.
 * 
 */
function LoginForm( {login}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    /*** Handle form submit */

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if(result.success){
            history.push("/")
        } else {
            
            setFormErrors(result.errors);
        }
    }

    /**update form data field */
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value}));
    }

    return(
        <div className="LoginForm">
            <div className="col-lg-6 offset-md-3 col-lg-8 offset-lg-1">
                <h3 className="mb-3">Log In</h3>

          <div className="logincard">
            <div >
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
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
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
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

export default LoginForm;