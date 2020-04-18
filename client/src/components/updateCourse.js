import React, { Component }from 'react';
import axios from "axios";

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.id,
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      author: [],
    };
  }

  componentDidMount() {
    this.retrieveCourseDetails(this.state.courseId);
  }

  // Function to retrieve list of courses
  retrieveCourseDetails = (id) => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          estimatedTime: res.data.estimatedTime,
          materialsNeeded: res.data.materialsNeeded,
          author: res.data.User,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing course data", error);
      });
  };

  // Function to update course information in database then set state to new information
  updateCourse = (id) => {
    axios.put(`http://localhost:5000/api/courses/${id}`, JSON.stringify({
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded
    }))
      .catch((error) => {
        console.log("Error updating course data", error);
      });
    this.retrieveCourseDetails(id)
  };

  handleValueChange = (e) => {
    const name = e.target.name
    this.setState( {[name]: e.target.value} )
  }

  handleSubmit= (e) => {
    e.preventDefault();
    this.updateCourse(this.state.courseId)
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.props.history.push(`/courses/${this.state.courseId}`);
  }

  render() {
    return (
      <div>
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <form>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      onChange={this.handleValueChange}
                      value={this.state.title}
                    />
                  </div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      onChange={this.handleValueChange}
                      value={this.state.description}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          onChange={this.handleValueChange}
                          value={this.state.estimatedTime}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="List materials..."
                          onChange={this.handleValueChange}
                          value={this.state.materialsNeeded}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={this.handleSubmit}>
                  Update Course
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;