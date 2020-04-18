// library Import
import React from 'react'
import {
    BrowserRouter
} from 'react-router-dom'

// Renders NavLink buttons with items from the navItems array
const Header = (props) => {
    return (
        <BrowserRouter>
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <a className="signup" href="/signup">Sign Up</a>
                        <a className="signin" href="/signin">Sign In</a>
                    </nav>
                </div>
            </div>
            <hr/>
        </BrowserRouter>
    );
}

export default Header;