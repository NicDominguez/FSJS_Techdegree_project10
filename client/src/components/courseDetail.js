import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseDetails: {},
      courseId: this.props.match.params.id,
      author: {},
    };
  }

  componentDidMount() {
    this.showCourseDetails(this.state.courseId);
  }

  showCourseDetails(id) {
    const { context } = this.props;

    context.data
        .getCourseDetails(id)
        .then((res) => {
            this.setState({
            courseDetails: res,
            author: res.User,
            });
        })
        .catch((error) => {
            console.log("Error fetching and parsing course data", error);
        })
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.deleteCourse(this.state.courseId)
  }

  deleteCourse(id) {
    const { context } = this.props;

    context.data
      .deleteCourse(id, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then(res => {
        console.log("from within deleteCourse()", res)
        if (res.length === 0) {
          this.props.history.push("/")
        }
      })
      .catch((error) => {
        console.log("Error deleting course data", error);
      })
  }

 
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    let isAuthor = false;
    if (authUser && authUser.id === this.state.courseDetails.userId) {
      isAuthor = true;
    }

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser && isAuthor ? (
                <span>
                  <Link className="button" to={`/courses/${this.state.courseId}/update`}>
                    Update Course
                  </Link>
                  <button className="button" onClick={this.handleDelete}>
                    Delete Course
                  </button>
                </span>
              ) : (
                <a className="button" href={`/signin`}>
                  Sign in to update or delete a course
                </a>
              )}

              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">
                {this.state.courseDetails.title}
              </h3>
              <p>
                By {this.state.author.firstName} {this.state.author.lastName}
              </p>
            </div>
            <div className="course--description">
              <Markdown source={this.state.courseDetails.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.courseDetails.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <Markdown source={this.state.courseDetails.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;