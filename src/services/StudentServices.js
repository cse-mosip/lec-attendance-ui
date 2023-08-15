import axios from "axios";
import { DOMAIN_NAME } from "../config.js";

const accessToken = sessionStorage.getItem("AccessToken")

// const BackendAPIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/student";
const BackendAPIEndpoint = DOMAIN_NAME + "/student";

const markAttendance = async (data) => {
    const url = BackendAPIEndpoint + '/lecture-attendance/mark-lecture-attendance';
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