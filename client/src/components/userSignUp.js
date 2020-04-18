import React from 'react';
import axios from "axios";

class UserSignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: ""
        }
    }

    // Function to creaete a user in database
    createUser = () => {
        axios.post(`http://localhost:5000/api/users`, JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddresss,
            password: this.state.password
        }))
            .catch((error) => {
                console.log("Error updating course data", error);
            });
    };

    handleValueChange = (e) => {
        const name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.createUser()
        this.props.history.push(`/`);
    }
    
    handleCancel = (e) => {
        e.preventDefault()
        this.props.history.push(`/`);
    }
    render() {
        return (
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign Up</h1>
                        <div>
                            <form>
                                <div>
                                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleValueChange} value={this.state.firstName}/>
                                </div>
                                <div>
                                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleValueChange} value={this.state.lastName}/>
                                </div>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleValueChange} value={this.state.emailAddresss}/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleValueChange} value={this.state.password}/>
                                </div>
                                <div>
                                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleValueChange} value={this.state.confirmPassword}/>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign Up</button>
                                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignUp;