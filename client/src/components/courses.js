import React, { Component } from 'react';
import axios from "axios";

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: []
        }
    }
    
    componentDidMount() {
        this.retrieveCourses();
    }

    // Function to retrieve list of courses
    retrieveCourses = () => {
        axios.get(`http://localhost:5000/api/courses`)
            .then(res => {
                const courses = res.data.map((course) => (
                    <div className="grid-33" key={course.id}>
                    <a className="course--module course--link" href={`/courses/${course.id}`}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                    </div>
                ));
                this.setState({ courseList: courses });
            })
            .catch(error => {
                const err = error.response
                if (err.status === 400) {
                    console.log(err.data.message)
                    this.props.history.push('/notfound')
                } else if (err.status === 500) {
                    console.log(err.data.message)
                    this.props.history.push('/error')
                } else {
                    console.log('Error fetching and parsing course data', error);
                }
            });
    }

    render() {
        return (
            <div>
                <div className="bounds">
                    {this.state.courseList}
                    <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </a></div>
                </div>
            </div>

        );
    }
}

export default Courses;