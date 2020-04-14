import React from 'react';



import Header from './components/header.js';


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
      </div>
      
    );
  }
}

export default App;
