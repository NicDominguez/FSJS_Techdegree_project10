import React from 'react';

// Returns a Not Found component when no other matching route exists.
const NotFound = () => {
    return (
        <div>
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>    
        </div>
    )
}

export default NotFound;