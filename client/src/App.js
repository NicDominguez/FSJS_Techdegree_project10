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
          <Route exact path="/courses/create" render={(props) => <CreateCourse {...props} />} />
          <Route exact path="/courses/:id/update" render={(props) => <UpdateCourse {...props}/>} />
          <Route exact path="/courses/:id" render={props => <CoursesDetail {...props}/>} />
          <Route exact path="/signin" render={(props) => <UserSignIn {...props} />} />
          <Route exact path="/signup" render={(props) => <UserSignUp {...props} />} />
          <Route exact path="/signout" render={() => <UserSignOut />} />
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default App;
