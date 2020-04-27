import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  // Retrieve "authenticatedUser" cookie from browser if available and sets it to state
  state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
      super();
      // Creates a new Data class from the exported Data.js and all associated functions
      this.Data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.Data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return (
        <Context.Provider value={value}>
            {this.props.children}
        </Context.Provider>  
    );
  }

  // Runs the getUser funciton from Data.js using the credentials provided by the user in the userSignIn.js component
  signIn = async (username, password) => {
    const user = await this.Data.getUser(username, password);
    if (user !== null) {
      user.password = password
      this.setState( { 
        authenticatedUser: user,
       })
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user
  }

  // Runs the signOut funciton from userSignOut.js
  signOut = () => {
    this.setState({
      authenticatedUser: null
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
