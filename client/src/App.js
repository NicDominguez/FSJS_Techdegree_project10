import React from 'react';

import './App.css';

//Test Case
const courseData = fetch(`http://localhost:5000/courses`).then(res => res.json()).catch(console.log)

console.log(courseData)



function App() {
  return (

    <ul>check console</ul>
  );
}

export default App;
