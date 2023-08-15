import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = sessionStorage.getItem("AccessToken")

const getAllLectures = async () => {
    const response = await axios ({
        method : "GET",
        url : APIEndpoint + '/lecture/getAllLectures',
        headers : {
            'Access-Token' : accessToken
        }
    });
    return response;
}

const getStudentByLectureID = async (lectureId) => {
    const response = await axios ({
        method : "GET",
        url : APIEndpoint + `/lecture-attendance/lecture/${lectureId}`,
        headers : {
            'Access-Token' : accessToken
        }
    });
    return response;
}

// const getLectureByLectureID = async (lectureId) => {
//     const response = await axios ({
//         method : "GET",
//         url : APIEndpoint + `/lecture/get-lecture/${lectureId}`,
//         headers : {
//             'Access-Token' : accessToken
//         }
//     });
//     return response;
// }
export {
    getAllLectures,
    getStudentByLectureID,
};