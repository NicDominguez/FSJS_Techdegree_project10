// library Import
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// Renders NavLink buttons with items from the navItems array
export default class Header extends Component {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div>
                <div className="header">
                    <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    {
                    authUser ?    
                    <nav>
                        <span>Hello, {authUser.firstName}!</span>
                        <NavLink className="signout" to="/signout">
                            Sign Out
                        </NavLink>
                    </nav>
                    :
                    <nav>
                        <NavLink className="signup" to="/signup">
                            Sign Up
                        </NavLink>
                        <NavLink className="signin" to="/signin">
                            Sign In
                        </NavLink>
                    </nav>
                    }
                    </div>
                </div>
                <hr />
            </div>
        );  
    }
}