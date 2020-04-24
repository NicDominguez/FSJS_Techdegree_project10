import React, { Component }from 'react';
import axios from "axios";
import { Base64 } from "js-base64";

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
      errors: []
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
      .then( () => {
        const { context } = this.props;
        const authUserId = context.authenticatedUser.id
        if (authUserId !== this.state.author.id) {
          this.props.history.push('/forbidden')
        }
      })
      .catch((error) => {
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
  };

  // Function to update course information in database then set state to new information
  updateCourse = (id) => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    console.log(context.authenticatedUser.password)
    const password = Base64.atob(context.authenticatedUser.password)
    

    if (!title || !description) {
      return this.setState({ errors: ["Please provide a title and description"] })
    }
    console.log(context.authenticatedUser)

    axios.put(`http://localhost:5000/api/courses/${id}`, JSON.stringify({
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
      userId: context.authenticatedUser.userId,
      header: {"Authorization": `Basic ${context.authenticatedUser.email} : "${password}"`}
    }))
      .catch((error) => {
        const err = error.response
        if (err.status === 400) {
          console.log(err.data.message);
          this.props.history.push('/notfound');
        } else if (err.status === 403) {
          console.log(err.data.message);
          this.props.history.push('/forbidden');
        } else if (err.status === 500) {
          console.log(err.data.message);
          this.props.history.push('/error');
        } else {
          console.log("Error updating course data", error);
        }
        
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
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

    return (
      <div>
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <ErrorsDisplay errors={errors} />
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
                      value={title}
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
                      value={description}
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
                          value={estimatedTime}
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
                          value={materialsNeeded}
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

/**
 * ErrorDisplay function - Function that renders errors if there are any.
 * @param {object} errors - An object of errors. 
 */

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  // If there are at least one error render, create the markup
  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  return errorsDisplay;
}


export default UpdateCourse;