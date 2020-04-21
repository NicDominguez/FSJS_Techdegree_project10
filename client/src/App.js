import React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom'


import { Provider } from './Context.js'
import Header from './components/header.js';
import Courses from './components/courses.js';
import CreateCourse from './components/createCourse'
import CoursesDetail from './components/courseDetail'
import UpdateCourse from './components/updateCourse.js';
import UserSignIn from './components/userSignIn.js';
import UserSignUp from './components/userSignUp.js';
import UserSignOut from './components/userSignOut.js';
import NotFound from './components/notFound.js';
import withContext from './Context'
import PrivateRoute from './PrivateRoute'

const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses)
const CreateCourseWithContext = withContext(CreateCourse)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authentication: null
    }
  }

  render() {
    return (
      <Provider value={this.state.authentication}>
        <BrowserRouter>
          <HeaderWithContext></HeaderWithContext>
          <Switch>
            <Redirect exact path="/" to="/courses" />
            <PrivateRoute exact path="/courses" render={() => <CoursesWithContext/>} />
            <PrivateRoute exact path="/courses/create" render={(props) => <CreateCourseWithContext {...props} />} />
            <Route exact path="/courses/:id/update" render={(props) => <UpdateCourse {...props}/>} />
            <Route exact path="/courses/:id" render={props => <CoursesDetail {...props}/>} />
            <Route exact path="/signin" render={(props) => <UserSignInWithContext {...props} />} />
            <Route exact path="/signup" render={(props) => <UserSignUpWithContext {...props} />} />
            <Route exact path="/signout" render={() => <UserSignOutWithContext />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>     
    );
  }
}

export default App;
