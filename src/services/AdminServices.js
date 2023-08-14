import axios from "axios";
import { DOMAIN_NAME } from "../config.js"


const APIEndpoint = DOMAIN_NAME + "/admin";
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxOTAxNTYyLCJleHAiOjE2OTE5MDUxNjIsIm5iZiI6MTY5MTkwMTU2MSwidXNlcl90eXBlIjoiMSJ9.smH63_GYevR_yJP6tkq5Vs3eVFUoik7XQvlLK1tZ85mRJRyif-VWrWIjEjnn0SwzRwwA9FJ7uMrOoLVU17Drhw"




const configLectureDetails = async (lectureId) => {

    const response = await axios({
        method: "GET",
        url: APIEndpoint + `/lecture/start-lecture/${lectureId}`,
        headers: {
            'Access-Token': accessToken
        }
    })

    return response;
}

// end lecture
const endLecture = async () => {

    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/lecture/end-lecture",
    })

    return response;
}

// admin login
const adminLogin = async (loginDetails) => {

    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/login",
        data: loginDetails,

        // login details content
        // {
        // grant_type: "password",
        // username: "admin",
        // password: "admin",
        //}
    });

    return response;
}

const getAllHalls = async () => {

    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/hall/getAllHalls",
        data: {},
        headers: {
            'Access-Token': accessToken
        }
    });

    return response;
}

const getModules = async (intake) => {

    const response = await axios({
        method: "GET",
        url: APIEndpoint + `/lms/getModules/${intake}`,
        headers: {
            'Access-Token': accessToken
        }
    });

    return response;
}

const getAllLecturers = async () => {

    const response = await axios({
        method: "GET",
        url: APIEndpoint + '/user/get-lecturers',
        headers: {
            'Access-Token': accessToken
        }
    });

    return response;
}

const createLecture = async (courseId, startTime, endTime, expectedAttendance, hallId, lecturerId) => {

    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/lecture/create",
        data: {
            courseId,
            startTime,
            endTime,
            expectedAttendance,
            hallId,
            lecturerId
        },
        headers: {
            'Access-Token': accessToken
        }
    });

    return response;
}

export {
    configLectureDetails,
    endLecture,
    adminLogin,
    getAllHalls,
    getModules,
    getAllLecturers,
    createLecture,
};
