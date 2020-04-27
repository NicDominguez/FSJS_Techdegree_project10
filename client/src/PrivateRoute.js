import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// Creates a template for the PrivateRoute component that checks for an authenticated user or rediredcts to sign in page
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? 
            (<Component {...props} />) 
            : 
            (<Redirect to={{pathname: "/signin", state: { from: props.location } }} />)
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
