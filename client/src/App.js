import React, { Component } from 'react';
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
import CourseDetail from './components/courseDetail'
import UpdateCourse from './components/updateCourse.js';
import UserSignIn from './components/userSignIn.js';
import UserSignUp from './components/userSignUp.js';
import UserSignOut from './components/userSignOut.js';
import Forbidden from './components/forbidden.js'
import UnhandledError from './components/error.js'
import NotFound from './components/notFound.js';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const CourseDetailWithContext = withContext(CourseDetail)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)

class App extends Component {

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
            <Route exact path="/courses" component={CoursesWithContext} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/error" component={UnhandledError} />
            <Route exact path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>     
    );
  }
}

export default App;
