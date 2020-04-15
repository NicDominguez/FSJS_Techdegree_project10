import React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch 
} from 'react-router-dom'



import Header from './components/header.js';
import Courses from './components/courses.js';
import CreateCourse from './components/createCourse'
import CoursesDetail from './components/courseDetail'
import UpdateCourse from './components/updateCourse.js';
import UserSignIn from './components/userSignIn.js';
import UserSignUp from './components/userSignUp.js';
import UserSignOut from './components/userSignOut.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/" render={() => <Courses/>} />
          <Route exact path="/courses/create" render={() => <CreateCourse />} />
          <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
          <Route exact path="/courses/:id" render={() => <CoursesDetail />} />
          <Route exact path="/signin" render={() => <UserSignIn />} />
          <Route exact path="/signup" render={() => <UserSignUp />} />
          <Route exact path="/signout" render={() => <UserSignOut />} />
        </Switch>

      </BrowserRouter>
      
    );
  }
}

export default App;
