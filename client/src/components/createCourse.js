import React, { Component } from 'react';
import axios from "axios";

class CreateCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
        }
    }

    // Function to creaete a course in database
    createCourse = () => {
        axios.post(`http://localhost:5000/api/courses`, JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded
        }))
            .catch((error) => {
                console.log("Error updating course data", error);
            });
    };

    handleValueChange = (e) => {
        const name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.createCourse()
        this.props.history.push(`/`);
    }

    handleCancel = (e) => {
        e.preventDefault()
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div>
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>Please provide a value for "Title"</li>
                                    <li>Please provide a value for "Description"</li>
                                </ul>
                            </div>
                        </div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleValueChange} value={this.state.title}/>
                                    </div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleValueChange} value={this.state.description}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                                    placeholder="Hours" onChange={this.handleValueChange} value={this.state.estimatedTime}/>
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleValueChange} value={this.state.materialsNeeded}></textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={this.handleSubmit}>Create Course</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;