import React, { Component }from 'react';


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
    this.showCourseDetails(this.state.courseId);
  }

  // Function to retrieve list of courses
  showCourseDetails = (id) => {
    const { context } = this.props;
    context.data
      .getCourseDetails(id)
      .then((res) => {
        this.setState({
          title: res.title,
          description: res.description,
          estimatedTime: res.estimatedTime,
          materialsNeeded: res.materialsNeeded,
          author: res.User,
        });
      })
      .then(() => {
        const authUserId = context.authenticatedUser.id;
        if (authUserId !== this.state.author.id) {
          this.props.history.push("/forbidden");
        }
      })
      .catch((error) => {
          console.log("Error fetching and parsing course data", error);
        });
  };

  // Function to update course information in database then set state to new information
  updateCourse = (id) => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;  

    if (!title || !description) {
      return this.setState({ errors: ["Please provide a title and description"] })
    }

    let courseInfo = {
          title: title,
          description: description,
          estimatedTime: estimatedTime,
          materialsNeeded: materialsNeeded,
          userId: context.authenticatedUser.userId,
    }
    console.log(context)
    context.data.updateCourseDetails(id, courseInfo, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .catch((error) => {
          console.log("Error updating course data", error);
        });
  };
  

  handleValueChange = (e) => {
    const name = e.target.name
    this.setState( {[name]: e.target.value} )
  }

  handleSubmit= (e) => {
    e.preventDefault();
    this.updateCourse(this.state.courseId)
    this.props.history.push(`/courses/${this.state.courseId}`);
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