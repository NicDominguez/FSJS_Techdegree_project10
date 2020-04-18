import React from 'react';
import axios from "axios";


class UserSignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: ""
        }
    }

    // Function to creaete a user in database
    createUser = () => {
        axios.get(`http://localhost:5000/api/users`, JSON.stringify({
           //set authorization header to emailaddress and password in state
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
        this.createCourse()
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
                        <h1>Sign In</h1>
                        <div>
                            <form>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleValueChange} value={this.state.emailAddress}/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleValueChange} value={this.state.password}/>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit" onClick={this.handleSubmit}>Sign In</button>
                                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignIn;