import React from 'react';



import Header from './components/header.js';
import Courses from './components/courses.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Courses></Courses>
      </div>
      
    );
  }
}

export default App;
