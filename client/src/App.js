import React, { Component } from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom'


import { Provider } from './Context.js'
import Header from './components/Header1.js';
import Courses from './components/Courses1.js';
import CreateCourse from './components/CreateCourse1'
import CourseDetail from './components/CourseDetail1'
import UpdateCourse from './components/UpdateCourse1.js';
import UserSignIn from './components/UserSignIn1.js';
import UserSignUp from './components/UserSignUp1.js';
import UserSignOut from './components/UserSignOut1.js';
import Forbidden from './components/Forbidden1.js'
import UnhandledError from './components/UnhandledError1.js'
import NotFound from './components/NotFound1.js';
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
