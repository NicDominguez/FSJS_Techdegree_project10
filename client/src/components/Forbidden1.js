import React from 'react';

// Returns a forbidden component which authentication has not been provided
const Forbidden = () => {
    return (
        <div>
            <div className="bounds">
                <h1>Access Forbidden</h1>
                <p>Sorry! You do not have the authorization to access this information.</p>
            </div>
        </div>
    )
}

export default Forbidden;