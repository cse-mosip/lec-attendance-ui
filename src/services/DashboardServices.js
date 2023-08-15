import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = sessionStorage.getItem("AccessToken")
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
