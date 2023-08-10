import axios from "axios";

const APIEndpoint = process.env.REACT_APP_URL + "/admin/lecture";
const token = {
    headers: {
        'Access-Token':
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsImlzcyI6IkF0dGVuZGFuY2VTZXJ2aWNlIiwiYXVkIjoiQXR0ZW5kYW5jZUZyb250ZW5kcyIsImlhdCI6MTY5MTY3MTMxNSwiZXhwIjoxNjkxNjc0OTE1LCJuYmYiOjE2OTE2NzEzMTQsInVzZXJfdHlwZSI6IjEifQ.uP1yM2tON260z651TiaZ_6vMJZ6rypCRt2ChUg5KD-Z4714umBRsrCasUVXaacN_vbAOynDC3LiGr4bUuOKljQ"
    }
};

const getAllLectures = async () => {
    const url = APIEndpoint + '/getAllLectures'
    const requestData = { /* your request data */ };
    const response = await axios.get(
        "http://localhost:8080/admin/lecture/getAllLectures",
        token
    );
    return response;
}

const getStudentByLectureID = async (lectureId) => {

    const url = APIEndpoint + '/getAllLectures'
    const response = await axios.get(
        `http://localhost:8080/admin/lecture-attendance/lecture/${lectureId}`,
        token
    );
    return response;
}

const getLectureByLectureID = async (lectureId) => {

    const url = APIEndpoint + '/getAllLectures'
    const response = await axios.get(
        `http://localhost:8080/admin/lecture/get-lecture/${lectureId}`,
        token
    );
    return response;
}
export {
    getAllLectures,
    getStudentByLectureID,
    getLectureByLectureID
};