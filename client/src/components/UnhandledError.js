import React from 'react';

//Returns an error component to display when an error has occured
const UnhandledError = () => {
    return (
        <div>
            <div className="bounds">
                <h1>Error</h1>
                <p>Sorry! There was an error with the server.</p>
            </div>
        </div>
    )
}

export default UnhandledError;