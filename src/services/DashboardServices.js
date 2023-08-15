import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxNjczNzIxLCJleHAiOjE2OTE2NzczMjEsIm5iZiI6MTY5MTY3MzcyMCwidXNlcl90eXBlIjoiMSJ9.qPYKdHZqe7-jfGLkzR9I5iJObB0BBy6hENWC0fS3S89QZvobAxYZboLZY8Um8rSVfi5utDDXmVx0k47BF6W81A'
const currentLectureDetails = async() => {

    const response = await axios ({
        method : "GET",
        url : APIEndpoint + "/lecture/getCurrentLectures",
        headers : {
            'Access-Token' : accessToken
        }
    })

    return response;
}

const currentLectureAttendance = async(lectureId) => {

    const response = await axios ({
        method : "GET",
        url : APIEndpoint + `/lecture-attendance/lecture/${lectureId}`,
        headers : {
            'Access-Token' : accessToken
        }
    })

    return response;
}

export { currentLectureDetails, currentLectureAttendance }
