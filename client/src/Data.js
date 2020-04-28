import config from './config'

export default class Data {
  // Creates a template funciton to make a fetch call using supplied options and parameters
  api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) { options.body = JSON.stringify(body); }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options)
  }

  // Asyncronous funciton to retrieve userdata from api
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, { username, password });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } 
    else if (response.status === 500) {
      console.log("500 Internal Server Error")
      this.props.history.push('/error')
    } 
    else {
      throw new Error();
    }
  }

  // Asyncronous funciton to submit new user information to api
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } 
    else if (response.status === 500) {
      console.log("500 Internal Server Error")
      this.props.history.push('/error')
    } 
    else {
      throw new Error();
    }
  }

  // Asyncronous funciton to retrieve course data from api
  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      return response.json().then((data) => {
        return data
      });
    } 
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } 
    else if (response.status === 500) {
      console.log("500 Internal Server Error")
      this.props.history.push('/error')
    } 
    else {
      throw new Error();
    }
  }

  // Asyncronous funciton to submit new course information to api
  async createCourse(courseObj, username, password) {
    const response = await this.api(`/courses`, "POST", courseObj, true, { username, password });
    if (response.status === 201) {
        return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 500) {
      console.log("500 Internal Server Error");
      this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

  // Asyncronous funciton to retrieve course details data from api
  async getCourseDetails(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 500) {
      console.log("500 Internal Server Error");
      this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

  // Asyncronous funciton to change course details information in api
  async updateCourseDetails(id, courseObj, username, password ) {
    const response = await this.api(`/courses/${id}`, "PUT", courseObj, true, { username, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 500) {
      console.log("500 Internal Server Error");
      this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

  // Asyncronous funciton to remove a course entry in the api database
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, { username, password });
    if (response.status === 204) {
        return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 500) {
      console.log("500 Internal Server Error");
      this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

}

