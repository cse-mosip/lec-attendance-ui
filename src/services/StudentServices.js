import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME + "/student";
const accessToken = sessionStorage.getItem("AccessToken")

const markAttendance = async (data) => {
    const url = APIEndpoint + '/lecture-attendance/mark-lecture-attendance';
    const requestData = data;
    console.log(requestData);
    const response = await axios.post(url, requestData, {headers: {
        'Access-Token': accessToken
    }});
    return response;
}

export {
    markAttendance
};