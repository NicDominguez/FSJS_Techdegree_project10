import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class UserSignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: "",
            errors: []
        }
    }
    
    // Runs the signIn funciton from context using the input field values stored in state
    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;

        //Checks if email and password values have been stored in state
        if (!emailAddress || !password) {
          return this.setState({ errors: ["Please provide an email address and password"] })
        }

        context.actions
          .signIn(emailAddress, password)
          .then((user) => {
            if (user === null) {
              this.setState({ errors: [" Sign-in was unsucessful"] })
            } else {
              this.props.history.push("/");
              console.log(`user with email address ${emailAddress} is now signed in`)
            }
          })
          .catch((err) => {
            console.log(err);
            this.props.history.push("/error");
          });
    }

    // Sets state to key value pairs base on the name of the input field and the value
    handleValueChange = (e) => {
        const name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    // Calls submit funtion when submit button is clicked
    handleSubmit = (e) => {
        e.preventDefault();
        this.submit()
    }

    // Returns to homepage when cancel button is clicked
    handleCancel = (e) => {
        e.preventDefault()
        this.props.history.push(`/`);
    }

    render() {
        const { emailAddress, password, errors, } = this.state;

        return (
          <div>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <ErrorsDisplay errors={errors} />
                  <form>
                    <div>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="text"
                        className=""
                        placeholder="Email Address"
                        onChange={this.handleValueChange}
                        value={emailAddress}
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className=""
                        placeholder="Password"
                        onChange={this.handleValueChange}
                        value={password}
                      />
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button
                        className="button"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Sign In
                      </button>
                      <button
                        className="button button-secondary"
                        onClick={this.handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>
                  Don't have a user account?{" "}
                  <Link to="/signUp">Click here</Link> to sign up!
                </p>
              </div>
            </div>
          </div>
        );
    }
}

/**
 * ErrorDisplay function - Function that renders errors if there are any.
 * @param {object} errors - An object of errors. 
 */

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    // If there are at least one error render, create the markup
    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
    return errorsDisplay;
}