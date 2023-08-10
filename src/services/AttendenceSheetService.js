import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";

const token = {
    headers: {
        'Access-Token':
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsImlzcyI6IkF0dGVuZGFuY2VTZXJ2aWNlIiwiYXVkIjoiQXR0ZW5kYW5jZUZyb250ZW5kcyIsImlhdCI6MTY5MTY3MTMxNSwiZXhwIjoxNjkxNjc0OTE1LCJuYmYiOjE2OTE2NzEzMTQsInVzZXJfdHlwZSI6IjEifQ.uP1yM2tON260z651TiaZ_6vMJZ6rypCRt2ChUg5KD-Z4714umBRsrCasUVXaacN_vbAOynDC3LiGr4bUuOKljQ"
    }
};

const getAllLectures = async () => {
    const url = APIEndpoint + '/lecture/getAllLectures'
    const response = await axios.get(url, token);
    return response;
}

const getStudentByLectureID = async (lectureId) => {
    const url = APIEndpoint + `/lecture-attendance/lecture/${lectureId}`
    const response = await axios.get(url, token);
    return response;
}

const getLectureByLectureID = async (lectureId) => {
    const url = APIEndpoint + `/lecture/get-lecture/${lectureId}`
    const response = await axios.get(url, token);
    return response;
}
export {
    getAllLectures,
    getStudentByLectureID,
    getLectureByLectureID
};