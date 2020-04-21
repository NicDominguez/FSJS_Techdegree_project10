import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class UserSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            errors: []
        }
    }

    // Function to submit a user for creation in database
    submit = () => {
        const { context } = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state

        const user = {firstName, lastName, emailAddress, password }

        if (user.password !== this.state.confirmPassword) {
            this.setState({ errors: [`Password field and Confirm Password field do not match`]})
        } else {
            context.data.createUser(user)
                .then( errors => {
                    if (this.state.errors.length) {
                        this.setState({ errors });
                    } else {
                        context.actions.signIn(emailAddress, password)
                            .then( () => {
                                this.props.history.push('/')
                            })
                        console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.props.history.push('/error');
                })
        }


    };

    handleValueChange = (e) => {
        const name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.submit()
        this.props.history.push(`/`);
    }
    
    handleCancel = (e) => {
        e.preventDefault()
        this.props.history.push(`/`);
    }

    render() {
        const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;

        return (
          <div>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  <ErrorsDisplay errors={errors} />
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className=""
                        placeholder="First Name"
                        onChange={this.handleValueChange}
                        value={firstName}
                      />
                    </div>
                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className=""
                        placeholder="Last Name"
                        onChange={this.handleValueChange}
                        value={lastName}
                      />
                    </div>
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
                    <div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className=""
                        placeholder="Confirm Password"
                        onChange={this.handleValueChange}
                        value={confirmPassword}
                      />
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button
                        className="button"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Sign Up
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
                  Already have a user account?{" "}
                  <Link to="/signin">Click here</Link>to sign in!
                </p>
              </div>
            </div>
          </div>
        );
    }
};

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
