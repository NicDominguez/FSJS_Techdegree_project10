import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: []
        }
    }

    // RUn getCourses function from Data.js and create component using response data
    showCourses() {
        const { context } = this.props;

        context.data.getCourses()
          .then( (res) => {
            const courses = res.map((course) => (
              <div className="grid-33" key={course.id}>
                <Link
                  className="course--module course--link"
                  to={`/courses/${course.id}`}
                >
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            ));
            this.setState({ courseList: courses });
          })
          .catch((error) => {
            console.log("Error fetching and parsing course data", error);
            this.props.history.push(`/error`);
          });
    }


    // Call showCourses function upon componenent mounting
    componentDidMount() {
        this.showCourses()
    }

    render() {
        return (
          <div>
            <div className="bounds">
              {this.state.courseList}
              <div className="grid-33">
                <Link
                  className="course--module course--add--module"
                  to="/courses/create"
                >
                  <h3 className="course--add--title">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 13 13"
                      className="add"
                    >
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        );
    }
}

export default Courses;